import { Box, Button, Chip } from '@mui/material';

const KToolbar = () => {
  return (
    <Box className="ToolbarBtn" sx={{ display: 'flex' }}>
      <Box sx={{ width: '33%' }}>
        <Button variant="outlined">Edit</Button>
        <Button variant="outlined">Save</Button>
      </Box>
      <Box sx={{ width: '33%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chip color="success" label="Status: Online">
        </Chip>
      </Box>
      <Box sx={{ width: '33%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        ah
      </Box>
    </Box>
  );
};

export default KToolbar;

