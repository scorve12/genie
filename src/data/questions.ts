import { Question } from '@/types/question';

const baseDate = '2025-12-12T17:50:37.861Z';

export const questions: Question[] = [
  {
    id: 1,
    preferenceKey: 'likesAcidity',
    questionText: '산미가 있는 원두를 선호하시나요?',
    description: '밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?',
    order: 1,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: 2,
    preferenceKey: 'likesFullBody',
    questionText: '진한 바디감을 원하시나요?',
    description: '묵직하고 풍부한 질감의 커피를 선호하시나요?',
    order: 2,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: 3,
    preferenceKey: 'likesChocolateNut',
    questionText: '초콜릿이나 견과류 향을 좋아하시나요?',
    description: '달콤하고 고소한 초콜릿, 캐러멜, 너트 향을 선호하시나요?',
    order: 3,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: 4,
    preferenceKey: 'likesFruityFloral',
    questionText: '과일향이나 플로럴 향을 선호하시나요?',
    description: '꽃향기나 베리, 와인 같은 화사한 향을 좋아하시나요?',
    order: 4,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
  },
  {
    id: 5,
    preferenceKey: 'likesDarkRoast',
    questionText: '다크 로스팅을 선호하시나요?',
    description: '진하고 강한 맛의 다크 로스팅 커피를 원하시나요?',
    order: 5,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
  },
];
