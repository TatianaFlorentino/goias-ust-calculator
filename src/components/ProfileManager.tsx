
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash } from 'lucide-react';
import { ProfessionalProfile } from '@/types/calculator';

interface ProfileManagerProps {
  profiles: ProfessionalProfile[];
  onAddProfile: (profile: Omit<ProfessionalProfile, 'id'>) => void;
  onUpdateProfile: (id: string, profile: Partial<ProfessionalProfile>) => void;
  onDeleteProfile: (id: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  profiles,
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<ProfessionalProfile, 'id'>>({
    name: '',
    fcp: 1.0,
    type: 'projeto'
  });

  const handleAdd = () => {
    if (newProfile.name && newProfile.fcp) {
      onAddProfile(newProfile);
      setNewProfile({ name: '', fcp: 1.0, type: 'projeto' });
      setIsAdding(false);
    }
  };

  const handleEdit = (profile: ProfessionalProfile) => {
    setEditingId(profile.id);
    setNewProfile({
      name: profile.name,
      fcp: profile.fcp,
      type: profile.type
    });
  };

  const handleUpdate = () => {
    if (editingId && newProfile.name && newProfile.fcp) {
      onUpdateProfile(editingId, newProfile);
      setEditingId(null);
      setNewProfile({ name: '', fcp: 1.0, type: 'projeto' });
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
    <Card className="border-emerald-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-emerald-700">
            Cadastro de Perfis FCP ({profiles.length})
          </CardTitle>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Perfil
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(isAdding || editingId) && (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Perfil *</Label>
                  <Input
                    placeholder="Ex: Desenvolvedor Sênior"
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    className="border-emerald-200 focus:border-emerald-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fator de Complexidade (FCP) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="1.0"
                    value={newProfile.fcp}
                    onChange={(e) => setNewProfile({ ...newProfile, fcp: parseFloat(e.target.value) || 1.0 })}
                    className="border-emerald-200 focus:border-emerald-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Atuação *</Label>
                  <Select 
                    value={newProfile.type} 
                    onValueChange={(value: any) => setNewProfile({ ...newProfile, type: value })}
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
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setNewProfile({ name: '', fcp: 1.0, type: 'projeto' });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg bg-white">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-emerald-800">{profile.name}</span>
                  <Badge className={getTypeColor(profile.type)}>
                    {profile.type.charAt(0).toUpperCase() + profile.type.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  FCP: <span className="font-medium">{profile.fcp}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(profile)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteProfile(profile.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileManager;
