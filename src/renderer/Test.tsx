import { Stack, Box, Typography, Container, Chip, Button, Drawer, Divider } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

export function Test() {
  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', flexDirection: 'column' }}>
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
      <Divider orientation="horizontal" flexItem/>


      <Box className="UnderToolBar" sx={{ display: 'flex', overflow: 'auto', bgcolor: 'secondary.light', flex:'1' }}>
        Hello

      </Box>

    </Box>
  );
};



//      <Stack className="UnderToolBar" direction="row" width={1} spacing={2} divider={
//          <Divider orientation="vertical" flexItem />
//        }>
//        <Stack className="LeftPane" direction="Column" spacing={1} divider={
//          <Divider orientation="horizontal" flexItem />
//        }>
//          <Stack className="ContextSection">
//            <FormControl fullWidth>
//              <InputLabel id="context-selector-label">Context</InputLabel>
//              <Select
//                labelId="context-selector-label"
//                id="context-selector"
//                value="Minikube"
//              >
//                <MenuItem key="test" value="test">test</MenuItem>
//                <MenuItem key="Minikube" value="Minikube">Minikube</MenuItem>
//                <MenuItem key="test2" value="test2">test2</MenuItem>
//              </Select>
//            </FormControl>
//          </Stack>
//          <Stack className="ResourceSection" sx={{ bgcolor: 'secondary.main', height: '100%', overflowY: 'auto'}} >
//            {Array.from(Array(100)).map((v, i) => (
//              <Typography>
//                Resources Table
//              </Typography>
//            ))}
//          </Stack>
//        </Stack>
//        <Stack className="RightPane" sx={{ bgcolor: 'secondary.light'}} flex={1}>
//          Main Pane
//        </Stack>
//      </Stack>
