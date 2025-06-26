
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Project, ProfessionalProfile, DefaultSquad, SquadComposition } from '@/types/calculator';
import ProjectForm from './project-profiles/ProjectForm';
import ProjectCard from './project-profiles/ProjectCard';
import ProfileSelector from './project-profiles/ProfileSelector';
import DefaultSquadCard from './project-profiles/DefaultSquadCard';
import { defaultSquads } from './project-profiles/defaultSquads';

interface Step4ProjectsAndProfilesProps {
  projects: Project[];
  profiles: ProfessionalProfile[];
  selectedProfileIds: string[];
  squads: SquadComposition[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, project: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onToggleProfileSelection: (profileId: string) => void;
  onSelectAllProfiles: () => void;
  onDeselectAllProfiles: () => void;
  onAddSquadComposition: (squad: Omit<SquadComposition, 'id'>) => void;
}

const Step4ProjectsAndProfiles: React.FC<Step4ProjectsAndProfilesProps> = ({
  projects,
  profiles,
  selectedProfileIds,
  squads,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onToggleProfileSelection,
  onSelectAllProfiles,
  onDeselectAllProfiles,
  onAddSquadComposition
}) => {
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleApplyDefaultSquad = (squad: DefaultSquad) => {
    // Auto-select profiles that match the default squad
    squad.profiles.forEach(defaultProfile => {
      const matchingProfile = profiles.find(p => p.name === defaultProfile.profileName);
      if (matchingProfile && !selectedProfileIds.includes(matchingProfile.id)) {
        onToggleProfileSelection(matchingProfile.id);
      }
    });

    // Add squad compositions for each profile in the default squad
    squad.profiles.forEach(defaultProfile => {
      const matchingProfile = profiles.find(p => p.name === defaultProfile.profileName);
      if (matchingProfile) {
        // Check if this squad composition already exists
        const existingSquad = squads.find(s => 
          s.profileId === matchingProfile.id && 
          s.type === squad.type && 
          s.complexity === squad.complexity
        );

        if (!existingSquad) {
          onAddSquadComposition({
            profileId: matchingProfile.id,
            quantity: defaultProfile.quantity,
            type: squad.type,
            complexity: squad.complexity
          });
        }
      }
    });
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 04 - Cadastro de Projetos e Seleção de Perfis</CardTitle>
        <CardDescription className="text-gray-100">
          Defina os projetos e selecione os perfis profissionais para composição dos squads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Seção de Cadastro de Projetos */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-emerald-700">
              Projetos Cadastrados ({projects.length})
            </h3>
            <Button
              onClick={() => setIsAddingProject(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>

          {isAddingProject && (
            <ProjectForm
              onAddProject={onAddProject}
              onCancel={() => setIsAddingProject(false)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={onDeleteProject}
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum projeto cadastrado ainda.</p>
              <p className="text-sm">Clique em "Novo Projeto" para começar.</p>
            </div>
          )}
        </div>

        {/* Seção de Seleção de Perfis */}
        <ProfileSelector
          profiles={profiles}
          selectedProfileIds={selectedProfileIds}
          onToggleProfile={onToggleProfileSelection}
          onSelectAll={onSelectAllProfiles}
          onDeselectAll={onDeselectAllProfiles}
        />

        {/* Seção de Squads Padrão */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-emerald-700">
              Squads Padrão para Projetos
            </h3>
            <div className="text-sm text-emerald-600">
              Clique em "Aplicar Squad" para selecionar automaticamente os perfis e criar as composições
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {defaultSquads.map((squad, index) => (
              <DefaultSquadCard
                key={index}
                squad={squad}
                onApplySquad={handleApplyDefaultSquad}
              />
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Observação:</strong> Os squads padrão mostram a composição recomendada para cada complexidade de projeto. 
            Use o botão "Aplicar Squad" para selecionar automaticamente os perfis necessários e criar as composições de squad correspondentes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4ProjectsAndProfiles;
