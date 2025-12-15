import { NextRequest, NextResponse } from 'next/server';
import { questions } from '@/data/questions';
import { Question } from '@/types/question';

// GET /api/questions/:id - 단일 질문 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questionId = parseInt(id);

    // TODO: 백엔드에서 데이터베이스에서 가져오도록 구현
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch question',
      },
      { status: 500 }
    );
  }
}

// PUT /api/questions/:id - 질문 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questionId = parseInt(id);
    const updates: Partial<Question> = await request.json();

    // TODO: 백엔드에서 데이터베이스 업데이트 구현
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question not found',
        },
        { status: 404 }
      );
    }

    const updatedQuestion: Question = {
      ...question,
      ...updates,
      id: questionId, // ID는 변경 불가
    };

    return NextResponse.json({
      success: true,
      data: updatedQuestion,
    });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update question',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/:id - 질문 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questionId = parseInt(id);

    // TODO: 백엔드에서 데이터베이스에서 삭제 구현
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete question',
      },
      { status: 500 }
    );
  }
}
