# Coffee Beans API 명세서 (NestJS Backend)

## 개요
커피 원두 관리 및 추천 설문 시스템을 위한 RESTful API

## 공통 응답 형식

모든 API는 다음 형식으로 응답합니다:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 데이터 모델

### Coffee (원두)
```typescript
interface Coffee {
  id: number;
  name: string;                    // 원두 이름
  origin: string;                  // 원산지
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';  // 로스팅 레벨
  flavor: string[];                // 향미 (배열)
  description: string;             // 설명
  price: number;                   // 가격 (USD)
  image?: string;                  // 이미지 URL (선택)
}
```

### Question (설문 질문)
```typescript
interface Question {
  id: number;
  preferenceKey: string;           // UserPreferences 키 (예: 'likesAcidity')
  questionText: string;            // 질문 텍스트
  description: string;             // 설명
  order: number;                   // 표시 순서
  isActive: boolean;               // 활성화 여부
}
```

---

## 1. Coffee Bean API (원두 관리)

### 1.1 GET /api/beans
**모든 원두 조회**

**Request:**
```
GET /api/beans
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "에티오피아 예가체프",
      "origin": "에티오피아, 예가체프",
      "roastLevel": "Light",
      "flavor": ["플로럴", "시트러스", "베르가못"],
      "description": "밝은 산미와 플로럴한 향이 특징인 에티오피아 대표 원두",
      "price": 24.99,
      "image": "/uploads/beans/1234567890-abc.jpg"
    }
  ]
}
```

---

### 1.2 GET /api/beans/:id
**단일 원두 조회**

**Request:**
```
GET /api/beans/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "에티오피아 예가체프",
    "origin": "에티오피아, 예가체프",
    "roastLevel": "Light",
    "flavor": ["플로럴", "시트러스", "베르가못"],
    "description": "밝은 산미와 플로럴한 향이 특징인 에티오피아 대표 원두",
    "price": 24.99,
    "image": "/uploads/beans/1234567890-abc.jpg"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Bean not found"
}
```

---

### 1.3 POST /api/beans
**새 원두 생성**

**Request:**
```json
{
  "name": "콜롬비아 수프레모",
  "origin": "콜롬비아, 안티오키아",
  "roastLevel": "Medium",
  "flavor": ["초콜릿", "캐러멜", "너트"],
  "description": "부드러운 맛과 균형잡힌 바디감이 특징",
  "price": 22.99,
  "image": "/uploads/beans/1234567891-def.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "콜롬비아 수프레모",
    "origin": "콜롬비아, 안티오키아",
    "roastLevel": "Medium",
    "flavor": ["초콜릿", "캐러멜", "너트"],
    "description": "부드러운 맛과 균형잡힌 바디감이 특징",
    "price": 22.99,
    "image": "/uploads/beans/1234567891-def.jpg"
  }
}
```

**Validation Rules:**
- name: 최소 2자
- origin: 필수
- roastLevel: 'Light', 'Medium', 'Medium-Dark', 'Dark' 중 하나
- flavor: 최소 1개 이상
- description: 10-500자
- price: 0.01 이상
- image: 선택

---

### 1.4 PUT /api/beans/:id
**원두 수정**

**Request:**
```
PUT /api/beans/7
```

```json
{
  "price": 23.99,
  "description": "부드러운 맛과 균형잡힌 바디감이 특징. 디카페인 버전도 가능"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "콜롬비아 수프레모",
    "origin": "콜롬비아, 안티오키아",
    "roastLevel": "Medium",
    "flavor": ["초콜릿", "캐러멜", "너트"],
    "description": "부드러운 맛과 균형잡힌 바디감이 특징. 디카페인 버전도 가능",
    "price": 23.99,
    "image": "/uploads/beans/1234567891-def.jpg"
  }
}
```

**Note:**
- Partial update 지원 (수정하려는 필드만 전송)
- id는 변경 불가

---

### 1.5 DELETE /api/beans/:id
**원두 삭제**

**Request:**
```
DELETE /api/beans/7
```

**Response:**
```json
{
  "success": true,
  "message": "Bean deleted successfully"
}
```

---

### 1.6 POST /api/beans/upload
**이미지 업로드**

**Request:**
```
POST /api/beans/upload
Content-Type: multipart/form-data

file: [이미지 파일]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "/uploads/beans/1234567892-ghi.jpg"
  }
}
```

**Validation Rules:**
- 파일 타입: image/jpeg, image/jpg, image/png, image/webp
- 최대 크기: 5MB
- 저장 위치: `/public/uploads/beans/`
- 파일명 형식: `{timestamp}-{randomId}.{extension}`

---

## 2. Question API (설문 질문 관리)

### 2.1 GET /api/questions
**모든 질문 조회**

**Request:**
```
GET /api/questions
GET /api/questions?active=true  (활성화된 질문만)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "preferenceKey": "likesAcidity",
      "questionText": "산미가 있는 원두를 선호하시나요?",
      "description": "밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?",
      "order": 1,
      "isActive": true
    },
    {
      "id": 2,
      "preferenceKey": "likesFullBody",
      "questionText": "진한 바디감을 원하시나요?",
      "description": "묵직하고 풍부한 질감의 커피를 선호하시나요?",
      "order": 2,
      "isActive": true
    }
  ]
}
```

**Note:**
- 결과는 `order` 필드로 오름차순 정렬
- `active=true` 쿼리 파라미터 사용 시 `isActive: true`인 질문만 반환

---

### 2.2 GET /api/questions/:id
**단일 질문 조회**

**Request:**
```
GET /api/questions/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "preferenceKey": "likesAcidity",
    "questionText": "산미가 있는 원두를 선호하시나요?",
    "description": "밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?",
    "order": 1,
    "isActive": true
  }
}
```

---

### 2.3 POST /api/questions
**새 질문 생성**

**Request:**
```json
{
  "preferenceKey": "likesNutty",
  "questionText": "고소한 맛을 좋아하시나요?",
  "description": "견과류나 곡물 같은 고소한 맛을 선호하시나요?",
  "order": 6,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "preferenceKey": "likesNutty",
    "questionText": "고소한 맛을 좋아하시나요?",
    "description": "견과류나 곡물 같은 고소한 맛을 선호하시나요?",
    "order": 6,
    "isActive": true
  }
}
```

**Validation Rules:**
- preferenceKey: 필수, 최소 1자
- questionText: 필수, 최소 5자
- description: 필수, 최소 5자
- order: 필수, 최소 1
- isActive: boolean (기본값: true)

---

### 2.4 PUT /api/questions/:id
**질문 수정**

**Request:**
```
PUT /api/questions/6
```

```json
{
  "isActive": false,
  "order": 10
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "preferenceKey": "likesNutty",
    "questionText": "고소한 맛을 좋아하시나요?",
    "description": "견과류나 곡물 같은 고소한 맛을 선호하시나요?",
    "order": 10,
    "isActive": false
  }
}
```

---

### 2.5 DELETE /api/questions/:id
**질문 삭제**

**Request:**
```
DELETE /api/questions/6
```

**Response:**
```json
{
  "success": true,
  "message": "Question deleted successfully"
}
```

---

## 3. 에러 처리

### 에러 응답 형식
```json
{
  "success": false,
  "error": "에러 메시지"
}
```

### HTTP 상태 코드
- `200 OK`: 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청 (유효성 검사 실패)
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 에러

---

## 4. 데이터베이스 스키마

### coffees 테이블
```sql
CREATE TABLE coffees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  roast_level TEXT NOT NULL CHECK(roast_level IN ('Light', 'Medium', 'Medium-Dark', 'Dark')),
  flavor TEXT NOT NULL,  -- JSON array로 저장
  description TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### questions 테이블
```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  preference_key TEXT NOT NULL UNIQUE,
  question_text TEXT NOT NULL,
  description TEXT NOT NULL,
  order_num INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questions_order ON questions(order_num);
CREATE INDEX idx_questions_active ON questions(is_active);
```

---

## 5. 초기 데이터 (Seed Data)

### Coffees
```javascript
[
  {
    id: 1,
    name: '에티오피아 예가체프',
    origin: '에티오피아, 예가체프',
    roastLevel: 'Light',
    flavor: ['플로럴', '시트러스', '베르가못'],
    description: '밝은 산미와 플로럴한 향이 특징인 에티오피아 대표 원두입니다.',
    price: 24.99
  },
  {
    id: 2,
    name: '콜롬비아 수프레모',
    origin: '콜롬비아, 안티오키아',
    roastLevel: 'Medium',
    flavor: ['초콜릿', '캐러멜', '너트'],
    description: '부드러운 맛과 균형잡힌 바디감이 특징입니다.',
    price: 22.99
  },
  {
    id: 3,
    name: '케냐 AA',
    origin: '케냐, 키암부',
    roastLevel: 'Medium',
    flavor: ['블랙커런트', '와인', '시트러스'],
    description: '강렬한 산미와 복합적인 과일향이 매력적입니다.',
    price: 26.99
  },
  {
    id: 4,
    name: '과테말라 안티구아',
    origin: '과테말라, 안티구아',
    roastLevel: 'Medium-Dark',
    flavor: ['다크초콜릿', '너트', '스파이시'],
    description: '풍부한 바디감과 초콜릿 향이 돋보이는 원두입니다.',
    price: 23.99
  },
  {
    id: 5,
    name: '브라질 산토스',
    origin: '브라질, 미나스제라이스',
    roastLevel: 'Medium',
    flavor: ['너트', '초콜릿', '캐러멜'],
    description: '부드럽고 고소한 맛으로 에스프레소에 적합합니다.',
    price: 19.99
  },
  {
    id: 6,
    name: '수마트라 만델링',
    origin: '인도네시아, 수마트라',
    roastLevel: 'Dark',
    flavor: ['다크초콜릿', '토마토', '허브'],
    description: '깊고 묵직한 바디감과 낮은 산미가 특징입니다.',
    price: 25.99
  }
]
```

### Questions
```javascript
[
  {
    id: 1,
    preferenceKey: 'likesAcidity',
    questionText: '산미가 있는 원두를 선호하시나요?',
    description: '밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?',
    order: 1,
    isActive: true
  },
  {
    id: 2,
    preferenceKey: 'likesFullBody',
    questionText: '진한 바디감을 원하시나요?',
    description: '묵직하고 풍부한 질감의 커피를 선호하시나요?',
    order: 2,
    isActive: true
  },
  {
    id: 3,
    preferenceKey: 'likesChocolateNut',
    questionText: '초콜릿이나 견과류 향을 좋아하시나요?',
    description: '달콤하고 고소한 초콜릿, 캐러멜, 너트 향을 선호하시나요?',
    order: 3,
    isActive: true
  },
  {
    id: 4,
    preferenceKey: 'likesFruityFloral',
    questionText: '과일향이나 플로럴 향을 선호하시나요?',
    description: '꽃향기나 베리, 와인 같은 화사한 향을 좋아하시나요?',
    order: 4,
    isActive: true
  },
  {
    id: 5,
    preferenceKey: 'likesDarkRoast',
    questionText: '다크 로스팅을 선호하시나요?',
    description: '진하고 강한 맛의 다크 로스팅 커피를 원하시나요?',
    order: 5,
    isActive: true
  }
]
```

---

## 6. CORS 설정

프론트엔드 주소: `http://localhost:3002` (또는 배포된 도메인)

```typescript
// NestJS CORS 설정 예시
app.enableCors({
  origin: ['http://localhost:3002', 'http://localhost:3000'],
  credentials: true,
});
```

---

## 7. 추가 고려사항

### 7.1 이미지 저장
- 로컬 파일 시스템: `/public/uploads/beans/`
- URL 반환 형식: `/uploads/beans/{filename}`
- 프론트엔드에서 `http://localhost:PORT/uploads/beans/{filename}`로 접근

### 7.2 데이터베이스
- SQLite 사용 (better-sqlite3)
- 파일 위치: `./database.sqlite`
- TypeORM 또는 Prisma 사용 권장

### 7.3 향후 확장
- JWT 인증 추가 (관리자 로그인)
- 페이지네이션
- 검색/필터 기능
- 이미지 최적화

---

## 요약

**총 11개의 API 엔드포인트:**

### Beans (원두) - 6개
1. `GET /api/beans` - 목록 조회
2. `GET /api/beans/:id` - 단일 조회
3. `POST /api/beans` - 생성
4. `PUT /api/beans/:id` - 수정
5. `DELETE /api/beans/:id` - 삭제
6. `POST /api/beans/upload` - 이미지 업로드

### Questions (설문) - 5개
7. `GET /api/questions` - 목록 조회 (active 필터 지원)
8. `GET /api/questions/:id` - 단일 조회
9. `POST /api/questions` - 생성
10. `PUT /api/questions/:id` - 수정
11. `DELETE /api/questions/:id` - 삭제
