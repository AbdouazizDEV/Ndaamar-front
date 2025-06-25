import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  contactInfo = [
    {
      icon: '📍',
      title: 'Adresse',
      content: '123 Avenue Léopold Sédar Senghor, Dakar, Sénégal',
      link: 'https://maps.google.com'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '+221 33 123 45 67',
      link: 'tel:+221331234567'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@ndaamar.sn',
      link: 'mailto:contact@ndaamar.sn'
    },
    {
      icon: '🕒',
      title: 'Horaires',
      content: 'Lun-Ven: 8h-18h, Sam: 9h-16h',
      link: null
    }
  ];

  faqs = [
    {
      question: 'Comment fonctionne la vérification des voitures ?',
      answer: 'Chaque voiture est inspectée par nos experts mécaniciens qui vérifient plus de 100 points de contrôle pour garantir sa fiabilité.'
    },
    {
      question: 'Quels sont les frais de transaction ?',
      answer: 'Nos frais sont transparents et inclus dans le prix affiché. Aucun frais caché n\'est appliqué.'
    },
    {
      question: 'Puis-je vendre ma voiture sur Ndaamar ?',
      answer: 'Oui ! Nous acceptons les voitures en bon état. Contactez-nous pour un rendez-vous d\'évaluation.'
    },
    {
      question: 'Y a-t-il une garantie sur les voitures ?',
      answer: 'Toutes nos voitures bénéficient d\'une garantie de 3 mois minimum, selon le modèle et l\'état.'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      // Simulation d'envoi de formulaire
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
        this.contactForm.reset();
      }, 2000);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return 'Ce champ est requis';
      }
      if (field.errors?.['email']) {
        return 'Format d\'email invalide';
      }
      if (field.errors?.['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
      if (field.errors?.['pattern']) {
        return 'Format de téléphone invalide (9 chiffres)';
      }
    }
    return '';
  }
} 