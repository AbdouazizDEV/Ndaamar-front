import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Abdou Aziz Diop',
      role: 'Fondateur & CEO',
      image: 'https://res.cloudinary.com/dhivn2ahm/image/upload/v1739929505/WhatsApp_Image_2024-04-29_at_17.09.21_1_-removebg-preview_bvo4sq.jpg',
      description: 'Expert en automobile avec plus de 10 ans d\'expérience dans le secteur.'
    },
    {
      name: 'Astou Ndoye Dia',
      role: 'Co-fondateur & Commerciale',
      image: 'https://res.cloudinary.com/dhivn2ahm/image/upload/v1750891342/WhatsApp_Image_2025-06-25_at_22.36.36_yuwn8x.jpg',
      description: 'Spécialiste en relations clients et développement commercial.'
    }
  ];

  stats = [
    { number: '500+', label: 'Voitures vendues' },
    { number: '1000+', label: 'Clients satisfaits' },
    { number: '50+', label: 'Vendeurs partenaires' },
    { number: '5', label: 'Années d\'expérience' }
  ];

  values = [
    {
      icon: '🤝',
      title: 'Confiance',
      description: 'Nous construisons des relations durables basées sur la transparence et l\'honnêteté.'
    },
    {
      icon: '🔍',
      title: 'Qualité',
      description: 'Chaque voiture est inspectée par nos experts pour garantir sa fiabilité.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Nous utilisons les dernières technologies pour améliorer votre expérience.'
    },
    {
      icon: '❤️',
      title: 'Service Client',
      description: 'Notre équipe est disponible 24/7 pour vous accompagner dans votre projet.'
    }
  ];
} 