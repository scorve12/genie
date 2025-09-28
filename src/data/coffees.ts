// src/data/coffees.ts
import { Coffee } from '@/types/coffee';

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "에티오피아 예가체프",
    origin: "Ethiopia, Yirgacheffe",
    roastLevel: "Light",
    flavor: ["플로럴", "시트러스", "베르가못"],
    description: "밝고 화사한 꽃향기와 함께 레몬, 베르가못의 상큼한 산미가 특징인 에티오피아의 대표적인 스페셜티 커피입니다.",
    price: 18.50
  },
  {
    id: 2,
    name: "콜롬비아 수프레모",
    origin: "Colombia, Huila",
    roastLevel: "Medium",
    flavor: ["초콜릿", "캐러멜", "너트"],
    description: "균형 잡힌 바디감과 부드러운 초콜릿, 캐러멜의 단맛이 조화를 이루는 콜롬비아의 프리미엄 원두입니다.",
    price: 16.00
  },
  {
    id: 3,
    name: "케냐 AA",
    origin: "Kenya, Nyeri",
    roastLevel: "Medium",
    flavor: ["블랙커런트", "와인", "토마토"],
    description: "케냐 특유의 와인같은 산미와 블랙커런트의 진한 과일향, 풀바디의 묵직한 질감이 특징입니다.",
    price: 19.50
  },
  {
    id: 4,
    name: "과테말라 안티구아",
    origin: "Guatemala, Antigua",
    roastLevel: "Medium-Dark",
    flavor: ["스파이시", "코코아", "스모키"],
    description: "화산토양에서 자란 원두로 스모키한 향과 스파이시한 맛, 초콜릿의 달콤함이 복합적으로 어우러집니다.",
    price: 17.00
  },
  {
    id: 5,
    name: "브라질 산토스",
    origin: "Brazil, Santos",
    roastLevel: "Medium-Dark",
    flavor: ["너트", "초콜릿", "브라운슈가"],
    description: "부드럽고 고소한 너트향과 초콜릿의 단맛, 낮은 산미로 누구나 편하게 즐길 수 있는 대중적인 원두입니다.",
    price: 14.50
  },
  {
    id: 6,
    name: "수마트라 만델링",
    origin: "Indonesia, Sumatra",
    roastLevel: "Dark",
    flavor: ["허브", "다크초콜릿", "흙내음"],
    description: "독특한 허브향과 진한 다크초콜릿의 쓴맛, 흙내음이 나는 묵직한 바디감의 인도네시아 원두입니다.",
    price: 15.50
  }
];