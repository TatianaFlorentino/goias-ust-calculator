
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProfessionalProfile, SquadComposition, Project } from '@/types/calculator';
import SquadFormModal from './squad-composition/SquadFormModal';
import SquadGroupCard from './squad-composition/SquadGroupCard';

interface Step4SquadCompositionProps {
  profiles: ProfessionalProfile[];
  selectedProfileIds: string[];
  projects: Project[];
  squads: SquadComposition[];
  onAddSquad: (squad: Omit<SquadComposition, 'id'>) => void;
  onUpdateSquad: (id: string, squad: Partial<SquadComposition>) => void;
  onDeleteSquad: (id: string) => void;
}

const Step4SquadComposition: React.FC<Step4SquadCompositionProps> = ({
  profiles,
  selectedProfileIds,
  projects,
  squads,
  onAddSquad,
  onUpdateSquad,
  onDeleteSquad
}) => {
  const [isAddingSquad, setIsAddingSquad] = useState(false);

  // Filtrar apenas os perfis selecionados
  const availableProfiles = profiles.filter(profile => selectedProfileIds.includes(profile.id));

  // Agrupar squads por tipo e complexidade
  const groupedSquads = squads.reduce((groups, squad) => {
    const key = squad.type === 'projeto' ? `${squad.type}-${squad.complexity}` : squad.type;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(squad);
    return groups;
  }, {} as Record<string, SquadComposition[]>);

  // Agrupar projetos por tipo e complexidade
  const groupedProjects = projects.reduce((groups, project) => {
    const key = project.type === 'projeto' ? `${project.type}-${project.complexity}` : project.type;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(project);
    return groups;
  }, {} as Record<string, Project[]>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'projeto': return 'Projeto';
      case 'sustentacao': return 'Sustentação';
      case 'gestao': return 'Gestão';
      default: return type;
    }
  };

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'baixa': return 'Baixa';
      case 'media': return 'Média';
      case 'alta': return 'Alta';
      default: return complexity;
    }
  };

  if (availableProfiles.length === 0) {
    return (
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Etapa 05 - Formato dos Squads</CardTitle>
          <CardDescription className="text-gray-100">
            Defina a composição das equipes por tipo de atuação e complexidade
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <h3 className="text-lg font-medium text-amber-800 mb-2">
                Nenhum perfil selecionado
              </h3>
              <p className="text-amber-700">
                Volte para a etapa anterior (Parâmetros Gerais) e selecione os perfis 
                que devem estar disponíveis para composição de squads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 05 - Formato dos Squads</CardTitle>
        <CardDescription className="text-gray-100">
          Defina a composição das equipes por tipo de atuação e complexidade
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Lista de Projetos Cadastrados */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-3">
            Projetos Cadastrados ({projects.length})
          </h3>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-3 rounded-md border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-2">{project.name}</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Tipo:</strong> {getTypeLabel(project.type)}</div>
                    <div><strong>Complexidade:</strong> {getComplexityLabel(project.complexity)}</div>
                    <div><strong>Duração:</strong> {project.duration} semanas</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-700">Nenhum projeto cadastrado ainda.</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-emerald-700">
            Composições de Squad ({squads.length})
          </h3>
          <Button
            onClick={() => setIsAddingSquad(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Composição
          </Button>
        </div>

        {isAddingSquad && (
          <SquadFormModal
            availableProfiles={availableProfiles}
            onAddSquad={onAddSquad}
            onCancel={() => setIsAddingSquad(false)}
          />
        )}

        <div className="space-y-6">
          {Object.entries(groupedSquads).map(([groupKey, groupSquads]) => (
            <SquadGroupCard
              key={groupKey}
              groupKey={groupKey}
              squads={groupSquads}
              projects={groupedProjects[groupKey] || []}
              profiles={profiles}
              onDeleteSquad={onDeleteSquad}
            />
          ))}
        </div>

        {squads.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma composição de squad cadastrada ainda.</p>
            <p className="text-sm">Clique em "Nova Composição" para começar.</p>
          </div>
        )}

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Dica:</strong> As composições de squad são automaticamente associadas aos projetos 
            cadastrados do mesmo tipo e complexidade para o cálculo final.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4SquadComposition;
