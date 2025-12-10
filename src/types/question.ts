export interface Question {
  id: number;
  preferenceKey: string; // UserPreferences의 키 (예: 'likesAcidity')
  questionText: string; // 질문 텍스트
  description: string; // 설명
  order: number; // 표시 순서
  isActive: boolean; // 활성화 여부
}

export type QuestionFormData = Omit<Question, 'id'>;
