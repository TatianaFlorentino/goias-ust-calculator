
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfessionalProfile, Project } from '@/types/calculator';

interface ProfileSummaryCardsProps {
  availableProfiles: ProfessionalProfile[];
  projects: Project[];
}

const ProfileSummaryCards: React.FC<ProfileSummaryCardsProps> = ({
  availableProfiles,
  projects
}) => {
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

  return (
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
                  <Badge className={getTypeColor(project.type)}>
                    {project.type}
                  </Badge>
                  <Badge className={getComplexityColor(project.complexity)}>
                    {project.complexity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSummaryCards;
