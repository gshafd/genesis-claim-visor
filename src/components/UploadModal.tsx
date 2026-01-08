import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Image, Plus, Calendar, MapPin, DollarSign } from 'lucide-react';

interface UploadModalProps {
  onUpload: (data: UploadFormData) => void;
}

export interface UploadFormData {
  claimPdf: File | null;
  policeReport: File | null;
  accidentImage: File | null;
  claimAmount: string;
  accidentDate: string;
  location: string;
}

export function UploadModal({ onUpload }: UploadModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    claimPdf: null,
    policeReport: null,
    accidentImage: null,
    claimAmount: '',
    accidentDate: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(formData);
    setOpen(false);
    setFormData({
      claimPdf: null,
      policeReport: null,
      accidentImage: null,
      claimAmount: '',
      accidentDate: '',
      location: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Upload New Claim
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload New Claim</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* File Uploads */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Claim Form (PDF) *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="claim-pdf"
                  onChange={(e) => setFormData({ ...formData, claimPdf: e.target.files?.[0] || null })}
                />
                <label htmlFor="claim-pdf" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {formData.claimPdf ? formData.claimPdf.name : 'Click to upload PDF'}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF up to 10MB</p>
                  </div>
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Police Report (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="police-report"
                  onChange={(e) => setFormData({ ...formData, policeReport: e.target.files?.[0] || null })}
                />
                <label htmlFor="police-report" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {formData.policeReport ? formData.policeReport.name : 'Click to upload'}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF up to 10MB</p>
                  </div>
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </label>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Accident Image *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="accident-image"
                  onChange={(e) => setFormData({ ...formData, accidentImage: e.target.files?.[0] || null })}
                />
                <label htmlFor="accident-image" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <Image className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {formData.accidentImage ? formData.accidentImage.name : 'Click to upload image'}
                    </p>
                    <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
                  </div>
                  <Upload className="w-4 h-4 text-muted-foreground" />
                </label>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">Claim Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                  value={formData.claimAmount}
                  onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Accident Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  className="pl-9"
                  value={formData.accidentDate}
                  onChange={(e) => setFormData({ ...formData, accidentDate: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, State"
                className="pl-9"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Process Claim
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
