import { z } from 'zod';

export const coffeeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  origin: z.string().min(1, '원산지를 입력해주세요'),
  roastLevel: z.enum(['Light', 'Medium', 'Medium-Dark', 'Dark'], {
    errorMap: () => ({ message: '로스팅 레벨을 선택해주세요' }),
  }),
  flavor: z.array(z.string()).min(1, '최소 1개의 향미를 추가해주세요'),
  description: z
    .string()
    .min(10, '설명은 최소 10자 이상이어야 합니다')
    .max(500, '설명은 500자를 초과할 수 없습니다'),
  price: z.number().min(0.01, '가격은 0보다 커야 합니다'),
  image: z.string().optional(),
});

export const createCoffeeSchema = coffeeSchema.omit({ id: true });
export const updateCoffeeSchema = coffeeSchema.partial().required({ id: true });

export type CoffeeFormData = z.infer<typeof coffeeSchema>;
