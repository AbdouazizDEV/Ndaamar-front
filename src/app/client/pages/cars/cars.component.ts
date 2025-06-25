import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.interface';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, CarCardComponent, NavbarComponent, FooterComponent],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  loading = true;
  error = false;
  
  // Filtres
  searchTerm = '';
  selectedBrand = '';
  selectedPriceRange = '';
  selectedFuelType = '';
  selectedTransmission = '';
  selectedLocation = '';
  
  // Options de filtres
  brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Peugeot', 'Renault'];
  priceRanges = [
    { value: '', label: 'Tous les prix' },
    { value: '0-5000000', label: 'Moins de 5M FCFA' },
    { value: '5000000-10000000', label: '5M - 10M FCFA' },
    { value: '10000000-20000000', label: '10M - 20M FCFA' },
    { value: '20000000+', label: 'Plus de 20M FCFA' }
  ];
  fuelTypes = ['Essence', 'Diesel', 'Électrique', 'Hybride'];
  transmissions = ['Manuelle', 'Automatique'];
  locations = ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.loading = true;
    this.carService.getAvailableCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.filteredCars = cars;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredCars = this.cars.filter(car => {
      // Recherche par texte
      const matchesSearch = !this.searchTerm || 
        car.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtre par marque
      const matchesBrand = !this.selectedBrand || car.brand === this.selectedBrand;

      // Filtre par prix
      const matchesPrice = !this.selectedPriceRange || this.matchesPriceRange(car.price);

      // Filtre par carburant
      const matchesFuel = !this.selectedFuelType || car.fuelType === this.selectedFuelType;

      // Filtre par transmission
      const matchesTransmission = !this.selectedTransmission || car.transmission === this.selectedTransmission;

      // Filtre par localisation
      const matchesLocation = !this.selectedLocation || car.location === this.selectedLocation;

      return matchesSearch && matchesBrand && matchesPrice && matchesFuel && matchesTransmission && matchesLocation;
    });
  }

  private matchesPriceRange(price: number): boolean {
    if (!this.selectedPriceRange) return true;
    
    const [min, max] = this.selectedPriceRange.split('-').map(p => 
      p === '+' ? Infinity : parseInt(p)
    );
    
    if (this.selectedPriceRange.endsWith('+')) {
      return price >= min;
    }
    
    return price >= min && price <= max;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.selectedFuelType = '';
    this.selectedTransmission = '';
    this.selectedLocation = '';
    this.applyFilters();
  }

  get activeFiltersCount(): number {
    return [this.searchTerm, this.selectedBrand, this.selectedPriceRange, 
            this.selectedFuelType, this.selectedTransmission, this.selectedLocation]
      .filter(filter => filter !== '').length;
  }

  trackByCarId(index: number, car: Car): number {
    return car.id;
  }
} 