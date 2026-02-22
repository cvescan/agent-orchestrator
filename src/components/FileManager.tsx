import { FileText } from 'lucide-react';

export interface FileItem {
  name: string;
  path: string;
}

interface FileManagerProps {
  title: string;
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
}

export function FileManager({ title, files, onSelectFile }: FileManagerProps) {
  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <h1>{title}</h1>
        <div className="file-count">{files.length} items</div>
      </div>
      <div className="file-list">
        {files.length === 0 ? (
          <p className="empty-state">No files found.</p>
        ) : (
          files.map((file) => (
            <div
              key={file.path}
              className="file-card"
              onClick={() => onSelectFile(file)}
            >
              <FileText size={40} className="file-icon" strokeWidth={1.5} />
              <span className="file-name">{file.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
