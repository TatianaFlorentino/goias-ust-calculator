
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import OnboardingModal from './OnboardingModal';

const OnboardingTrigger: React.FC = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOnboardingOpen(true)}
        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        Tutorial
      </Button>
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </>
  );
};

export default OnboardingTrigger;
