import { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { FileItem } from './FileManager';

interface EditorProps {
  file: FileItem;
  initialContent: string;
  onSave: (path: string, content: string) => void;
  onClose: () => void;
}

export function Editor({ file, initialContent, onSave, onClose }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setContent(initialContent);
    setIsDirty(false);
  }, [initialContent]);

  const handleSave = () => {
    onSave(file.path, content);
    setIsDirty(false);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button className="btn-icon" onClick={onClose}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>{file.name}</h2>
        <button
          className={`btn-primary ${isDirty ? '' : 'disabled'}`}
          onClick={handleSave}
          disabled={!isDirty}
        >
          <Save size={16} />
          Save
        </button>
      </div>
      <textarea
        className="editor-textarea"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsDirty(true);
        }}
        spellCheck={false}
      />
    </div>
  );
}
