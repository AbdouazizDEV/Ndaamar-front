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
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      description: 'Expert en automobile avec plus de 10 ans d\'expérience dans le secteur.'
    },
    {
      name: 'Fatou Sall',
      role: 'Directrice Commerciale',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      description: 'Spécialiste en relations clients et développement commercial.'
    },
    {
      name: 'Mamadou Diallo',
      role: 'Directeur Technique',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      description: 'Ingénieur automobile passionné par l\'innovation technologique.'
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