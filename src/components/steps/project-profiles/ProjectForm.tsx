
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/types/calculator';

interface ProjectFormProps {
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject, onCancel }) => {
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
      onCancel();
    }
  };

  return (
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
