// src/utils/recommendationEngine.ts
import { Coffee } from '@/types/coffee';

export interface UserPreferences {
  likesAcidity: boolean;
  likesFullBody: boolean;
  likesChocolateNut: boolean;
  likesFruityFloral: boolean;
  likesDarkRoast: boolean;
}

export interface CoffeeRecommendation {
  coffee: Coffee;
  score: number;
  matchReasons: string[];
}

/**
 * Recommendation engine that scores coffees based on user preferences
 */
export function recommendCoffees(
  coffees: Coffee[],
  preferences: UserPreferences
): CoffeeRecommendation[] {
  const recommendations = coffees.map((coffee) => {
    let score = 0;
    const matchReasons: string[] = [];

    // Roast level scoring
    if (preferences.likesDarkRoast) {
      if (coffee.roastLevel === 'Dark') {
        score += 30;
        matchReasons.push('다크 로스팅');
      } else if (coffee.roastLevel === 'Medium-Dark') {
        score += 20;
        matchReasons.push('미디엄-다크 로스팅');
      }
    } else {
      if (coffee.roastLevel === 'Light') {
        score += 30;
        matchReasons.push('라이트 로스팅');
      } else if (coffee.roastLevel === 'Medium') {
        score += 20;
        matchReasons.push('미디엄 로스팅');
      }
    }

    // Acidity preference
    const acidicOrigins = ['Ethiopia', 'Kenya'];
    const hasAcidity = acidicOrigins.some(origin => coffee.origin.includes(origin)) ||
                       coffee.roastLevel === 'Light';

    if (preferences.likesAcidity && hasAcidity) {
      score += 25;
      matchReasons.push('밝은 산미');
    } else if (!preferences.likesAcidity && !hasAcidity) {
      score += 15;
      matchReasons.push('부드러운 맛');
    }

    // Full body preference
    const fullBodyOrigins = ['Indonesia', 'Brazil', 'Kenya'];
    const hasFullBody = fullBodyOrigins.some(origin => coffee.origin.includes(origin)) ||
                        coffee.roastLevel === 'Dark' || coffee.roastLevel === 'Medium-Dark';

    if (preferences.likesFullBody && hasFullBody) {
      score += 20;
      matchReasons.push('풀바디');
    } else if (!preferences.likesFullBody && !hasFullBody) {
      score += 10;
      matchReasons.push('가벼운 바디');
    }

    // Chocolate/Nut flavor preference
    const chocolateNutFlavors = ['초콜릿', '너트', '캐러멜', '코코아', '다크초콜릿', '브라운슈가'];
    const hasChocolateNut = coffee.flavor.some(f =>
      chocolateNutFlavors.some(target => f.includes(target))
    );

    if (preferences.likesChocolateNut && hasChocolateNut) {
      score += 25;
      matchReasons.push('초콜릿/너트 향');
    }

    // Fruity/Floral flavor preference
    const fruityFloralFlavors = ['플로럴', '시트러스', '베르가못', '블랙커런트', '와인', '토마토'];
    const hasFruityFloral = coffee.flavor.some(f =>
      fruityFloralFlavors.some(target => f.includes(target))
    );

    if (preferences.likesFruityFloral && hasFruityFloral) {
      score += 25;
      matchReasons.push('과일/플로럴 향');
    }

    return {
      coffee,
      score,
      matchReasons
    };
  });

  // Sort by score descending and return top recommendations
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/**
 * Calculate match percentage based on score
 */
export function getMatchPercentage(score: number): number {
  // Maximum possible score is around 125 (30+25+20+25+25)
  const maxScore = 125;
  return Math.min(Math.round((score / maxScore) * 100), 100);
}
