import { Stack, Box, Typography, Container, Chip, Button, Drawer, Divider } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import KToolbar from './components/KToolbar';
import Leftpane from './components/LeftPane';
import MainPane from './components/MainPane';

export function Layout() {
  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', flexDirection: 'column' }}>
      <KToolbar />
      <Divider orientation="horizontal" flexItem/>


      <Box className="UnderToolBar" sx={{ display: 'flex', overflow: 'auto', bgcolor: 'secondary.light', flex:'1' }}>
        <Leftpane />
        <MainPane />

      </Box>

    </Box>
  );
};

        //<Box className="Leftpane" sx={{ bgcolor: 'secondary.dark', display: 'flex' }}>
        //  <Box className="LeftPaneContent">
        //    <Box className="ContextPane" sx={{ display: 'block' }}>
        //      Context Pane
        //    </Box>
        //    <Box className="ResourcePane" sx={{ bgcolor: 'secondary.dark', overflow: 'scroll' }}>
        //      Hello
        //        {Array.from(Array(100)).map((v, i) => (
        //          <Typography>
        //            Resources Table
        //          </Typography>
        //        ))}
        //    </Box>
        //  </Box>
        //  <Divider className="DragHandle" orientation="vertical" flexItem sx={{ cursor: 'col-resize', width: '6px' }} />
        //</Box>


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
