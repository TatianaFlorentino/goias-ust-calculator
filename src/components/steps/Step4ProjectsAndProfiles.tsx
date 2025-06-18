
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, X } from 'lucide-react';
import { Project, ProfessionalProfile, DefaultSquad } from '@/types/calculator';

interface Step4ProjectsAndProfilesProps {
  projects: Project[];
  profiles: ProfessionalProfile[];
  selectedProfileIds: string[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, project: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onToggleProfileSelection: (profileId: string) => void;
  onSelectAllProfiles: () => void;
  onDeselectAllProfiles: () => void;
}

const defaultSquads: DefaultSquad[] = [
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

const Step4ProjectsAndProfiles: React.FC<Step4ProjectsAndProfilesProps> = ({
  projects,
  profiles,
  selectedProfileIds,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onToggleProfileSelection,
  onSelectAllProfiles,
  onDeselectAllProfiles
}) => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    type: 'projeto',
    complexity: 'baixa',
    duration: 12
  });

  const handleAddProject = () => {
    if (newProject.name.trim()) {
      onAddProject(newProject);
      setNewProject({
        name: '',
        type: 'projeto',
        complexity: 'baixa',
        duration: 12
      });
      setIsAddingProject(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'baixa': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'projeto': return 'bg-blue-100 text-blue-800';
      case 'sustentacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateSquadTotals = (squad: DefaultSquad) => {
    const totalQuantity = squad.profiles.reduce((sum, profile) => sum + profile.quantity, 0);
    const totalUstPerWeek = squad.profiles.reduce((sum, profile) => sum + (profile.quantity * profile.fcp * 40), 0);
    const totalValuePerWeek = totalUstPerWeek * 70; // UST padrão de R$ 70
    const totalUst = totalUstPerWeek * squad.duration;
    const totalValue = totalUst * 70;

    return {
      totalQuantity,
      totalUstPerWeek,
      totalValuePerWeek,
      totalUst,
      totalValue
    };
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
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-700">Adicionar Novo Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Projeto *</Label>
                    <Input
                      placeholder="Ex: Sistema de Gestão"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo *</Label>
                    <Select 
                      value={newProject.type} 
                      onValueChange={(value: any) => setNewProject({ ...newProject, type: value })}
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

                  <div className="space-y-2">
                    <Label>Complexidade *</Label>
                    <Select 
                      value={newProject.complexity} 
                      onValueChange={(value: any) => setNewProject({ ...newProject, complexity: value })}
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

                  <div className="space-y-2">
                    <Label>Duração (semanas) *</Label>
                    <Input
                      type="number"
                      placeholder="12"
                      value={newProject.duration}
                      onChange={(e) => setNewProject({ ...newProject, duration: parseInt(e.target.value) || 0 })}
                      className="border-emerald-200 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddProject} className="bg-emerald-600 hover:bg-emerald-700">
                    Adicionar
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingProject(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="border-emerald-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-emerald-800">{project.name}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(project.type)}>
                        {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                      </Badge>
                      <Badge className={getComplexityColor(project.complexity)}>
                        {project.complexity.charAt(0).toUpperCase() + project.complexity.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Duração:</strong> {project.duration} semanas
                    </p>
                  </div>
                </CardContent>
              </Card>
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
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-emerald-700">
              Seleção de Perfis Profissionais ({selectedProfileIds.length} selecionados)
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onSelectAllProfiles} size="sm">
                Selecionar Todos
              </Button>
              <Button variant="outline" onClick={onDeselectAllProfiles} size="sm">
                Desmarcar Todos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center space-x-3 p-3 border border-emerald-200 rounded-lg hover:bg-emerald-50"
              >
                <Checkbox
                  id={`profile-${profile.id}`}
                  checked={selectedProfileIds.includes(profile.id)}
                  onCheckedChange={() => onToggleProfileSelection(profile.id)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={`profile-${profile.id}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {profile.name}
                  </label>
                  <p className="text-xs text-gray-600">FCP: {profile.fcp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Squads Padrão */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-emerald-700">
            Squads Padrão para Projetos
          </h3>
          
          {defaultSquads.map((squad, index) => {
            const totals = calculateSquadTotals(squad);
            return (
              <Card key={index} className="border-emerald-200">
                <CardHeader className="bg-emerald-50">
                  <CardTitle className="text-lg text-emerald-800">
                    SQUAD PADRÃO - {squad.type.toUpperCase()} - {squad.complexity.toUpperCase()} COMPLEXIDADE
                  </CardTitle>
                  <p className="text-sm text-emerald-700">
                    QTDE SEMANAS: {squad.duration}
                  </p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-emerald-200">
                          <th className="text-left p-2">Perfil Profissional</th>
                          <th className="text-center p-2">FCP</th>
                          <th className="text-center p-2">Quantidade</th>
                          <th className="text-center p-2">UST/Semana</th>
                          <th className="text-center p-2">R$/Semana</th>
                          <th className="text-center p-2">Total (UST)</th>
                          <th className="text-center p-2">Total (R$)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {squad.profiles.map((profile, profileIndex) => {
                          const ustPerWeek = profile.quantity * profile.fcp * 40;
                          const valuePerWeek = ustPerWeek * 70;
                          const totalUst = ustPerWeek * squad.duration;
                          const totalValue = totalUst * 70;
                          
                          return (
                            <tr key={profileIndex} className="border-b border-gray-100">
                              <td className="p-2">{profile.profileName}</td>
                              <td className="text-center p-2">{profile.fcp}</td>
                              <td className="text-center p-2">{profile.quantity.toFixed(2)}</td>
                              <td className="text-center p-2">{Math.round(ustPerWeek)}</td>
                              <td className="text-center p-2">R$ {valuePerWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                              <td className="text-center p-2">{Math.round(totalUst).toLocaleString('pt-BR')}</td>
                              <td className="text-center p-2">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          );
                        })}
                        <tr className="bg-emerald-50 font-bold">
                          <td className="p-2">TOTAIS (SQUADS - {squad.type.toUpperCase()} - {squad.complexity.toUpperCase()} COMPLEXIDADE):</td>
                          <td className="text-center p-2">-</td>
                          <td className="text-center p-2">{totals.totalQuantity.toFixed(2)}</td>
                          <td className="text-center p-2">{Math.round(totals.totalUstPerWeek)}</td>
                          <td className="text-center p-2">R$ {totals.totalValuePerWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="text-center p-2">{Math.round(totals.totalUst).toLocaleString('pt-BR')}</td>
                          <td className="text-center p-2">R$ {totals.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    (*) O quantitativo de semanas do squad considera a lista de projetos, complexidade e duração informados.
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">
            <strong>Observação:</strong> Os squads padrão mostram a composição recomendada para cada tipo e complexidade de projeto. 
            Use a seleção de perfis acima para customizar quais perfis estarão disponíveis no cálculo final.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step4ProjectsAndProfiles;
