import { Claim } from '@/types/claim';
import { ClaimCard } from './ClaimCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileStack } from 'lucide-react';

interface ClaimsSidebarProps {
  claims: Claim[];
  selectedClaim: Claim | null;
  onSelectClaim: (claim: Claim) => void;
}

export function ClaimsSidebar({ claims, selectedClaim, onSelectClaim }: ClaimsSidebarProps) {
  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col h-screen">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileStack className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Submitted Claims</h2>
            <p className="text-xs text-muted-foreground">{claims.length} claims total</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {claims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              isSelected={selectedClaim?.id === claim.id}
              onClick={() => onSelectClaim(claim)}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
