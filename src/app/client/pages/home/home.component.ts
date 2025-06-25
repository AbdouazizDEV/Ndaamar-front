import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.interface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, NavbarComponent, HeroComponent, CarCardComponent, FooterComponent],
  standalone: true
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];
  loading = true;
  error = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.loading = true;
    this.carService.getAvailableCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
