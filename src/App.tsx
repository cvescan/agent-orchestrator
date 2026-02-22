import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [agents, setAgents] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  async function loadData() {
    try {
      const agentList: string[] = await invoke("list_agents");
      const skillList: string[] = await invoke("list_skills");
      setAgents(agentList);
      setSkills(skillList);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <nav className="sidebar">
        <h2>Mission Control</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", cursor: "pointer", fontWeight: 600 }}>Dashboard</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Agents</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>Skills</li>
          <li style={{ padding: "10px 0", cursor: "pointer" }}>MCP Config</li>
        </ul>
      </nav>
      <main className="main">
        <h1>Agent Orchestrator</h1>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="card">
            <h3>🤖 Sous-Agents ({agents.length})</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {agents.map(a => <li key={a} style={{ margin: "5px 0" }}>{a}</li>)}
            </ul>
          </div>
          
          <div className="card">
            <h3>💡 Skills Métier ({skills.length})</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {skills.map(s => <li key={s} style={{ margin: "5px 0" }}>{s}</li>)}
            </ul>
          </div>
        </div>

        <button className="btn" onClick={loadData} style={{ marginTop: "20px" }}>Actualiser</button>
      </main>
    </div>
  );
}

export default App;
