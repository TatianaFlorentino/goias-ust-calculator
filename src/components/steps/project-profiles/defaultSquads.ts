
import { DefaultSquad } from '@/types/calculator';

export const defaultSquads: DefaultSquad[] = [
  {
    type: 'projeto',
    complexity: 'baixa',
    duration: 60,
    profiles: [
      { profileName: 'Analista de Requisitos/Processos/Negócios Júnior', fcp: 1.1, quantity: 1.00 },
      { profileName: 'Desenvolvedor de Software Júnior', fcp: 1.0, quantity: 1.00 },
      { profileName: 'Desenvolvedor de Software Pleno', fcp: 1.1, quantity: 1.00 },
      { profileName: 'Designer de UX/UI Pleno', fcp: 1.1, quantity: 0.25 },
      { profileName: 'Arquiteto de Software/Soluções Júnior', fcp: 1.6, quantity: 0.25 },
      { profileName: 'Analista de Testes/Qualidade Pleno', fcp: 1.3, quantity: 0.25 },
      { profileName: 'Scrum Master/Agilista Pleno', fcp: 1.9, quantity: 0.50 },
      { profileName: 'Gerente de Projetos de TIC Pleno', fcp: 2.1, quantity: 0.25 }
    ]
  },
  {
    type: 'projeto',
    complexity: 'media',
    duration: 108,
    profiles: [
      { profileName: 'Analista de Requisitos/Processos/Negócios Pleno', fcp: 1.3, quantity: 1.00 },
      { profileName: 'Desenvolvedor de Software Pleno', fcp: 1.1, quantity: 2.00 },
      { profileName: 'Desenvolvedor de Software Sênior', fcp: 1.7, quantity: 1.00 },
      { profileName: 'Designer de UX/UI Pleno', fcp: 1.1, quantity: 0.25 },
      { profileName: 'Arquiteto de Software/Soluções Pleno', fcp: 2.1, quantity: 0.25 },
      { profileName: 'Analista de Testes/Qualidade Pleno', fcp: 1.3, quantity: 0.50 },
      { profileName: 'Scrum Master/Agilista Pleno', fcp: 1.9, quantity: 0.50 },
      { profileName: 'Gerente de Projetos de TIC Pleno', fcp: 2.1, quantity: 0.25 }
    ]
  },
  {
    type: 'projeto',
    complexity: 'alta',
    duration: 144,
    profiles: [
      { profileName: 'Analista de Requisitos/Processos/Negócios Sênior', fcp: 1.5, quantity: 2.00 },
      { profileName: 'Desenvolvedor de Software Pleno', fcp: 1.1, quantity: 2.00 },
      { profileName: 'Desenvolvedor de Software Sênior', fcp: 1.7, quantity: 2.00 },
      { profileName: 'Designer de UX/UI Sênior', fcp: 1.3, quantity: 0.25 },
      { profileName: 'Arquiteto de Software/Soluções Sênior', fcp: 3.2, quantity: 0.50 },
      { profileName: 'Analista de Testes/Qualidade Sênior', fcp: 1.5, quantity: 0.50 },
      { profileName: 'Scrum Master/Agilista Sênior', fcp: 3.0, quantity: 0.50 },
      { profileName: 'Gerente de Projetos de TIC Sênior', fcp: 3.2, quantity: 0.25 }
    ]
  }
];
