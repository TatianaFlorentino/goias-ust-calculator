
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { ProfessionalProfile, SquadComposition, Project } from '@/types/calculator';

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
  const [newSquad, setNewSquad] = useState<Omit<SquadComposition, 'id'>>({
    profileId: '',
    quantity: 1,
    type: 'projeto',
    complexity: 'baixa'
  });

  // Filtrar apenas os perfis selecionados
  const availableProfiles = profiles.filter(profile => selectedProfileIds.includes(profile.id));

  const handleAddSquad = () => {
    if (newSquad.profileId) {
      onAddSquad(newSquad);
      setNewSquad({
        profileId: '',
        quantity: 1,
        type: 'projeto',
        complexity: 'baixa'
      });
      setIsAddingSquad(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'projeto': return 'bg-blue-100 text-blue-800';
      case 'sustentacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity?: string) => {
    switch (complexity) {
      case 'baixa': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfileName = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.name : 'Perfil não encontrado';
  };

  const getProfileFCP = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.fcp : 0;
  };

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
        {/* Resumo dos Recursos Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-emerald-700">Perfis Selecionados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-800 mb-2">{availableProfiles.length}</p>
              <div className="text-sm text-emerald-700 space-y-1 max-h-32 overflow-y-auto">
                {availableProfiles.map(profile => (
                  <div key={profile.id} className="flex justify-between">
                    <span className="truncate">{profile.name}</span>
                    <span className="font-medium">FCP: {profile.fcp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700">Projetos Cadastrados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-800 mb-2">{projects.length}</p>
              <div className="text-sm text-blue-700 space-y-1 max-h-32 overflow-y-auto">
                {projects.map(project => (
                  <div key={project.id} className="flex justify-between items-center">
                    <span className="truncate">{project.name}</span>
                    <div className="flex gap-1">
                      <Badge className={getTypeColor(project.type)} size="sm">
                        {project.type}
                      </Badge>
                      <Badge className={getComplexityColor(project.complexity)} size="sm">
                        {project.complexity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-700">Adicionar Composição de Squad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Perfil Profissional *</Label>
                  <Select 
                    value={newSquad.profileId} 
                    onValueChange={(value) => setNewSquad({ ...newSquad, profileId: value })}
                  >
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProfiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name} (FCP: {profile.fcp})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quantidade de Profissionais *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="1"
                    value={newSquad.quantity}
                    onChange={(e) => setNewSquad({ ...newSquad, quantity: parseFloat(e.target.value) || 0 })}
                    className="border-emerald-200 focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Atuação *</Label>
                  <Select 
                    value={newSquad.type} 
                    onValueChange={(value: any) => setNewSquad({ ...newSquad, type: value })}
                  >
                    <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projeto">Projeto</SelectItem>
                      <SelectItem value="sustentacao">Sustentação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newSquad.type === 'projeto' && (
                  <div className="space-y-2">
                    <Label>Complexidade *</Label>
                    <Select 
                      value={newSquad.complexity} 
                      onValueChange={(value: any) => setNewSquad({ ...newSquad, complexity: value })}
                    >
                      <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddSquad} className="bg-emerald-600 hover:bg-emerald-700">
                  Adicionar
                </Button>
                <Button variant="outline" onClick={() => setIsAddingSquad(false)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exibir squads agrupados com projetos correspondentes */}
        <div className="space-y-6">
          {Object.entries(groupedSquads).map(([groupKey, groupSquads]) => {
            const [type, complexity] = groupKey.split('-');
            const groupTitle = complexity 
              ? `${type.charAt(0).toUpperCase() + type.slice(1)} - Complexidade ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}`
              : type.charAt(0).toUpperCase() + type.slice(1);

            const totalUST = groupSquads.reduce((sum, squad) => {
              return sum + (squad.quantity * getProfileFCP(squad.profileId) * 40);
            }, 0);

            const relatedProjects = groupedProjects[groupKey] || [];
            const totalDuration = relatedProjects.reduce((sum, project) => sum + project.duration, 0);

            return (
              <Card key={groupKey} className="border-emerald-200">
                <CardHeader className="bg-emerald-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-emerald-800">{groupTitle}</CardTitle>
                    <div className="text-sm text-emerald-700 text-right">
                      <div>Total UST/Semana: <span className="font-bold">{totalUST.toFixed(0)}</span></div>
                      <div>Projetos: <span className="font-bold">{relatedProjects.length}</span></div>
                      <div>Duração Total: <span className="font-bold">{totalDuration} semanas</span></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Projetos Relacionados */}
                  {relatedProjects.length > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-2">Projetos Relacionados:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {relatedProjects.map(project => (
                          <div key={project.id} className="flex justify-between items-center text-sm">
                            <span className="text-blue-700">{project.name}</span>
                            <span className="text-blue-600">{project.duration} sem</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Composição do Squad */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-emerald-800">Composição do Squad:</h5>
                    {groupSquads.map((squad) => (
                      <div key={squad.id} className="flex items-center justify-between p-3 border border-emerald-100 rounded-lg bg-white">
                        <div className="flex-1">
                          <h6 className="font-medium text-emerald-800 mb-1">
                            {getProfileName(squad.profileId)}
                          </h6>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Quantidade:</span>
                              <p className="font-medium">{squad.quantity}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">FCP:</span>
                              <p className="font-medium">{getProfileFCP(squad.profileId)}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">UST/Semana:</span>
                              <p className="font-medium">{(squad.quantity * getProfileFCP(squad.profileId) * 40).toFixed(0)}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteSquad(squad.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
