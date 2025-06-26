
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Edit, Check, Plus, UserPlus } from 'lucide-react';
import { SquadComposition, Project, ProfessionalProfile } from '@/types/calculator';
import AddProfileModal from './AddProfileModal';

interface SquadGroupCardProps {
  groupKey: string;
  squads: SquadComposition[];
  projects: Project[];
  profiles: ProfessionalProfile[];
  onDeleteSquad: (id: string) => void;
  onUpdateSquad: (id: string, squad: Partial<SquadComposition>) => void;
  onAddProfile: (profile: Omit<ProfessionalProfile, 'id'>) => void;
}

const SquadGroupCard: React.FC<SquadGroupCardProps> = ({
  groupKey,
  squads,
  projects,
  profiles,
  onDeleteSquad,
  onUpdateSquad,
  onAddProfile
}) => {
  const [editingQuantity, setEditingQuantity] = useState<string | null>(null);
  const [tempQuantity, setTempQuantity] = useState<number>(0);
  const [showAddProfile, setShowAddProfile] = useState(false);

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

  const handleStartEdit = (squadId: string, currentQuantity: number) => {
    setEditingQuantity(squadId);
    setTempQuantity(currentQuantity);
  };

  const handleSaveQuantity = (squadId: string) => {
    if (tempQuantity > 0) {
      onUpdateSquad(squadId, { quantity: tempQuantity });
    }
    setEditingQuantity(null);
  };

  const handleCancelEdit = () => {
    setEditingQuantity(null);
    setTempQuantity(0);
  };

  const handleAddNewProfile = (newProfile: Omit<ProfessionalProfile, 'id'>) => {
    onAddProfile(newProfile);
    setShowAddProfile(false);
  };

  return (
    <div className="space-y-4">
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

          {/* Botão para adicionar novo perfil */}
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddProfile(true)}
              variant="outline"
              size="sm"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Novo Perfil
            </Button>
          </div>

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
                      {editingQuantity === squad.id ? (
                        <div className="flex items-center gap-1 mt-1">
                          <Input
                            type="number"
                            step="0.25"
                            min="0.25"
                            value={tempQuantity}
                            onChange={(e) => setTempQuantity(parseFloat(e.target.value) || 0)}
                            className="w-20 h-8 text-xs"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSaveQuantity(squad.id)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-800"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{squad.quantity}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(squad.id, squad.quantity)}
                            className="h-6 w-6 p-0 text-emerald-600 hover:text-emerald-800"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
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

      {/* Modal para adicionar novo perfil */}
      {showAddProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-md w-full mx-4">
            <AddProfileModal
              onAddProfile={handleAddNewProfile}
              onCancel={() => setShowAddProfile(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SquadGroupCard;
