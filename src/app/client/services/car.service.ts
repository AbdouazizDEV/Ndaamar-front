import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: 25000,
      mileage: 15000,
      fuelType: 'Essence',
      transmission: 'Automatique',
      color: 'Blanc',
      description: 'Voiture familiale en excellent état, très économique et fiable.',
      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500',
      features: ['Climatisation', 'GPS', 'Caméra de recul', 'Sièges cuir'],
      isAvailable: true,
      location: 'Dakar',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      year: 2021,
      price: 22000,
      mileage: 25000,
      fuelType: 'Essence',
      transmission: 'Manuelle',
      color: 'Gris',
      description: 'Civic sportive avec un excellent rapport qualité-prix.',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
      features: ['Climatisation', 'Bluetooth', 'Volant cuir'],
      isAvailable: true,
      location: 'Thiès',
      createdAt: new Date('2024-01-10')
    },
    {
      id: 3,
      brand: 'BMW',
      model: 'Série 3',
      year: 2023,
      price: 45000,
      mileage: 8000,
      fuelType: 'Diesel',
      transmission: 'Automatique',
      color: 'Noir',
      description: 'BMW de luxe avec toutes les options, parfait état.',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
      features: ['Climatisation', 'GPS', 'Caméra 360°', 'Sièges sport', 'Toit ouvrant'],
      isAvailable: true,
      location: 'Dakar',
      createdAt: new Date('2024-01-20')
    },
    {
      id: 4,
      brand: 'Mercedes',
      model: 'Classe C',
      year: 2022,
      price: 52000,
      mileage: 12000,
      fuelType: 'Essence',
      transmission: 'Automatique',
      color: 'Bleu',
      description: 'Mercedes élégante et confortable, idéale pour les affaires.',
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500',
      features: ['Climatisation', 'GPS', 'Sièges chauffants', 'Système audio premium'],
      isAvailable: false,
      location: 'Saint-Louis',
      createdAt: new Date('2024-01-05')
    },
    {
      id: 5,
      brand: 'Audi',
      model: 'A4',
      year: 2021,
      price: 38000,
      mileage: 18000,
      fuelType: 'Diesel',
      transmission: 'Automatique',
      color: 'Blanc',
      description: 'Audi A4 en parfait état, très bien entretenue.',
      imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
      features: ['Climatisation', 'GPS', 'Caméra de recul', 'Sièges cuir'],
      isAvailable: true,
      location: 'Dakar',
      createdAt: new Date('2024-01-12')
    },
    {
      id: 6,
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2020,
      price: 18000,
      mileage: 35000,
      fuelType: 'Essence',
      transmission: 'Manuelle',
      color: 'Rouge',
      description: 'Golf compacte et économique, parfaite pour la ville.',
      imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=500',
      features: ['Climatisation', 'Bluetooth', 'Volant multifonction'],
      isAvailable: true,
      location: 'Kaolack',
      createdAt: new Date('2024-01-08')
    }
  ];

  constructor() { }

  // Récupérer toutes les voitures
  getAllCars(): Observable<Car[]> {
    return of(this.cars);
  }

  // Récupérer une voiture par ID
  getCarById(id: number): Observable<Car | undefined> {
    const car = this.cars.find(c => c.id === id);
    return of(car);
  }

  // Récupérer les voitures disponibles
  getAvailableCars(): Observable<Car[]> {
    const availableCars = this.cars.filter(car => car.isAvailable);
    return of(availableCars);
  }

  // Rechercher des voitures par critères
  searchCars(criteria: {
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: string;
    location?: string;
  }): Observable<Car[]> {
    let filteredCars = this.cars;

    if (criteria.brand) {
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(criteria.brand!.toLowerCase())
      );
    }

    if (criteria.minPrice) {
      filteredCars = filteredCars.filter(car => car.price >= criteria.minPrice!);
    }

    if (criteria.maxPrice) {
      filteredCars = filteredCars.filter(car => car.price <= criteria.maxPrice!);
    }

    if (criteria.fuelType) {
      filteredCars = filteredCars.filter(car => car.fuelType === criteria.fuelType);
    }

    if (criteria.location) {
      filteredCars = filteredCars.filter(car => 
        car.location.toLowerCase().includes(criteria.location!.toLowerCase())
      );
    }

    return of(filteredCars);
  }

  // Ajouter une nouvelle voiture
  addCar(car: Omit<Car, 'id' | 'createdAt'>): Observable<Car> {
    const newCar: Car = {
      ...car,
      id: Math.max(...this.cars.map(c => c.id)) + 1,
      createdAt: new Date()
    };
    this.cars.push(newCar);
    return of(newCar);
  }

  // Mettre à jour une voiture
  updateCar(id: number, updates: Partial<Car>): Observable<Car | undefined> {
    const index = this.cars.findIndex(car => car.id === id);
    if (index !== -1) {
      this.cars[index] = { ...this.cars[index], ...updates };
      return of(this.cars[index]);
    }
    return of(undefined);
  }

  // Supprimer une voiture
  deleteCar(id: number): Observable<boolean> {
    const index = this.cars.findIndex(car => car.id === id);
    if (index !== -1) {
      this.cars.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
