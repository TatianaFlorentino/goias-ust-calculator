
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Project } from '@/types/calculator';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
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

  return (
    <Card className="border-emerald-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-medium text-emerald-800">{project.name}</h4>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(project.id)}
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
            {project.complexity && (
              <Badge className={getComplexityColor(project.complexity)}>
                {project.complexity.charAt(0).toUpperCase() + project.complexity.slice(1)}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">
            <strong>Duração:</strong> {project.duration} semanas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
