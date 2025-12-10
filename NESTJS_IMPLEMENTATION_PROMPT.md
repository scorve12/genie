# NestJS Backend 구현 프롬프트

## 프로젝트 개요

커피 원두 관리 및 추천 설문 시스템을 위한 NestJS REST API 백엔드를 구현해주세요.

## 요구사항

### 1. 기술 스택
- **Framework**: NestJS (최신 버전)
- **Database**: SQLite with better-sqlite3
- **ORM**: TypeORM 또는 Prisma
- **Language**: TypeScript
- **File Upload**: Multer
- **Validation**: class-validator, class-transformer

### 2. 프로젝트 구조
```
src/
├── main.ts
├── app.module.ts
├── beans/
│   ├── beans.module.ts
│   ├── beans.controller.ts
│   ├── beans.service.ts
│   ├── entities/
│   │   └── bean.entity.ts
│   └── dto/
│       ├── create-bean.dto.ts
│       └── update-bean.dto.ts
├── questions/
│   ├── questions.module.ts
│   ├── questions.controller.ts
│   ├── questions.service.ts
│   ├── entities/
│   │   └── question.entity.ts
│   └── dto/
│       ├── create-question.dto.ts
│       └── update-question.dto.ts
├── upload/
│   ├── upload.module.ts
│   ├── upload.controller.ts
│   └── upload.service.ts
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── transform.interceptor.ts
│   └── interfaces/
│       └── api-response.interface.ts
└── database/
    ├── database.module.ts
    └── seeds/
        ├── beans.seed.ts
        └── questions.seed.ts
```

### 3. 공통 응답 형식

모든 API 응답은 다음 형식을 따릅니다:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

이를 위한 Interceptor를 구현해주세요.

## 구현할 기능

### A. Beans Module (원두 관리)

#### Entity (Bean)
```typescript
{
  id: number;                     // Primary Key, Auto Increment
  name: string;                   // 원두 이름
  origin: string;                 // 원산지
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  flavor: string[];               // 향미 배열 (JSON으로 저장)
  description: string;            // 설명
  price: number;                  // 가격 (USD)
  image?: string;                 // 이미지 URL (선택)
  createdAt: Date;                // 생성일
  updatedAt: Date;                // 수정일
}
```

#### Endpoints

**1. GET /api/beans**
- 모든 원두 조회
- 응답: `ApiResponse<Bean[]>`

**2. GET /api/beans/:id**
- 단일 원두 조회
- 응답: `ApiResponse<Bean>`
- 404 에러 처리

**3. POST /api/beans**
- 새 원두 생성
- Body: CreateBeanDto
- 응답: `ApiResponse<Bean>`

**4. PUT /api/beans/:id**
- 원두 수정 (Partial update)
- Body: UpdateBeanDto
- 응답: `ApiResponse<Bean>`

**5. DELETE /api/beans/:id**
- 원두 삭제
- 응답: `ApiResponse<null>` with message

#### Validation (CreateBeanDto)
```typescript
{
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsEnum(['Light', 'Medium', 'Medium-Dark', 'Dark'])
  roastLevel: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  flavor: string[];

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsNumber()
  @Min(0.01)
  price: number;

  @IsString()
  @IsOptional()
  image?: string;
}
```

---

### B. Questions Module (설문 관리)

#### Entity (Question)
```typescript
{
  id: number;                     // Primary Key, Auto Increment
  preferenceKey: string;          // UserPreferences 키 (unique)
  questionText: string;           // 질문 텍스트
  description: string;            // 설명
  order: number;                  // 표시 순서
  isActive: boolean;              // 활성화 여부 (기본값: true)
  createdAt: Date;
  updatedAt: Date;
}
```

#### Endpoints

**1. GET /api/questions**
- 모든 질문 조회
- Query Param: `active=true` (활성화된 질문만 필터)
- 결과는 `order` 필드로 오름차순 정렬
- 응답: `ApiResponse<Question[]>`

**2. GET /api/questions/:id**
- 단일 질문 조회
- 응답: `ApiResponse<Question>`

**3. POST /api/questions**
- 새 질문 생성
- Body: CreateQuestionDto
- 응답: `ApiResponse<Question>`

**4. PUT /api/questions/:id**
- 질문 수정 (Partial update)
- Body: UpdateQuestionDto
- 응답: `ApiResponse<Question>`

**5. DELETE /api/questions/:id**
- 질문 삭제
- 응답: `ApiResponse<null>` with message

#### Validation (CreateQuestionDto)
```typescript
{
  @IsString()
  @IsNotEmpty()
  preferenceKey: string;

  @IsString()
  @MinLength(5)
  questionText: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  @Min(1)
  order: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
```

---

### C. Upload Module (이미지 업로드)

#### Endpoint

**POST /api/beans/upload**
- 이미지 파일 업로드
- Content-Type: `multipart/form-data`
- Field name: `file`
- 응답: `ApiResponse<{ url: string }>`

#### 요구사항
- 허용 파일 타입: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`
- 최대 파일 크기: 5MB
- 저장 위치: `./public/uploads/beans/`
- 파일명 형식: `{timestamp}-{randomId}.{extension}`
- URL 반환: `/uploads/beans/{filename}`

#### Multer 설정
```typescript
// 파일 필터
const imageFileFilter = (req, file, callback) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};

// 파일명 생성
const editFileName = (req, file, callback) => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 9);
  const extension = file.originalname.split('.').pop();
  callback(null, `${timestamp}-${randomId}.${extension}`);
};
```

---

## 추가 구현 사항

### 1. CORS 설정
```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3002', 'http://localhost:3000'],
  credentials: true,
});
```

### 2. Global Validation Pipe
```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
);
```

### 3. Global Exception Filter
HTTP 예외를 ApiResponse 형식으로 변환

```typescript
{
  "success": false,
  "error": "에러 메시지"
}
```

### 4. Transform Interceptor
성공 응답을 ApiResponse 형식으로 변환

```typescript
{
  "success": true,
  "data": {...}
}
```

### 5. Static File Serving
```typescript
// main.ts
app.useStaticAssets(join(__dirname, '..', 'public'));
```

---

## 데이터베이스 설정

### 1. SQLite 데이터베이스
- 파일 위치: `./database.sqlite`
- 자동 생성 및 마이그레이션

### 2. Seed Data (초기 데이터)

#### Beans (6개)
```typescript
[
  {
    name: '에티오피아 예가체프',
    origin: '에티오피아, 예가체프',
    roastLevel: 'Light',
    flavor: ['플로럴', '시트러스', '베르가못'],
    description: '밝은 산미와 플로럴한 향이 특징인 에티오피아 대표 원두입니다.',
    price: 24.99
  },
  {
    name: '콜롬비아 수프레모',
    origin: '콜롬비아, 안티오키아',
    roastLevel: 'Medium',
    flavor: ['초콜릿', '캐러멜', '너트'],
    description: '부드러운 맛과 균형잡힌 바디감이 특징입니다.',
    price: 22.99
  },
  {
    name: '케냐 AA',
    origin: '케냐, 키암부',
    roastLevel: 'Medium',
    flavor: ['블랙커런트', '와인', '시트러스'],
    description: '강렬한 산미와 복합적인 과일향이 매력적입니다.',
    price: 26.99
  },
  {
    name: '과테말라 안티구아',
    origin: '과테말라, 안티구아',
    roastLevel: 'Medium-Dark',
    flavor: ['다크초콜릿', '너트', '스파이시'],
    description: '풍부한 바디감과 초콜릿 향이 돋보이는 원두입니다.',
    price: 23.99
  },
  {
    name: '브라질 산토스',
    origin: '브라질, 미나스제라이스',
    roastLevel: 'Medium',
    flavor: ['너트', '초콜릿', '캐러멜'],
    description: '부드럽고 고소한 맛으로 에스프레소에 적합합니다.',
    price: 19.99
  },
  {
    name: '수마트라 만델링',
    origin: '인도네시아, 수마트라',
    roastLevel: 'Dark',
    flavor: ['다크초콜릿', '토마토', '허브'],
    description: '깊고 묵직한 바디감과 낮은 산미가 특징입니다.',
    price: 25.99
  }
]
```

#### Questions (5개)
```typescript
[
  {
    preferenceKey: 'likesAcidity',
    questionText: '산미가 있는 원두를 선호하시나요?',
    description: '밝고 상큼한 시트러스나 과일 같은 산미를 좋아하시나요?',
    order: 1,
    isActive: true
  },
  {
    preferenceKey: 'likesFullBody',
    questionText: '진한 바디감을 원하시나요?',
    description: '묵직하고 풍부한 질감의 커피를 선호하시나요?',
    order: 2,
    isActive: true
  },
  {
    preferenceKey: 'likesChocolateNut',
    questionText: '초콜릿이나 견과류 향을 좋아하시나요?',
    description: '달콤하고 고소한 초콜릿, 캐러멜, 너트 향을 선호하시나요?',
    order: 3,
    isActive: true
  },
  {
    preferenceKey: 'likesFruityFloral',
    questionText: '과일향이나 플로럴 향을 선호하시나요?',
    description: '꽃향기나 베리, 와인 같은 화사한 향을 좋아하시나요?',
    order: 4,
    isActive: true
  },
  {
    preferenceKey: 'likesDarkRoast',
    questionText: '다크 로스팅을 선호하시나요?',
    description: '진하고 강한 맛의 다크 로스팅 커피를 원하시나요?',
    order: 5,
    isActive: true
  }
]
```

---

## 실행 및 테스트

### 1. 프로젝트 생성
```bash
nest new coffee-beans-api
cd coffee-beans-api
```

### 2. 필요한 패키지 설치
```bash
npm install @nestjs/typeorm typeorm better-sqlite3
npm install @nestjs/platform-express multer
npm install class-validator class-transformer
npm install @types/multer --save-dev
```

### 3. 개발 서버 실행
```bash
npm run start:dev
```

### 4. 포트
- **Backend**: `http://localhost:3000`
- **Frontend**: `http://localhost:3002` (Next.js)

### 5. 테스트
각 엔드포인트를 Postman이나 Thunder Client로 테스트하거나,
프론트엔드 애플리케이션과 연동하여 테스트

---

## 추가 고려사항

### 1. 에러 핸들링
- 404: 리소스를 찾을 수 없을 때
- 400: 유효성 검사 실패
- 500: 서버 내부 에러

### 2. 로깅
```typescript
// main.ts
app.useLogger(new Logger());
```

### 3. 환경 변수 (.env)
```
PORT=3000
DATABASE_PATH=./database.sqlite
UPLOAD_PATH=./public/uploads/beans
```

### 4. 향후 확장
- JWT 인증 추가 (관리자 전용)
- Swagger API 문서화
- 페이지네이션
- 검색/필터 기능
- 이미지 리사이징/최적화

---

## 체크리스트

구현 완료 시 다음 항목을 확인해주세요:

- [ ] Beans CRUD 5개 엔드포인트 구현
- [ ] Questions CRUD 5개 엔드포인트 구현
- [ ] 이미지 업로드 엔드포인트 구현
- [ ] 모든 응답이 ApiResponse 형식
- [ ] Validation 적용 (class-validator)
- [ ] CORS 설정
- [ ] Static file serving (uploads 폴더)
- [ ] Seed data 자동 삽입
- [ ] 에러 핸들링
- [ ] 프론트엔드와 연동 테스트

---

## 예상 결과

이 프롬프트를 따라 구현하면:

1. **11개의 RESTful API 엔드포인트**가 완성됩니다
2. **SQLite 데이터베이스**에 원두와 설문 데이터가 저장됩니다
3. **이미지 업로드** 기능이 작동합니다
4. **프론트엔드 Next.js 앱**과 완벽하게 통합됩니다

기존 Next.js 프론트엔드의 `/api/beans` 및 `/api/questions` 라우트를
NestJS 백엔드 `http://localhost:3000/api/beans`,
`http://localhost:3000/api/questions`로 프록시하거나
직접 호출하도록 수정하면 됩니다.
