
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfessionalProfile, SquadComposition } from '@/types/calculator';

interface SquadFormModalProps {
  availableProfiles: ProfessionalProfile[];
  onAddSquad: (squad: Omit<SquadComposition, 'id'>) => void;
  onCancel: () => void;
}

const SquadFormModal: React.FC<SquadFormModalProps> = ({
  availableProfiles,
  onAddSquad,
  onCancel
}) => {
  const [newSquad, setNewSquad] = useState<Omit<SquadComposition, 'id'>>({
    profileId: '',
    quantity: 1,
    type: 'projeto',
    complexity: 'baixa'
  });

  const handleAddSquad = () => {
    if (newSquad.profileId) {
      onAddSquad(newSquad);
      setNewSquad({
        profileId: '',
        quantity: 1,
        type: 'projeto',
        complexity: 'baixa'
      });
      onCancel();
    }
  };

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="text-lg text-emerald-700">Adicionar Composição de Squad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Perfil Profissional *</Label>
            <Select 
              value={newSquad.profileId} 
              onValueChange={(value) => setNewSquad({ ...newSquad, profileId: value })}
            >
              <SelectTrigger className="border-emerald-200 focus:border-emerald-600">
                <SelectValue placeholder="Selecione um perfil" />
              </SelectTrigger>
              <SelectContent>
                {availableProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name} (FCP: {profile.fcp})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantidade de Profissionais *</Label>
            <Input
              type="number"
              min="0"
              step="0.25"
              placeholder="1"
              value={newSquad.quantity}
              onChange={(e) => setNewSquad({ ...newSquad, quantity: parseFloat(e.target.value) || 0 })}
              className="border-emerald-200 focus:border-emerald-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Atuação *</Label>
            <Select 
              value={newSquad.type} 
              onValueChange={(value: any) => setNewSquad({ ...newSquad, type: value })}
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

          {newSquad.type === 'projeto' && (
            <div className="space-y-2">
              <Label>Complexidade *</Label>
              <Select 
                value={newSquad.complexity} 
                onValueChange={(value: any) => setNewSquad({ ...newSquad, complexity: value })}
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
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddSquad} className="bg-emerald-600 hover:bg-emerald-700">
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

export default SquadFormModal;
