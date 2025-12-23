import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { type Review } from '../types';
import { createReview } from '../api/endpoints/reviews';
import { reviewFormSchema, type ReviewFormData } from '../lib/schemas/review.schema';

interface UseFormReviewOptions {
  onSuccess?: () => void;
}

export function useFormReview(showId: string, options: UseFormReviewOptions = {}) {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: '',
      title: '',
      content: '',
      rating: 0,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const review: Review = {
        name: data.name,
        title: data.title,
        review: data.content,
        rating: data.rating,
        show_id: showId,
        date_created: new Date().toISOString(),
      };
      const response = await createReview(review);
      if (response.data) {
        form.reset();
        toast.success('Review submitted!', {
          description: 'Thanks for sharing your thoughts.',
        });
        options.onSuccess?.();
      }
    } catch (_err) {
      toast.error('Failed to submit review', {
        description: 'Please try again.',
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    register: form.register,
  };
}

