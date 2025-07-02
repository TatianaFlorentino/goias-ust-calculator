
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, ProfessionalProfile, SquadComposition } from '@/types/calculator';

interface ProjectFormProps {
  selectedProfileIds: string[];
  profiles: ProfessionalProfile[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onAddSquadComposition: (squad: Omit<SquadComposition, 'id'>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ selectedProfileIds, profiles, onAddProject, onAddSquadComposition, onCancel }) => {
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    type: 'projeto',
    complexity: 'baixa',
    duration: 12
  });

  const handleAddProject = () => {
    if (newProject.name.trim()) {
      onAddProject(newProject);
      
      // Adicionar automaticamente os perfis selecionados como squad compositions
      selectedProfileIds.forEach(profileId => {
        onAddSquadComposition({
          profileId,
          quantity: 1, // Quantidade padrão de 1
          type: newProject.type,
          complexity: newProject.complexity || 'media'
        });
      });
      
      setNewProject({
        name: '',
        type: 'projeto',
        complexity: 'baixa',
        duration: 12
      });
      onCancel();
    }
  };

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Adicionar Nova Iniciativa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome da Iniciativa *</Label>
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

          {newProject.type === 'projeto' && (
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
          )}

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

        {/* Mostrar perfis que serão incluídos */}
        {selectedProfileIds.length > 0 && (
          <div className="bg-emerald-50/20 p-4 rounded-lg border border-emerald-500/20">
            <h4 className="font-medium text-emerald-700 mb-2">
              Perfis que serão incluídos automaticamente ({selectedProfileIds.length}):
            </h4>
            <div className="text-sm text-emerald-600 space-y-1">
              {selectedProfileIds.map(profileId => {
                const profile = profiles.find(p => p.id === profileId);
                return profile ? (
                  <div key={profileId} className="flex justify-between">
                    <span>• {profile.name}</span>
                    <span className="text-emerald-700">Quantidade: 1</span>
                  </div>
                ) : null;
              })}
            </div>
            <p className="text-xs text-emerald-600 mt-2">
              * As quantidades podem ser ajustadas posteriormente na etapa 4
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleAddProject} className="bg-emerald-600 hover:bg-emerald-700">
            Adicionar
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
