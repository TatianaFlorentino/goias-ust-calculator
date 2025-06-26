
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfessionalProfile } from '@/types/calculator';

interface AddProfileModalProps {
  onAddProfile: (profile: Omit<ProfessionalProfile, 'id'>) => void;
  onCancel: () => void;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({
  onAddProfile,
  onCancel
}) => {
  const [newProfile, setNewProfile] = useState<Omit<ProfessionalProfile, 'id'>>({
    name: '',
    fcp: 1.0
  });

  const handleAdd = () => {
    if (newProfile.name && newProfile.fcp > 0) {
      onAddProfile(newProfile);
      setNewProfile({ name: '', fcp: 1.0 });
      onCancel();
    }
  };

  return (
    <Card className="border-emerald-200 bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Cadastrar Novo Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome do Perfil *</Label>
            <Input
              placeholder="Ex: Desenvolvedor Especialista"
              value={newProfile.name}
              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              className="border-emerald-200 focus:border-emerald-600"
            />
          </div>
          <div className="space-y-2">
            <Label>FCP *</Label>
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
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleAdd}
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={!newProfile.name || newProfile.fcp <= 0}
          >
            Adicionar Perfil
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProfileModal;
