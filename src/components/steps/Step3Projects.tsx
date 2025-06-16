
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, X } from 'lucide-react';
import { Project } from '@/types/calculator';

interface Step3ProjectsProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, project: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
}

const Step3Projects: React.FC<Step3ProjectsProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject
}) => {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
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
      case 'gestao': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center bg-gradient-to-r from-goias-green to-goias-dark-green text-white rounded-t-lg">
        <CardTitle className="text-2xl">Etapa 03 - Cadastro de Projetos</CardTitle>
        <CardDescription className="text-gray-100">
          Defina os objetos a serem calculados (Projetos, Sustentação ou Gestão)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-goias-green">
            Projetos Cadastrados ({projects.length})
          </h3>
          <Button
            onClick={() => setIsAddingProject(true)}
            className="bg-goias-green hover:bg-goias-dark-green"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {isAddingProject && (
          <Card className="border-goias-green/20">
            <CardHeader>
              <CardTitle className="text-lg text-goias-green">Adicionar Novo Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Projeto *</Label>
                  <Input
                    placeholder="Ex: Projeto ALPHA"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="border-goias-green/20 focus:border-goias-green"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo *</Label>
                  <Select 
                    value={newProject.type} 
                    onValueChange={(value: any) => setNewProject({ ...newProject, type: value })}
                  >
                    <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projeto">Projeto</SelectItem>
                      <SelectItem value="sustentacao">Sustentação</SelectItem>
                      <SelectItem value="gestao">Gestão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Complexidade *</Label>
                  <Select 
                    value={newProject.complexity} 
                    onValueChange={(value: any) => setNewProject({ ...newProject, complexity: value })}
                  >
                    <SelectTrigger className="border-goias-green/20 focus:border-goias-green">
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
                    className="border-goias-green/20 focus:border-goias-green"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddProject} className="bg-goias-green hover:bg-goias-dark-green">
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
            <Card key={project.id} className="border-goias-green/20 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-goias-dark-green">{project.name}</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingProject(project.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
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

        <div className="bg-goias-light-green/20 p-4 rounded-lg border border-goias-green/20">
          <p className="text-sm text-goias-dark-green">
            <strong>Observação:</strong> Para sustentação contínua, a duração deve coincidir 
            com o contrato total (ex: 52 semanas para contrato anual).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3Projects;
