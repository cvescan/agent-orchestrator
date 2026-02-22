use std::fs;
use std::path::PathBuf;
use serde::Serialize;

#[derive(Serialize)]
struct FileItem {
    name: String,
    path: String,
}

#[tauri::command]
fn list_agents() -> Vec<FileItem> {
    let home = dirs::home_dir().expect("Could not find home directory");
    let agents_path = home.join(".gemini").join("agents");
    
    fs::read_dir(agents_path)
        .map(|res| res.filter_map(|e| {
            e.ok().map(|entry| FileItem {
                name: entry.file_name().to_string_lossy().into_owned(),
                path: entry.path().to_string_lossy().into_owned(),
            })
        }).collect())
        .unwrap_or_else(|_| vec![])
}

#[tauri::command]
fn list_skills() -> Vec<FileItem> {
    let home = dirs::home_dir().expect("Could not find home directory");
    let skills_path = home.join(".agents").join("skills");
    
    fs::read_dir(skills_path)
        .map(|res| res.filter_map(|e| {
            e.ok().map(|entry| FileItem {
                name: entry.file_name().to_string_lossy().into_owned(),
                path: entry.path().to_string_lossy().into_owned(),
            })
        }).collect())
        .unwrap_or_else(|_| vec![])
}

#[tauri::command]
fn read_config_file(path: String) -> Result<String, String> {
    fs::read_to_string(path).map_err(|e| e.to_string())
}

#[tauri::command]
fn save_config_file(path: String, content: String) -> Result<(), String> {
    fs::write(path, content).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_agents, list_skills, read_config_file, save_config_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
