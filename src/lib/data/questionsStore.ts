import { Question } from '@/types/question';
import { questions as initialQuestions } from '@/data/questions';

/**
 * 메모리 내 질문 데이터 저장소
 * 실제 서비스에서는 데이터베이스 사용 권장
 */
class QuestionsStore {
  private questions: Question[];

  constructor() {
    this.questions = [...initialQuestions];
  }

  getAll(): Question[] {
    return [...this.questions];
  }

  getById(id: number): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  create(question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Question {
    const newId =
      this.questions.length > 0
        ? Math.max(...this.questions.map((q) => q.id)) + 1
        : 1;

    const now = new Date().toISOString();
    const newQuestion: Question = {
      ...question,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    this.questions.push(newQuestion);
    return newQuestion;
  }

  update(id: number, updates: Partial<Question>): Question | null {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return null;

    const updatedQuestion: Question = {
      ...this.questions[index],
      ...updates,
      id, // ID는 변경 불가
      createdAt: this.questions[index].createdAt, // createdAt은 유지
      updatedAt: new Date().toISOString(), // updatedAt은 현재 시간으로 업데이트
    };

    this.questions[index] = updatedQuestion;
    return updatedQuestion;
  }

  delete(id: number): boolean {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return false;

    this.questions.splice(index, 1);
    return true;
  }
}

// 싱글톤 인스턴스
export const questionsStore = new QuestionsStore();
