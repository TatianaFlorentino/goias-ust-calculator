import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Users } from 'lucide-react';
import { ProfessionalProfile, SquadComposition, Project } from '@/types/calculator';
import SquadFormModal from './squad-composition/SquadFormModal';
import SquadGroupCard from './squad-composition/SquadGroupCard';
import ProfileSummaryCards from './squad-composition/ProfileSummaryCards';
import { defaultSquads } from './project-profiles/defaultSquads';

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
  const [showDefaultSquadPreview, setShowDefaultSquadPreview] = useState(false);

  // Filtrar apenas os perfis selecionados
  const availableProfiles = profiles.filter(profile => selectedProfileIds.includes(profile.id));

  // Verificar se existem squads padrão que podem ser aplicados
  const canApplyDefaultSquads = defaultSquads.some(squad => 
    squad.profiles.some(defaultProfile => 
      profiles.some(p => p.name === defaultProfile.profileName)
    )
  );

  // Mostrar preview dos squads padrão automaticamente se não houver squads criados
  useEffect(() => {
    if (squads.length === 0 && canApplyDefaultSquads && projects.length > 0) {
      setShowDefaultSquadPreview(true);
    } else {
      setShowDefaultSquadPreview(false);
    }
  }, [squads.length, canApplyDefaultSquads, projects.length]);

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

  const applyAllDefaultSquads = () => {
    defaultSquads.forEach(squad => {
      squad.profiles.forEach(defaultProfile => {
        const matchingProfile = profiles.find(p => p.name === defaultProfile.profileName);
        if (matchingProfile) {
          // Verificar se esta composição de squad já existe
          const existingSquad = squads.find(s => 
            s.profileId === matchingProfile.id && 
            s.type === squad.type && 
            s.complexity === squad.complexity
          );

          if (!existingSquad) {
            onAddSquad({
              profileId: matchingProfile.id,
              quantity: defaultProfile.quantity,
              type: squad.type,
              complexity: squad.complexity
            });
          }
        }
      });
    });
    setShowDefaultSquadPreview(false);
  };

  const renderDefaultSquadPreview = () => {
    if (!showDefaultSquadPreview) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-blue-800">
              Preview dos Squads Padrão Disponíveis
            </h3>
          </div>
          <p className="text-blue-700 mb-4">
            Estas são as composições recomendadas que serão criadas automaticamente:
          </p>
        </div>

        {defaultSquads.map((squad, index) => {
          const availableProfilesForSquad = squad.profiles.filter(defaultProfile =>
            profiles.some(p => p.name === defaultProfile.profileName)
          );

          if (availableProfilesForSquad.length === 0) return null;

          const squadTitle = `Projeto - Complexidade ${squad.complexity.charAt(0).toUpperCase() + squad.complexity.slice(1)}`;
          const totalUST = availableProfilesForSquad.reduce((sum, prof) => {
            const profile = profiles.find(p => p.name === prof.profileName);
            return sum + (profile ? prof.quantity * profile.fcp * 40 : 0);
          }, 0);

          return (
            <Card key={index} className="border-blue-200 bg-blue-50/30">
              <CardHeader className="bg-blue-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-blue-800">{squadTitle}</CardTitle>
                  <div className="text-sm text-blue-700 text-right">
                    <div>Total UST/Semana: <span className="font-bold">{totalUST.toFixed(0)}</span></div>
                    <div>Duração Recomendada: <span className="font-bold">{squad.duration} semanas</span></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h5 className="font-medium text-blue-800 mb-3">Composição do Squad:</h5>
                <div className="space-y-3">
                  {availableProfilesForSquad.map((defaultProfile, profIndex) => {
                    const profile = profiles.find(p => p.name === defaultProfile.profileName);
                    if (!profile) return null;

                    return (
                      <div key={profIndex} className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-white">
                        <div className="flex-1">
                          <h6 className="font-medium text-blue-800 mb-1">
                            {profile.name}
                          </h6>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Quantidade:</span>
                              <p className="font-medium">{defaultProfile.quantity}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">FCP:</span>
                              <p className="font-medium">{profile.fcp}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">UST/Semana:</span>
                              <p className="font-medium">{(defaultProfile.quantity * profile.fcp * 40).toFixed(0)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}

        <div className="text-center">
          <Button
            onClick={applyAllDefaultSquads}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Zap className="w-5 h-5 mr-2" />
            Aplicar Todos os Squads Padrão
          </Button>
        </div>
      </div>
    );
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
                Volte para a etapa anterior (Cadastro de Projetos e Seleção de Perfis) e selecione os perfis 
                que devem estar disponíveis para composição de squads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projects.length === 0) {
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
                Nenhum projeto cadastrado
              </h3>
              <p className="text-amber-700">
                Volte para a etapa anterior (Cadastro de Projetos e Seleção de Perfis) e cadastre pelo menos 
                um projeto para poder definir a composição dos squads.
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
          {showDefaultSquadPreview 
            ? "Visualize e aplique as composições de squad recomendadas"
            : "Gerencie as composições de squad criadas automaticamente ou adicione novas"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <ProfileSummaryCards 
          availableProfiles={availableProfiles}
          projects={projects}
        />

        {/* Preview dos Squads Padrão */}
        {renderDefaultSquadPreview()}

        {/* Conteúdo existente quando há squads criados */}
        {!showDefaultSquadPreview && (
          <>
            {/* Lista de Projetos Cadastrados */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-800 mb-3">
                Projetos Disponíveis ({projects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
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
              <div className="flex gap-2">
                <Button
                  onClick={applyAllDefaultSquads}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Aplicar Squads Padrão (Baixa, Média, Alta)
                </Button>
                <Button
                  onClick={() => setIsAddingSquad(true)}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Squad Personalizado
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-emerald-700">
                Composições de Squad ({squads.length})
              </h3>
            </div>

            {isAddingSquad && (
              <SquadFormModal
                availableProfiles={availableProfiles}
                availableProjects={projects}
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
              <div className="text-center py-8">
                <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                  <h3 className="text-lg font-medium text-emerald-800 mb-2">
                    Nenhuma composição de squad criada ainda
                  </h3>
                  <p className="text-emerald-700 mb-4">
                    Use o botão "Aplicar Squads Padrão" para criar automaticamente as composições 
                    para projetos de baixa, média e alta complexidade.
                  </p>
                  <Button
                    onClick={applyAllDefaultSquads}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Aplicar Squads Padrão Agora
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Dica:</strong> {showDefaultSquadPreview 
              ? "Visualize as composições recomendadas acima e clique em 'Aplicar Todos os Squads Padrão' para criar automaticamente todas as composições."
              : "Use 'Aplicar Squads Padrão' para criar automaticamente as composições recomendadas para projetos de baixa, média e alta complexidade. Você pode editar ou adicionar novas composições conforme necessário."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4SquadComposition;
