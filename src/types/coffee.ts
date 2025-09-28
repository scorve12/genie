// src/types/coffee.ts
export interface Coffee {
  id: number;
  name: string;
  origin: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  flavor: string[];
  description: string;
  price: number;
  image?: string;
}