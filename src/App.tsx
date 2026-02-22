import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { FileManager, FileItem } from "./components/FileManager";
import { Editor } from "./components/Editor";

function App() {
  const [view, setView] = useState("dashboard");
  const [agents, setAgents] = useState<FileItem[]>([]);
  const [skills, setSkills] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [editorContent, setEditorContent] = useState("");

  async function loadData() {
    try {
      const agentList: FileItem[] = await invoke("list_agents");
      const skillList: FileItem[] = await invoke("list_skills");
      setAgents(agentList);
      setSkills(skillList);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectFile = async (file: FileItem) => {
    try {
      const content: string = await invoke("read_config_file", { path: file.path });
      setEditorContent(content);
      setSelectedFile(file);
    } catch (error) {
      console.error("Failed to read file", error);
    }
  };

  const handleSaveFile = async (path: string, content: string) => {
    try {
      await invoke("save_config_file", { path, content });
      console.log("File saved");
    } catch (error) {
      console.error("Failed to save file", error);
    }
  };

  const renderContent = () => {
    if (selectedFile) {
      return (
        <Editor
          file={selectedFile}
          initialContent={editorContent}
          onSave={handleSaveFile}
          onClose={() => setSelectedFile(null)}
        />
      );
    }

    switch (view) {
      case "dashboard":
        return <Dashboard agentsCount={agents.length} skillsCount={skills.length} />;
      case "agents":
        return <FileManager title="Agents" files={agents} onSelectFile={handleSelectFile} />;
      case "skills":
        return <FileManager title="Skills" files={skills} onSelectFile={handleSelectFile} />;
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <div className="container">
      <Sidebar currentView={view} onChangeView={(v) => { setView(v); setSelectedFile(null); }} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
