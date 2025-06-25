export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
  transmission: 'Manuelle' | 'Automatique';
  color: string;
  description: string;
  imageUrl: string;
  features: string[];
  isAvailable: boolean;
  location: string;
  createdAt: Date;
} 