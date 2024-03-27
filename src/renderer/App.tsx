import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import KToolbar from './components/KToolbar';
import MainPane from './components/MainPane';
import LeftPane from './components/LeftPane';
import './App.css';

function Main() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <KToolbar />
      <LeftPane />
      <MainPane />
    </Box>
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
