
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SquadComposition, Project, ProfessionalProfile } from '@/types/calculator';

interface SquadGroupCardProps {
  groupKey: string;
  squads: SquadComposition[];
  projects: Project[];
  profiles: ProfessionalProfile[];
  onDeleteSquad: (id: string) => void;
}

const SquadGroupCard: React.FC<SquadGroupCardProps> = ({
  groupKey,
  squads,
  projects,
  profiles,
  onDeleteSquad
}) => {
  const [type, complexity] = groupKey.split('-');
  const groupTitle = complexity 
    ? `${type.charAt(0).toUpperCase() + type.slice(1)} - Complexidade ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}`
    : type.charAt(0).toUpperCase() + type.slice(1);

  const getProfileName = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.name : 'Perfil não encontrado';
  };

  const getProfileFCP = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile ? profile.fcp : 0;
  };

  const totalUST = squads.reduce((sum, squad) => {
    return sum + (squad.quantity * getProfileFCP(squad.profileId) * 40);
  }, 0);

  const totalDuration = projects.reduce((sum, project) => sum + project.duration, 0);

  return (
    <Card className="border-emerald-200">
      <CardHeader className="bg-emerald-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-emerald-800">{groupTitle}</CardTitle>
          <div className="text-sm text-emerald-700 text-right">
            <div>Total UST/Semana: <span className="font-bold">{totalUST.toFixed(0)}</span></div>
            <div>Projetos: <span className="font-bold">{projects.length}</span></div>
            <div>Duração Total: <span className="font-bold">{totalDuration} semanas</span></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Projetos Relacionados */}
        {projects.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h5 className="font-medium text-blue-800 mb-2">Projetos Relacionados:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.map(project => (
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
          {squads.map((squad) => (
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
};

export default SquadGroupCard;
