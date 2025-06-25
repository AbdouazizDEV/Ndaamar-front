import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car.interface';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
  standalone: true
})
export class CarCardComponent {
  @Input() car!: Car;

  formatMileage(mileage: number): string {
    return mileage.toLocaleString('fr-FR') + ' km';
  }

  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  }
}
