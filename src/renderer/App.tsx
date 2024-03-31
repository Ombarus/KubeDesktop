import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import KToolbar from './components/KToolbar';
import MainPane from './components/MainPane';
import LeftPane from './components/LeftPane';
import { Layout } from './Layout';
import { Test } from './Test';
import './App.css';

//function Main() {
//  return (
//    <Test />
//  );
//}

function Main() {
    return (
      <Layout />
//      <Test />
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
