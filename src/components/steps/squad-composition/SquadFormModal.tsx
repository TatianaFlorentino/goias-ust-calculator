
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [newSquad, setNewSquad] = useState<Omit<SquadComposition, 'id'>>({
    profileId: '',
    quantity: 1,
    type: 'projeto',
    complexity: 'baixa'
  });

  const selectedProject = availableProjects.find(p => p.id === selectedProjectId);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    const project = availableProjects.find(p => p.id === projectId);
    if (project) {
      setNewSquad({
        ...newSquad,
        type: project.type,
        complexity: project.complexity
      });
    }
  };

  const handleAddSquad = () => {
    if (newSquad.profileId && selectedProjectId) {
      onAddSquad(newSquad);
      setNewSquad({
        profileId: '',
        quantity: 1,
        type: 'projeto',
        complexity: 'baixa'
      });
      setSelectedProjectId('');
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

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Criar Composição de Squad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Seleção de Projeto */}
          <div className="space-y-2">
            <Label>Selecionar Projeto *</Label>
            <Select 
              value={selectedProjectId} 
              onValueChange={handleProjectSelect}
            >
              <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                <SelectValue placeholder="Escolha o projeto para este squad" />
              </SelectTrigger>
              <SelectContent>
                {availableProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} - {getTypeLabel(project.type)} ({getComplexityLabel(project.complexity)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Informações do Projeto Selecionado */}
          {selectedProject && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Projeto Selecionado:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div><strong>Nome:</strong> {selectedProject.name}</div>
                <div><strong>Tipo:</strong> {getTypeLabel(selectedProject.type)}</div>
                <div><strong>Complexidade:</strong> {getComplexityLabel(selectedProject.complexity)}</div>
                <div><strong>Duração:</strong> {selectedProject.duration} semanas</div>
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
            disabled={!selectedProjectId || !newSquad.profileId}
          >
            Adicionar ao Squad
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
