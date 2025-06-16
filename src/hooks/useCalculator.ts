
import { useState } from 'react';
import { CalculatorData, ProfessionalProfile, Project, SquadComposition, CalculationResult } from '@/types/calculator';

const defaultProfiles: ProfessionalProfile[] = [
  { id: '1', name: 'Analista de Requisitos/Processos/Negócios Júnior', fcp: 1.1, type: 'projeto' },
  { id: '2', name: 'Analista de Requisitos/Processos/Negócios Pleno', fcp: 1.3, type: 'projeto' },
  { id: '3', name: 'Analista de Requisitos/Processos/Negócios Sênior', fcp: 1.5, type: 'projeto' },
  { id: '4', name: 'Desenvolvedor de Software Júnior', fcp: 1.0, type: 'projeto' },
  { id: '5', name: 'Desenvolvedor de Software Pleno', fcp: 1.1, type: 'projeto' },
  { id: '6', name: 'Desenvolvedor de Software Sênior', fcp: 1.7, type: 'projeto' },
  { id: '7', name: 'Designer de UX/UI Pleno', fcp: 1.1, type: 'projeto' },
  { id: '8', name: 'Designer de UX/UI Sênior', fcp: 1.3, type: 'projeto' },
  { id: '9', name: 'Arquiteto de Software/Soluções Júnior', fcp: 1.6, type: 'projeto' },
  { id: '10', name: 'Arquiteto de Software/Soluções Pleno', fcp: 2.1, type: 'projeto' },
  { id: '11', name: 'Arquiteto de Software/Soluções Sênior', fcp: 3.2, type: 'projeto' },
  { id: '12', name: 'Analista de Testes/Qualidade Pleno', fcp: 1.3, type: 'projeto' },
  { id: '13', name: 'Analista de Testes/Qualidade Sênior', fcp: 1.5, type: 'projeto' },
  { id: '14', name: 'Scrum Master/Agilista Pleno', fcp: 1.9, type: 'projeto' },
  { id: '15', name: 'Scrum Master/Agilista Sênior', fcp: 3.0, type: 'projeto' },
  { id: '16', name: 'Gerente de Projetos de TIC Pleno', fcp: 2.1, type: 'projeto' },
  { id: '17', name: 'Gerente de Projetos de TIC Sênior', fcp: 3.2, type: 'projeto' },
  { id: '18', name: 'Líder de Equipe Pleno', fcp: 2.1, type: 'gestao' },
  { id: '19', name: 'Líder de Equipe Sênior', fcp: 3.2, type: 'gestao' },
  { id: '20', name: 'Líder Técnico/Líder de Produto Pleno', fcp: 2.1, type: 'gestao' },
  { id: '21', name: 'Líder Técnico/Líder de Produto Sênior', fcp: 3.2, type: 'gestao' },
  { id: '22', name: 'Supervisor Técnico Pleno', fcp: 1.3, type: 'gestao' },
];

const defaultProjects: Project[] = [
  { id: '1', name: 'Projeto ALPHA', type: 'projeto', complexity: 'baixa', duration: 12 },
  { id: '2', name: 'Projeto BRAVO', type: 'projeto', complexity: 'media', duration: 12 },
  { id: '3', name: 'Projeto CHARLIE', type: 'projeto', complexity: 'media', duration: 12 },
  { id: '4', name: 'Projeto DELTA', type: 'projeto', complexity: 'alta', duration: 12 },
];

export const useCalculator = () => {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    personalInfo: {
      name: '',
      email: '',
      organ: 'GEINOVA'
    },
    generalParams: {
      ustValue: 70,
      contractDuration: 52,
      weeklyHours: 40
    },
    profiles: defaultProfiles,
    projects: defaultProjects,
    squads: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updatePersonalInfo = (info: Partial<CalculatorData['personalInfo']>) => {
    setCalculatorData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateGeneralParams = (params: Partial<CalculatorData['generalParams']>) => {
    setCalculatorData(prev => ({
      ...prev,
      generalParams: { ...prev.generalParams, ...params }
    }));
  };

  const addProfile = (profile: Omit<ProfessionalProfile, 'id'>) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString()
    };
    setCalculatorData(prev => ({
      ...prev,
      profiles: [...prev.profiles, newProfile]
    }));
  };

  const updateProfile = (id: string, profile: Partial<ProfessionalProfile>) => {
    setCalculatorData(prev => ({
      ...prev,
      profiles: prev.profiles.map(p => p.id === id ? { ...p, ...profile } : p)
    }));
  };

  const deleteProfile = (id: string) => {
    setCalculatorData(prev => ({
      ...prev,
      profiles: prev.profiles.filter(p => p.id !== id)
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setCalculatorData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setCalculatorData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setCalculatorData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addSquadComposition = (squad: Omit<SquadComposition, 'id'>) => {
    const newSquad = {
      ...squad,
      id: Date.now().toString()
    };
    setCalculatorData(prev => ({
      ...prev,
      squads: [...prev.squads, newSquad]
    }));
  };

  const updateSquadComposition = (id: string, squad: Partial<SquadComposition>) => {
    setCalculatorData(prev => ({
      ...prev,
      squads: prev.squads.map(s => s.id === id ? { ...s, ...squad } : s)
    }));
  };

  const deleteSquadComposition = (id: string) => {
    setCalculatorData(prev => ({
      ...prev,
      squads: prev.squads.filter(s => s.id !== id)
    }));
  };

  const calculateResults = (): CalculationResult[] => {
    const results: CalculationResult[] = [];
    const { ustValue, weeklyHours } = calculatorData.generalParams;

    // Agrupar projetos por tipo e complexidade
    const projectGroups = calculatorData.projects.reduce((acc, project) => {
      const key = project.type === 'projeto' 
        ? `${project.type}-${project.complexity}` 
        : project.type;
      
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(project);
      return acc;
    }, {} as Record<string, Project[]>);

    // Calcular para cada grupo
    Object.entries(projectGroups).forEach(([key, projects]) => {
      const totalDuration = projects.reduce((sum, p) => sum + p.duration, 0);
      const [type, complexity] = key.split('-') as [string, string?];
      
      // Encontrar squads para este tipo/complexidade
      const relevantSquads = calculatorData.squads.filter(squad => {
        if (type === 'projeto') {
          return squad.type === 'projeto' && squad.complexity === complexity;
        }
        return squad.type === type;
      });

      if (relevantSquads.length > 0) {
        let totalProfilesPerWeek = 0;
        let totalUstPerWeek = 0;

        relevantSquads.forEach(squad => {
          const profile = calculatorData.profiles.find(p => p.id === squad.profileId);
          if (profile) {
            const profilesContribution = squad.quantity;
            const ustContribution = profilesContribution * profile.fcp * weeklyHours;
            
            totalProfilesPerWeek += profilesContribution;
            totalUstPerWeek += ustContribution;
          }
        });

        const categoryName = complexity 
          ? `${type.charAt(0).toUpperCase() + type.slice(1)} - ${complexity.charAt(0).toUpperCase() + complexity.slice(1)} Complexidade`
          : type.charAt(0).toUpperCase() + type.slice(1);

        const valuePerWeek = totalUstPerWeek * ustValue;
        const totalUst = totalUstPerWeek * totalDuration;
        const totalValue = totalUst * ustValue;
        const squadsPerYear = totalDuration / 52;

        results.push({
          category: categoryName,
          profilesPerWeek: totalProfilesPerWeek,
          duration: totalDuration,
          squadsPerYear,
          ustPerWeek: totalUstPerWeek,
          valuePerWeek,
          totalUst,
          totalValue
        });
      }
    });

    return results;
  };

  return {
    calculatorData,
    currentStep,
    setCurrentStep,
    updatePersonalInfo,
    updateGeneralParams,
    addProfile,
    updateProfile,
    deleteProfile,
    addProject,
    updateProject,
    deleteProject,
    addSquadComposition,
    updateSquadComposition,
    deleteSquadComposition,
    calculateResults
  };
};
