import { Stack, Box, Typography, Container, Chip, Button, Drawer, Divider } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import KToolbar from './components/KToolbar';
import Leftpane from './components/LeftPane';
import MainPane from './components/MainPane';

export function Test() {
  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1' }}>
      <Box sx={{ bgcolor: 'secondary.light', display: 'flex', width: '100px' }}>
      This is Box 1
      </Box>
      <Box sx={{ bgcolor: 'secondary.dark', display: 'flex', flex: '1' }}>
      This is Box 2
      </Box>
    </Box>
  );
};
