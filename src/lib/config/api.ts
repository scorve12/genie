/**
 * API 설정
 *
 * NEXT_PUBLIC_API_URL 환경 변수를 사용하여 API 서버 URL을 관리합니다.
 * 기본값: http://localhost:3000
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * API 엔드포인트 전체 URL을 반환합니다
 */
export function getApiUrl(path: string): string {
  // path가 이미 /로 시작하는 경우 제거
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/api/${cleanPath}`;
}
