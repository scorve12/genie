'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Coffee } from '@/types/coffee';
import { coffeeSchema, CoffeeFormData } from '@/lib/validations/coffee';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import ImageUpload from '@/components/admin/ImageUpload';
import { useState } from 'react';
import { uploadImage } from '@/lib/api/beans';

interface BeanFormProps {
  initialData?: Coffee;
  onSubmit: (data: Coffee | Omit<Coffee, 'id'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function BeanForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: BeanFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [flavorInput, setFlavorInput] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: initialData || {
      name: '',
      origin: '',
      roastLevel: 'Medium',
      flavor: [],
      description: '',
      price: 0,
      image: '',
    },
  });

  const flavors = watch('flavor') || [];

  const handleAddFlavor = () => {
    const trimmedFlavor = flavorInput.trim();
    if (trimmedFlavor && !flavors.includes(trimmedFlavor)) {
      setValue('flavor', [...flavors, trimmedFlavor]);
      setFlavorInput('');
    }
  };

  const handleRemoveFlavor = (index: number) => {
    setValue(
      'flavor',
      flavors.filter((_, i) => i !== index)
    );
  };

  const handleFlavorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFlavor();
    }
  };

  const onFormSubmit = async (data: CoffeeFormData) => {
    try {
      let imageUrl = data.image || '';

      // Upload image if a new file was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const submitData = {
        ...data,
        image: imageUrl,
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  const roastLevelOptions = [
    { value: 'Light', label: 'Light (라이트)' },
    { value: 'Medium', label: 'Medium (미디엄)' },
    { value: 'Medium-Dark', label: 'Medium-Dark (미디엄-다크)' },
    { value: 'Dark', label: 'Dark (다크)' },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Name */}
      <Input
        label="원두 이름"
        {...register('name')}
        error={errors.name?.message}
        placeholder="예: 에티오피아 예가체프"
        required
        disabled={isSubmitting}
      />

      {/* Origin */}
      <Input
        label="원산지"
        {...register('origin')}
        error={errors.origin?.message}
        placeholder="예: 에티오피아, 예가체프"
        required
        disabled={isSubmitting}
      />

      {/* Roast Level */}
      <Controller
        name="roastLevel"
        control={control}
        render={({ field }) => (
          <Select
            label="로스팅 레벨"
            options={roastLevelOptions}
            {...field}
            error={errors.roastLevel?.message}
            required
            disabled={isSubmitting}
          />
        )}
      />

      {/* Flavor Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          향미 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={flavorInput}
            onChange={(e) => setFlavorInput(e.target.value)}
            onKeyDown={handleFlavorKeyDown}
            placeholder="향미를 입력하고 Enter"
            className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            disabled={isSubmitting}
          />
          <Button
            type="button"
            onClick={handleAddFlavor}
            variant="secondary"
            disabled={isSubmitting || !flavorInput.trim()}
          >
            추가
          </Button>
        </div>

        {/* Flavor tags display */}
        {flavors.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {flavors.map((flavor, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm rounded-full"
              >
                {flavor}
                <button
                  type="button"
                  onClick={() => handleRemoveFlavor(index)}
                  disabled={isSubmitting}
                  className="hover:text-amber-900 dark:hover:text-amber-100"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {errors.flavor && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.flavor.message}
          </p>
        )}
      </div>

      {/* Description */}
      <Textarea
        label="설명"
        {...register('description')}
        error={errors.description?.message}
        placeholder="원두에 대한 상세한 설명을 입력하세요"
        rows={4}
        required
        disabled={isSubmitting}
      />

      {/* Price */}
      <Input
        label="가격 (USD)"
        type="number"
        step="0.01"
        {...register('price', { valueAsNumber: true })}
        error={errors.price?.message}
        placeholder="예: 19.99"
        required
        disabled={isSubmitting}
      />

      {/* Image Upload */}
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <ImageUpload
            value={field.value}
            onChange={(file) => {
              setImageFile(file);
              if (!file && !initialData?.image) {
                field.onChange('');
              }
            }}
            disabled={isSubmitting}
            error={errors.image?.message}
          />
        )}
      />

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
