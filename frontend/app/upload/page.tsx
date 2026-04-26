"use client";

import { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import { useMedicalStore } from '@/store/useMedicalStore';
import { medicalApi } from '@/services/api';

export default function UploadPage() {
  const { addAuditLog, token, setAuthModalOpen, setActiveDataset } = useMedicalStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerUpload = async () => {
    if (selectedFiles.length === 0) return;

    if (!token) {
        setAuthModalOpen(true);
        return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const response = await medicalApi.uploadDataset(selectedFiles);

      // Update store with the new active dataset
      setActiveDataset({
        id: response.task_id,
        name: `Retina_Batch_${new Date().toLocaleDateString()}`,
        type: 'Medical Image (Retina)',
        file_count: selectedFiles.length,
        total_size_bytes: selectedFiles.reduce((acc, f) => acc + f.size, 0),
        upload_date: new Date().toISOString(),
        status: 'completed' as any, // ProcessingStatus.COMPLETED
        processed_count: selectedFiles.length
      });

      addAuditLog("Dataset Upload Completed", `Uploaded ${selectedFiles.length} files. Task ID: ${response.task_id}`);
      setUploadStatus('success');
      setSelectedFiles([]);
      setTimeout(() => setUploadStatus('idle'), 5000);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stage 1: Upload Dataset</h1>
        <p className="text-slate-500 mt-1 font-medium">Upload medical images and metadata to begin the synthesis pipeline.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`border-2 border-dashed rounded-2xl p-12 bg-white flex flex-col items-center justify-center text-center group transition-all ${
              selectedFiles.length > 0 ? 'border-medical-accent/50 bg-blue-50/20' : 'border-slate-200 hover:border-medical-accent'
            } cursor-default`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept=".dcm,.png,.jpg,.jpeg,.csv"
            />

            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <UploadCloud className="w-8 h-8 text-medical-accent" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Drag and drop medical files</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs">Supports DICOM, PNG, JPEG, and CSV metadata files up to 2GB.</p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-sm"
              >
                Select Files
              </button>

              {selectedFiles.length > 0 && (
                <button
                  onClick={triggerUpload}
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-medical-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
                </button>
              )}
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="glass-card animate-in slide-in-from-top-4 duration-300">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Queue Selection</h3>
                  <button onClick={() => setSelectedFiles([])} className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-600 transition-colors">Clear All</button>
               </div>
               <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                       <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="font-bold text-slate-900 truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                       </div>
                       <button onClick={() => removeFile(idx)} className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors">
                          <X className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-medical-success font-bold text-sm animate-in zoom-in duration-300">
               <CheckCircle2 className="w-5 h-5" />
               Dataset successfully queued for processing.
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600 font-bold text-sm animate-in zoom-in duration-300">
               <AlertCircle className="w-5 h-5" />
               Upload failed. Please check your connection and try again.
            </div>
          )}

          <div className="glass-card">
            <h3 className="font-bold text-slate-900 mb-4">Accepted Formats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">DICOM</p>
                  <p className="text-xs text-slate-500 font-medium">Medical standard</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Anonymized CSV</p>
                  <p className="text-xs text-slate-500 font-medium">Patient Metadata</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="font-bold text-slate-900 mb-4">Compliance Check</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-medical-success shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Automatic PHI Scrubbing</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">System automatically removes PII from DICOM headers during upload.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-medical-success shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Medical Consistency</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Cross-validation between metadata and image modality.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl transition-all duration-500 ${isUploading ? 'bg-medical-accent text-white shadow-2xl scale-105' : 'bg-slate-900 text-white shadow-xl'}`}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Queue Status</p>
            <p className="text-lg font-bold">{isUploading ? 'Uploading...' : 'Idle'}</p>
            <div className="mt-4 flex flex-col gap-2">
               {isUploading && (
                 <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-progress-indefinite" />
                 </div>
               )}
               <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium italic">
                 {isUploading ? "Streaming institutional data to secure clinical processing cluster..." : "Ready to process incoming biomedical datasets for neural training."}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
