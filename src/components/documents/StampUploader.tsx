
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stamp, Upload, X, Check } from 'lucide-react';

interface StampUploaderProps {
  onSave: (stampData: string) => void;
  onCancel: () => void;
  initialStamp?: string;
}

const StampUploader: React.FC<StampUploaderProps> = ({ 
  onSave, 
  onCancel,
  initialStamp 
}) => {
  const [stampImage, setStampImage] = useState<string | null>(initialStamp || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setStampImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Company Stamp</h3>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white h-[200px] flex items-center justify-center">
          {stampImage ? (
            <img 
              src={stampImage} 
              alt="Company Stamp" 
              className="max-h-full max-w-full object-contain" 
            />
          ) : (
            <div className="text-center text-gray-500">
              <Stamp className="h-12 w-12 mx-auto mb-2" />
              <p>Upload your company stamp image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button variant="outline" size="sm" onClick={handleUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          {stampImage ? 'Change Stamp' : 'Upload Stamp'}
        </Button>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={() => stampImage && onSave(stampImage)}
          disabled={!stampImage}
        >
          <Check className="h-4 w-4 mr-2" />
          Save Stamp
        </Button>
      </div>
    </div>
  );
};

export default StampUploader;
