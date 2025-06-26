
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfessionalProfile } from '@/types/calculator';

interface ProfileSelectorProps {
  profiles: ProfessionalProfile[];
  selectedProfileIds: string[];
  onToggleProfile: (profileId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  selectedProfileIds,
  onToggleProfile,
  onSelectAll,
  onDeselectAll
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-emerald-700">
          Seleção de Perfis Profissionais ({selectedProfileIds.length} selecionados)
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSelectAll} size="sm">
            Selecionar Todos
          </Button>
          <Button variant="outline" onClick={onDeselectAll} size="sm">
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
              onCheckedChange={() => onToggleProfile(profile.id)}
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
  );
};

export default ProfileSelector;
