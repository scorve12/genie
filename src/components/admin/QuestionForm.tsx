'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Question } from '@/types/question';
import { questionSchema, QuestionFormData } from '@/lib/validations/question';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface QuestionFormProps {
  initialData?: Question;
  onSubmit: (data: Question | Omit<Question, 'id'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      preferenceKey: '',
      questionText: '',
      description: '',
      order: 1,
      isActive: true,
    },
  });

  const onFormSubmit = async (data: QuestionFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Preference Key */}
      <Input
        label="Preference Key"
        {...register('preferenceKey')}
        error={errors.preferenceKey?.message}
        placeholder="예: likesAcidity"
        helperText="UserPreferences 인터페이스의 키 (camelCase)"
        required
        disabled={isSubmitting}
      />

      {/* Question Text */}
      <Input
        label="질문 텍스트"
        {...register('questionText')}
        error={errors.questionText?.message}
        placeholder="예: 산미가 있는 원두를 선호하시나요?"
        required
        disabled={isSubmitting}
      />

      {/* Description */}
      <Textarea
        label="설명"
        {...register('description')}
        error={errors.description?.message}
        placeholder="질문에 대한 자세한 설명을 입력하세요"
        rows={3}
        required
        disabled={isSubmitting}
      />

      {/* Order */}
      <Input
        label="순서"
        type="number"
        {...register('order', { valueAsNumber: true })}
        error={errors.order?.message}
        placeholder="1"
        helperText="질문이 표시될 순서 (숫자가 작을수록 먼저 표시)"
        required
        disabled={isSubmitting}
      />

      {/* Is Active */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          {...register('isActive')}
          disabled={isSubmitting}
          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
        />
        <label
          htmlFor="isActive"
          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
        >
          활성화 (체크 해제 시 추천 페이지에 표시되지 않습니다)
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="flex-1"
        >
          {initialData ? '수정' : '추가'}
        </Button>
      </div>
    </form>
  );
}
