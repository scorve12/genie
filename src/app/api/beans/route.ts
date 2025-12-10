import { NextRequest, NextResponse } from 'next/server';
import { coffees } from '@/data/coffees';
import { Coffee } from '@/types/coffee';

// GET /api/beans - 모든 원두 조회
export async function GET() {
  try {
    // TODO: 백엔드에서 데이터베이스에서 가져오도록 구현
    // 현재는 임시로 정적 데이터 반환
    return NextResponse.json({
      success: true,
      data: coffees,
    });
  } catch (error) {
    console.error('Error fetching beans:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch beans',
      },
      { status: 500 }
    );
  }
}

// POST /api/beans - 새 원두 생성
export async function POST(request: NextRequest) {
  try {
    const body: Omit<Coffee, 'id'> = await request.json();

    // TODO: 백엔드에서 데이터베이스에 저장하도록 구현
    // 현재는 임시로 새 ID를 생성하여 반환
    const newBean: Coffee = {
      ...body,
      id: Date.now(), // 임시 ID 생성
    };

    return NextResponse.json({
      success: true,
      data: newBean,
    });
  } catch (error) {
    console.error('Error creating bean:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create bean',
      },
      { status: 500 }
    );
  }
}
