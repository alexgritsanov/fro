
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pen, X, Upload, Download, Check } from 'lucide-react';

interface SignatureCanvasProps {
  onSave: (signatureData: string) => void;
  onCancel: () => void;
  initialSignature?: string;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ 
  onSave, 
  onCancel,
  initialSignature 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'upload'>(initialSignature ? 'upload' : 'draw');
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialSignature || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw initial signature if provided
    if (initialSignature && signatureMethod === 'draw') {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialSignature;
    }
  }, [initialSignature, signatureMethod]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (signatureMethod !== 'draw') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || signatureMethod !== 'draw') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch devices
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        setSignatureMethod('upload');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (signatureMethod === 'upload' && uploadedImage) {
      onSave(uploadedImage);
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData);
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Signature</h3>
        <div className="flex gap-2">
          <Button 
            variant={signatureMethod === 'draw' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSignatureMethod('draw')}
          >
            <Pen className="h-4 w-4 mr-2" />
            Draw
          </Button>
          <Button 
            variant={signatureMethod === 'upload' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSignatureMethod('upload')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {signatureMethod === 'draw' ? (
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-md bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="w-full touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border border-gray-300 rounded-md p-4 bg-white h-[150px] flex items-center justify-center">
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Uploaded Signature" 
                className="max-h-full max-w-full object-contain" 
              />
            ) : (
              <div className="text-center text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-2" />
                <p>Upload your signature image</p>
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
            {uploadedImage ? 'Change Image' : 'Upload Image'}
          </Button>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>
          <Check className="h-4 w-4 mr-2" />
          Save Signature
        </Button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
