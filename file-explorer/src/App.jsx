import { useState } from "react";
import Folder from "../components/folder";
import explorer from "../data/data";
import "./App.css";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={() => {}} />
    </div>
  );
}
