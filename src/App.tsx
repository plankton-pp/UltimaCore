//React
import { Routes, Route } from 'react-router-dom'

// Global Style
import "./App.css";

//Component
import AppLayout from "./components/Layout/AppLayout";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index path='/todo' element={<KanbanBoard />} />
          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
