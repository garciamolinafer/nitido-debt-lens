
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, Upload, CheckCircle, AlertTriangle, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DealPageHeader from "@/components/deals/DealPageHeader";
import { toast } from "@/hooks/use-toast";

type FileStatus = "uploading" | "processing" | "completed" | "error" | "skipped";

interface FileWithStatus {
  id: string;
  name: string;
  status: FileStatus;
  progress: number;
  type: string;
  size: string;
  extractionResults: {
    item: string;
    status: "success" | "error" | "warning";
    message: string;
  }[];
}

const DocumentIntelligencePage = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Mock data for demo purposes
  const mockFiles: FileWithStatus[] = [
    {
      id: "1",
      name: "CreditAgreement.pdf",
      status: "completed" as FileStatus,
      progress: 100,
      type: "PDF",
      size: "3.2 MB",
      extractionResults: [
        { item: "5 covenants extracted", status: "success", message: "Successfully identified financial covenants" },
        { item: "3 tranches identified", status: "success", message: "Term Loan A, B, and Revolving Facility" },
        { item: "Key dates recorded", status: "success", message: "Closing date, maturity dates, and payment dates" }
      ]
    },
    {
      id: "2",
      name: "Financial_Model.xlsx",
      status: "completed" as FileStatus,
      progress: 100,
      type: "Excel",
      size: "1.8 MB",
      extractionResults: [
        { item: "12 financial metrics extracted", status: "success", message: "EBITDA, Revenue, Net Income, etc." },
        { item: "1 formula could not be interpreted", status: "error", message: "Complex nested IF statement on Sheet 3, cell G42" },
        { item: "Projections identified", status: "success", message: "5-year financial projections extracted" }
      ]
    },
    {
      id: "3",
      name: "SitePhotos.zip",
      status: "skipped" as FileStatus,
      progress: 100,
      type: "ZIP",
      size: "15.4 MB",
      extractionResults: [
        { item: "Unsupported format", status: "warning", message: "ZIP files cannot be processed for text extraction" }
      ]
    }
  ];
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        status: "uploading" as FileStatus,
        progress: 0,
        type: file.type.split("/")[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        extractionResults: []
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simulate processing
      newFiles.forEach(file => {
        simulateFileProcessing(file.id);
      });
    }
  };
  
  const simulateFileProcessing = (fileId: string) => {
    // First simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
      ));
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        
        // Change status to processing
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: "processing" } : f
        ));
        
        // Simulate AI processing time
        setTimeout(() => {
          // Determine if file should be completed or have errors
          const isSuccessful = Math.random() > 0.3; // 70% chance of success
          
          if (isSuccessful) {
            setFiles(prev => prev.map(f => {
              if (f.id === fileId) {
                // Generate random extraction results
                const numResults = Math.floor(Math.random() * 3) + 1;
                const extractionResults = [];
                
                for (let i = 0; i < numResults; i++) {
                  const resultStatus = Math.random() > 0.2 ? "success" as const : "warning" as const;
                  extractionResults.push({
                    item: `Item ${i + 1} extracted`,
                    status: resultStatus,
                    message: `Extraction detail ${i + 1}`
                  });
                }
                
                return { 
                  ...f, 
                  status: "completed", 
                  extractionResults
                };
              }
              return f;
            }));
            
            toast({
              title: "Document processed successfully",
              description: "AI has extracted key information from your document.",
              duration: 3000,
            });
          } else {
            setFiles(prev => prev.map(f => {
              if (f.id === fileId) {
                return { 
                  ...f, 
                  status: "error",
                  extractionResults: [
                    { 
                      item: "Processing error", 
                      status: "error" as const, 
                      message: "Could not process this document format" 
                    }
                  ]
                };
              }
              return f;
            }));
            
            toast({
              title: "Document processing failed",
              description: "There was an issue extracting data from your document.",
              variant: "destructive",
              duration: 3000,
            });
          }
        }, 2000);
      }
    }, 300);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        status: "uploading" as FileStatus,
        progress: 0,
        type: file.type.split("/")[1].toUpperCase() || "Unknown",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        extractionResults: []
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simulate processing
      newFiles.forEach(file => {
        simulateFileProcessing(file.id);
      });
    }
  };
  
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };
  
  const loadMockData = () => {
    setFiles(mockFiles);
  };
  
  // For demo purposes, load mock data if no files yet
  if (files.length === 0) {
    setTimeout(loadMockData, 500);
  }

  return (
    <div className="min-h-screen bg-white">
      <DealPageHeader dealName={`Deal ${dealId} - Document Intelligence`} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" onClick={() => window.history.back()}>
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back</span>
          </Button>
          <h1 className="text-2xl font-semibold">Document Intelligence</h1>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? "border-black bg-gray-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">Drag & drop files here</h2>
              <p className="text-gray-500 mb-4">
                or click to select documents to upload
              </p>
              <small className="text-gray-400 block mb-4">
                Supported formats: PDF, DOCX, XLSX, CSV, TXT, JPG, PNG
              </small>
              <Button className="relative">
                Select Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  multiple
                />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-semibold mb-4">Document Processing</h2>
        
        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {file.status === "completed" && (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {file.status === "error" && (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      {file.status === "skipped" && (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {(file.status === "uploading" || file.status === "processing") && (
                    <div className="mb-2">
                      <Progress value={file.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {file.status === "uploading" 
                          ? `Uploading: ${file.progress}%` 
                          : "Processing document..."}
                      </p>
                    </div>
                  )}
                  
                  {file.extractionResults.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Extraction Results:</h4>
                      <ul className="space-y-2">
                        {file.extractionResults.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            {result.status === "success" && (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            )}
                            {result.status === "error" && (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            )}
                            {result.status === "warning" && (
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                            )}
                            <div>
                              <p className="text-sm">{result.item}</p>
                              <p className="text-xs text-gray-500">{result.message}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {file.status === "completed" && file.extractionResults.some(r => r.status === "error") && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        Review & Fix Issues
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No documents uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentIntelligencePage;
