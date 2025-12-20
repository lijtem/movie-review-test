
import axios, { type AxiosInstance, AxiosError } from 'axios';
import { ApiError, NetworkError } from '../types';

const API_URL = 'https://elantil-fe-task.directus.app';

function createApiClient(): AxiosInstance {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
    };



    const client = axios.create({
        baseURL: API_URL,
        headers,
        timeout: 30000,
    });


    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            return Promise.reject(transformError(error));
        }
    );

    return client;
}


function transformError(error: AxiosError): ApiError {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        return new NetworkError(
            'Network request failed. Please check your connection.',
            error
        );
    }

    if (error.response) {
        const statusCode = error.response.status;
        const message = error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data
            ? (error.response.data as { message: string }).message
            : `API request failed with status ${statusCode}`;

        return new ApiError(message, statusCode, error);
    }

    return new ApiError(
        error.message || 'An unexpected error occurred',
        undefined,
        error
    );
}


export function buildFilter(filter: Record<string, unknown>): string {
    return JSON.stringify(filter);
}

export function buildFields(fields: string[]): string {
    return fields.join(',');
}


export const apiClient = createApiClient();

