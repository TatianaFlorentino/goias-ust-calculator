
export interface ProfessionalProfile {
  id: string;
  name: string;
  fcp: number;
}

export interface Project {
  id: string;
  name: string;
  type: 'projeto' | 'sustentacao';
  complexity: 'baixa' | 'media' | 'alta';
  duration: number; // em semanas
}

export interface SquadComposition {
  id: string;
  profileId: string;
  quantity: number;
  type: 'projeto' | 'sustentacao';
  complexity?: 'baixa' | 'media' | 'alta';
}

export interface DefaultSquadProfile {
  profileName: string;
  fcp: number;
  quantity: number;
}

export interface DefaultSquad {
  type: 'projeto' | 'sustentacao';
  complexity: 'baixa' | 'media' | 'alta';
  duration: number;
  profiles: DefaultSquadProfile[];
}

export interface CalculatorData {
  personalInfo: {
    name: string;
    email: string;
    organ: string;
  };
  generalParams: {
    ustValue: number;
    contractDuration: number;
    weeklyHours: number;
  };
  profiles: ProfessionalProfile[];
  projects: Project[];
  squads: SquadComposition[];
  selectedProfileIds: string[];
}

export interface CalculationResult {
  category: string;
  profilesPerWeek: number;
  duration: number;
  squadsPerYear: number;
  ustPerWeek: number;
  valuePerWeek: number;
  totalUst: number;
  totalValue: number;
}
