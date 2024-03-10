import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import MainPane2 from './components/MainPane2';
import LeftPane from './components/LeftPane';
import './App.css';

function Main() {
  return (
    <div>
      <Toolbar />
      <div className="Content">
        <LeftPane />
        <MainPane2 />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
