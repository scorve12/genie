import { NextRequest, NextResponse } from 'next/server';
import { questions } from '@/data/questions';
import { Question } from '@/types/question';

// GET /api/questions - 모든 질문 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    // TODO: 백엔드에서 데이터베이스에서 가져오도록 구현
    let filteredQuestions = questions;

    if (activeOnly) {
      filteredQuestions = questions.filter((q) => q.isActive);
    }

    // 순서대로 정렬
    const sortedQuestions = filteredQuestions.sort((a, b) => a.order - b.order);

    return NextResponse.json({
      success: true,
      data: sortedQuestions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch questions',
      },
      { status: 500 }
    );
  }
}

// POST /api/questions - 새 질문 생성
export async function POST(request: NextRequest) {
  try {
    const body: Omit<Question, 'id'> = await request.json();

    // TODO: 백엔드에서 데이터베이스에 저장하도록 구현
    const newQuestion: Question = {
      ...body,
      id: Date.now(), // 임시 ID 생성
    };

    return NextResponse.json({
      success: true,
      data: newQuestion,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create question',
      },
      { status: 500 }
    );
  }
}
