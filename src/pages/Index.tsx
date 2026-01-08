import { useState } from 'react';
import { ClaimsSidebar } from '@/components/ClaimsSidebar';
import { Header } from '@/components/Header';
import { WorkflowView } from '@/components/WorkflowView';
import { EmptyState } from '@/components/EmptyState';
import { mockClaims } from '@/data/mockClaims';
import { Claim } from '@/types/claim';
import { UploadFormData } from '@/components/UploadModal';

const Index = () => {
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const handleUpload = (data: UploadFormData) => {
    // Create a new claim from uploaded data
    const newClaim: Claim = {
      id: `CLM${Math.floor(Math.random() * 9000) + 1000}`,
      vehicleMake: 'Unknown',
      vehicleModel: 'Vehicle',
      vehicleYear: new Date().getFullYear(),
      dateOfLoss: data.accidentDate,
      status: 'not_processed',
      riskLevel: 'pending',
      vin: `VIN${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
      narrative: 'Claim uploaded via portal. Awaiting document parsing.',
      claimAmount: parseFloat(data.claimAmount) || 0,
      location: data.location,
    };

    setClaims([newClaim, ...claims]);
    setSelectedClaim(newClaim);
  };

  return (
    <div className="flex h-screen bg-background">
      <ClaimsSidebar
        claims={claims}
        selectedClaim={selectedClaim}
        onSelectClaim={setSelectedClaim}
      />
      <div className="flex-1 flex flex-col">
        <Header onUpload={handleUpload} />
        <main className="flex-1 overflow-hidden">
          {selectedClaim ? (
            <WorkflowView claim={selectedClaim} />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
