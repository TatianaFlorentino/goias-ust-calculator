
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfessionalProfile, SquadComposition, Project } from '@/types/calculator';

interface SquadFormModalProps {
  availableProfiles: ProfessionalProfile[];
  availableProjects: Project[];
  onAddSquad: (squad: Omit<SquadComposition, 'id'>) => void;
  onCancel: () => void;
}

const SquadFormModal: React.FC<SquadFormModalProps> = ({
  availableProfiles,
  availableProjects,
  onAddSquad,
  onCancel
}) => {
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [newSquad, setNewSquad] = useState<Omit<SquadComposition, 'id'>>({
    profileId: '',
    quantity: 1,
    type: 'projeto',
    complexity: 'baixa'
  });

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    if (checked) {
      setSelectedProjectIds(prev => [...prev, projectId]);
    } else {
      setSelectedProjectIds(prev => prev.filter(id => id !== projectId));
    }
  };

  const handleSelectAllProjects = () => {
    setSelectedProjectIds(availableProjects.map(p => p.id));
  };

  const handleDeselectAllProjects = () => {
    setSelectedProjectIds([]);
  };

  const handleAddSquad = () => {
    if (newSquad.profileId && selectedProjectIds.length > 0) {
      // Criar um squad para cada projeto selecionado
      selectedProjectIds.forEach(projectId => {
        const project = availableProjects.find(p => p.id === projectId);
        if (project) {
          onAddSquad({
            ...newSquad,
            type: project.type,
            complexity: project.complexity
          });
        }
      });
      
      setNewSquad({
        profileId: '',
        quantity: 1,
        type: 'projeto',
        complexity: 'baixa'
      });
      setSelectedProjectIds([]);
      onCancel();
    }
  };

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

  const selectedProjects = availableProjects.filter(p => selectedProjectIds.includes(p.id));

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Criar Composição de Squad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Seleção de Projetos com Checkbox */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Selecionar Projetos *</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllProjects}
                  className="text-xs"
                >
                  Selecionar Todos
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDeselectAllProjects}
                  className="text-xs"
                >
                  Desmarcar Todos
                </Button>
              </div>
            </div>
            
            <div className="border border-emerald-200 rounded-lg p-3 max-h-48 overflow-y-auto">
              {availableProjects.length > 0 ? (
                <div className="space-y-2">
                  {availableProjects.map((project) => (
                    <div key={project.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`project-${project.id}`}
                        checked={selectedProjectIds.includes(project.id)}
                        onCheckedChange={(checked) => handleProjectToggle(project.id, checked as boolean)}
                      />
                      <label
                        htmlFor={`project-${project.id}`}
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        {project.name} - {getTypeLabel(project.type)} ({getComplexityLabel(project.complexity)}) - {project.duration} semanas
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhum projeto disponível</p>
              )}
            </div>
          </div>

          {/* Combobox com Projetos Selecionados */}
          {selectedProjects.length > 0 && (
            <div className="space-y-2">
              <Label>Projetos Selecionados ({selectedProjects.length})</Label>
              <Select>
                <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                  <SelectValue placeholder="Visualizar projetos selecionados" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} - {getTypeLabel(project.type)} ({getComplexityLabel(project.complexity)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Resumo dos Projetos Selecionados */}
          {selectedProjects.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Resumo dos Projetos Selecionados:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {selectedProjects.map((project) => (
                  <div key={project.id} className="flex justify-between">
                    <span><strong>{project.name}</strong></span>
                    <span>{getTypeLabel(project.type)} - {getComplexityLabel(project.complexity)} - {project.duration}sem</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleAddSquad} 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={selectedProjectIds.length === 0 || !newSquad.profileId}
          >
            Adicionar Squad para {selectedProjectIds.length} Projeto(s)
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SquadFormModal;
