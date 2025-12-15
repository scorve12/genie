import { NextRequest, NextResponse } from 'next/server';
import { coffees } from '@/data/coffees';
import { Coffee } from '@/types/coffee';

// GET /api/beans/:id - 단일 원두 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const beanId = parseInt(id);

    // TODO: 백엔드에서 데이터베이스에서 가져오도록 구현
    const bean = coffees.find((c) => c.id === beanId);

    if (!bean) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bean not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bean,
    });
  } catch (error) {
    console.error('Error fetching bean:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bean',
      },
      { status: 500 }
    );
  }
}

// PUT /api/beans/:id - 원두 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const beanId = parseInt(id);
    const updates: Partial<Coffee> = await request.json();

    // TODO: 백엔드에서 데이터베이스 업데이트 구현
    const bean = coffees.find((c) => c.id === beanId);

    if (!bean) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bean not found',
        },
        { status: 404 }
      );
    }

    const updatedBean: Coffee = {
      ...bean,
      ...updates,
      id: beanId, // ID는 변경 불가
    };

    return NextResponse.json({
      success: true,
      data: updatedBean,
    });
  } catch (error) {
    console.error('Error updating bean:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update bean',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/beans/:id - 원두 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const beanId = parseInt(id);

    // TODO: 백엔드에서 데이터베이스에서 삭제 구현
    const bean = coffees.find((c) => c.id === beanId);

    if (!bean) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bean not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bean deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting bean:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete bean',
      },
      { status: 500 }
    );
  }
}
