import axios, { type AxiosInstance, type AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import { ApiError, NetworkError } from '../../types';
import type { Notification, NotificationType } from '../store/atoms/ui.atoms';

const API_URL = import.meta.env.VITE_API_URL || 'https://elantil-fe-task.directus.app';

let notificationSetter: ((notification: Omit<Notification, 'id'>) => void) | null = null;

export function initInterceptors(
    addNotification: (notification: Omit<Notification, 'id'>) => void
) {
    notificationSetter = addNotification;
}

function createApiClient(): AxiosInstance {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
    };

    const client = axios.create({
        baseURL: API_URL,
        headers,
        timeout: 30000,
    });

    // Configure axios-retry for resilience
    axiosRetry(client, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error) => {
            // Retry on network errors or 5xx server errors
            return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                (error.response?.status !== undefined && error.response.status >= 500);
        },
        onRetry: (retryCount, error) => {
            console.warn(`Retry attempt ${retryCount} for ${error.config?.url}`);
        },
    });


    client.interceptors.request.use(
        (config) => {
            if (import.meta.env.DEV) {
                console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
            }

            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            notificationSetter?.({
                type: 'error',
                title: 'Request failed',
                message: 'Could not send request. Please check your connection.',
            });
            return Promise.reject(error);
        }
    );

  
    client.interceptors.response.use(
        (response) => {
            if (import.meta.env.DEV) {
                console.log(`[API] ✅ ${response.status} ${response.config.url}`);
            }

            // Success notifications for mutations only
            const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(
                response.config.method?.toUpperCase() || ''
            );

            if (isMutation && response.status < 300) {
                notificationSetter?.({
                    type: 'success',
                    title: 'Success!',
                    message: 'Your changes were saved.',
                    duration: 3000,
                });
            }

            return response;
        },
        (error: AxiosError) => {
            // Network errors
            if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
                notificationSetter?.({
                    type: 'error',
                    title: 'Connection Error',
                    message: 'Could not reach the server. Please check your internet connection.',
                    duration: 0, // Don't auto-hide
                });
                return Promise.reject(new NetworkError('Network request failed.', error));
            }

            // API errors with user-friendly messages
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data as Record<string, unknown> | undefined;

                let userMessage = 'Something went wrong';
                let notificationType: NotificationType = 'error';

                switch (status) {
                    case 400:
                        userMessage = (data?.errors as Array<{ message: string }> | undefined)?.[0]?.message || 'Invalid request.';
                        notificationType = 'warning';
                        break;
                    case 401:
                        userMessage = 'You need to sign in to continue.';
                        notificationType = 'warning';
                        break;
                    case 403:
                        userMessage = "You don't have permission to do that.";
                        break;
                    case 404:
                        userMessage = 'Resource not found.';
                        break;
                    case 429:
                        userMessage = 'Too many requests. Please wait a moment.';
                        notificationType = 'warning';
                        break;
                    case 500:
                        userMessage = 'Server error. Our team has been notified.';
                        break;
                    default:
                        userMessage = (data?.message as string) || `API error (${status})`;
                }

                notificationSetter?.({
                    type: notificationType,
                    title: status === 401 ? 'Unauthorized' : 'Error',
                    message: userMessage,
                    duration: status === 401 ? 0 : 5000,
                });

                return Promise.reject(new ApiError(userMessage, status, error));
            }

            notificationSetter?.({
                type: 'error',
                title: 'Unexpected Error',
                message: 'An unknown error occurred. Please try again.',
            });

            return Promise.reject(new ApiError(error.message || 'Unknown error'));
        }
    );

    return client;
}

export function buildFilter(filter: Record<string, unknown>): string {
    return JSON.stringify(filter);
}

export function buildFields(fields: string[]): string {
    return fields.join(',');
}

export const apiClient = createApiClient();

// Helper functions for cleaner API calls
export const api = {
    get: <T>(url: string, config?: object) => apiClient.get<T>(url, config).then(r => r.data),
    post: <T>(url: string, data?: unknown) => apiClient.post<T>(url, data).then(r => r.data),
    put: <T>(url: string, data?: unknown) => apiClient.put<T>(url, data).then(r => r.data),
    delete: <T>(url: string, config?: object) => apiClient.delete<T>(url, config).then(r => r.data),
};
