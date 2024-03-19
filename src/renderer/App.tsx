import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import MainPane from './components/MainPane';
import LeftPane from './components/LeftPane';
import './App.css';

function Main() {
  return (
    <div>
      <Toolbar />
      <div className="Content">
        <LeftPane />
        <MainPane />
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
