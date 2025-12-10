import { z } from 'zod';

export const questionSchema = z.object({
  id: z.number().optional(),
  preferenceKey: z.string().min(1, 'preference key를 입력해주세요'),
  questionText: z.string().min(5, '질문은 최소 5자 이상이어야 합니다'),
  description: z.string().min(5, '설명은 최소 5자 이상이어야 합니다'),
  order: z.number().min(1, '순서는 1 이상이어야 합니다'),
  isActive: z.boolean(),
});

export const createQuestionSchema = questionSchema.omit({ id: true });
export const updateQuestionSchema = questionSchema.partial().required({ id: true });

export type QuestionFormData = z.infer<typeof questionSchema>;
