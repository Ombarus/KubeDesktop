import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';
import { Stack, Box, Typography, Container, Chip, Button, Drawer, Divider } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { Tab, Tabs, Paper } from '@mui/material';
import KToolbar from './components/KToolbar';
import Leftpane from './components/LeftPane';
import MainPane from './components/MainPane';
import DetailPane from './components/DetailPane';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function Test() {
  const sidebarRef = useRef(null);
  const [isSidebarResizing, setIsSidebarResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const detailbarRef = useRef(null);
  const [isDetailbarResizing, setIsDetailbarResizing] = useState(false);
  const [detailbarHeight, setDetailbarHeight] = useState(300);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [tabValue, setTabValue] = useState(0);

  const startSidebarResizing = useCallback( (mouseDownEvent) => {
    setIsSidebarResizing(true);
  }, []);

  const stopResizing = useCallback( () => {
    setIsSidebarResizing(false);
    setIsDetailbarResizing(false);
  }, []);

  const startDetailbarResizing = useCallback( (mouseDownEvent) => {
    setIsDetailbarResizing(true);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isSidebarResizing) {
        let newWidth = mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left
        if (newWidth > windowDimensions.width / 2.0) {
          newWidth = windowDimensions.width / 2.0;
        }
        if (newWidth < 200) {
          newWidth = 200;
        }
        setSidebarWidth(newWidth);
      }
      if (isDetailbarResizing) {
        let newHeight = getWindowDimensions().height - mouseMoveEvent.clientY;
        if (newHeight < 100) {
          newHeight = 100;
        }
        if (newHeight > getWindowDimensions().height - 200) {
          newHeight = getWindowDimensions().height - 200;
        }
        console.log(`newHeight ${newHeight}`);
        setDetailbarHeight(newHeight);
      }
    },
    [isSidebarResizing, isDetailbarResizing]
  );

  const changeDetailTab = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const windowResize = useCallback( () => {
    setWindowDimensions(getWindowDimensions());
  }, []);


  const columns = useMemo<MRT_ColumnDef<ResourceData>[]>(
    () => [
      {
        accessorKey: 'namespace',
        header: 'Namespace',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
      },
    ],
    [],
  );

  const data = [
    { namespace: "a", name: "aa" },
    { namespace: "a", name: "ab" },
    { namespace: "a", name: "ac" },
    { namespace: "a", name: "ad" },
    { namespace: "a", name: "ae" },
    { namespace: "a", name: "af" },
    { namespace: "a", name: "ag" },
    { namespace: "a", name: "ah" },
    { namespace: "a", name: "ai" },
    { namespace: "a", name: "aj" },
    { namespace: "a", name: "ak" },
    { namespace: "a", name: "al" },
    { namespace: "a", name: "am" },
    { namespace: "a", name: "an" },
    { namespace: "a", name: "ao" },
    { namespace: "a", name: "ap" },
    { namespace: "a", name: "aq" },
    { namespace: "a", name: "ar" },
    { namespace: "a", name: "as" },
    { namespace: "a", name: "at" },
  ];

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: false,
    enableSelectAll: false,
    enableMultiRowSelection: false,
    enableRowVirtualization: true,
    muiTableBodyProps: {
      sx: {
      },
    },
  });

  function mainPaneHeight() {
    return getWindowDimensions().height - 75 - detailbarHeight;
  }

  useEffect( () => {
    window.addEventListener("resize", windowResize);
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("resize", windowResize);
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', bgcolor: '#CCCCCC', flexDirection:'column' }}>
      <Box className="ToolbarHeader" sx={{ bgcolor: '#FFAAAA', display:'box', height:'75px' }}>
        <Button variant='outlined' sx={{ margin:'1em' }}>Hello</Button>
      </Box>
      <Box className="BottomOfToolbar" sx={{ flex:'1', bgcolor:'#FFFFAA', display:'flex' }}>
        <Box ref={sidebarRef} className="LeftPane" sx={{ bgcolor:'#AAFFAA', width:sidebarWidth, flex:'1', minWidth:sidebarWidth, maxWidth:sidebarWidth, display:'flex' }} onMouseDown={(e) => e.preventDefault()}>
          <Box className="LeftPaneContent" sx={{ bgcolor:'#777777', flex:'1', display:'flex', flexDirection:'column', width:sidebarWidth-6 }}>
            <Box className="ContextPane" sx={{ bgcolor:'#444444', height:'100px' }}>
              Context
            </Box>
            <Box className="ResourcePane" sx={{ bgcolor:'#555555', flex:'1' }}>
              Resource List
            </Box>
          </Box>
          <Divider className="LeftPaneDragHandle" orientation="vertical" flexItem sx={{
            cursor: 'col-resize',
            width: '6px',
          }} onMouseDown={startSidebarResizing} />
        </Box>
        <Box className="MainPane" sx={{ bgcolor:'#AAAAFF', flex:'1' }}>
          <Box className="PodList" sx={{ bgcolor:'#FFAAFF', flex:'1', height:mainPaneHeight() }}>
            Pod List
          </Box>
          <Divider className="DetailPaneDragHandle" orientation="horizontal" flexItem sx={{
            cursor: 'row-resize',
            height: '6px',
          }} onMouseDown={startDetailbarResizing} />
          <Box ref={detailbarRef} className="DetailPane" sx={{ bgcolor:'#AAFFFF', height:detailbarHeight, minHeight:detailbarHeight, maxHeight:detailbarHeight}} onMouseDown={(e) => e.preventDefault()}>
            <Box sx={{  }}>
              <Tabs value={tabValue} aria-label="Detail tabs" onChange={changeDetailTab}>
                <Tab label="Events" id="event-tab" aria-controls="event-tabpanel" />
                <Tab label="Logs" id="logs-tab" aria-controls="logs-tabpanel" />
                <Tab label="Edit" id="edit-tab" aria-controls="edit-tabpanel" />
              </Tabs>
              <Box role="tabpanel" hidden={tabValue !== 0} id="event-tabpanel" aria-labelledby="event-tab">
                <Paper sx={{ flex:'1' }}>
                  EVENT TAB
                </Paper>
              </Box>
              <Box role="tabpanel" hidden={tabValue !== 1} id="logs-tabpanel" aria-labelledby="logs-tab">
                <Paper sx={{ overflow:'scroll', height:detailbarHeight - 50, maxWidth:getWindowDimensions().width - sidebarWidth, whiteSpace:'pre'}}>
                    LOGS TAB<br />test<br />test<br />asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                    LOGS TAB<br />test<br />test<br />
                </Paper>
              </Box>
              <Box role="tabpanel" hidden={tabValue !== 2} id="edit-tabpanel" aria-labelledby="edit-tab">
                <Paper sx={{ flex:'1' }}>
                  EDIT TAB
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
          //<Divider className="LeftPaneDragHandle" orientation="vertical" flexItem sx={{
          //  cursor: 'col-resize',
          //  width: '6px',
          //}} onMouseDown={startSidebarResizing} />



            //<Box className="ContextPane" sx={{ bgcolor:'#66FF66' }}>
            //  Context Dropdown
            //</Box>
            //<Box className="ResourcePane" sx={{ bgcolor:'#22FF22', display:'flex', flex:'1' }}>
            //  Resource Data
            //</Box>



            //<MaterialReactTable table={table} />
          //<MaterialReactTable table={table} />
          //<Box sx={{ bgcolor:'#FFFFFF' }}>
          //  AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //  AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //  AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //  AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //  AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //</Box>
          //
          //


          //<Box sx={{ display:'block',flex:'1',maxHeight:'50px',minHeight:'50px' }}>
          //  Head
          //</Box>
          //<Box sx={{ position:'relative', flex:'1' }}>
          //  <Box sx={{ overflow:'scroll',position:'absolute',top:'0',left:'0',right:'0',bottom:'0' }}>
          //    Body
          //    AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //    AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //    AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //    AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //    AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
          //  </Box>
          //</Box>
          //<Box sx={{ display:'block',flex:'1',maxHeight:'50px',minHeight:'50px' }}>
          //  Foot
          //</Box>


    //<Box className="Screen" sx={{ display:'flex',flex:'1',flexDirection:'column' }}>
    //  <Box className="Header">
    //    Header
    //  </Box>
    //  <Box className="Main" sx={{ display:'flex',flexDirection:'column',flex:'1' }}>
    //    <Box className="Panel" sx={{ display:'flex',flexDirection:'column',flex:'1' }}>
    //      <Box className="PanelTop" sx={{ flex:'1' }}>
    //        Top Panel
    //      </Box>
    //      <Box className="PanelBottomOverflow" sx={{ flex:'1',position:'relative' }}>
    //        <Box className="Scroller" sx={{ position:'absolute',overflow:'auto',top:'0',right:'0',left:'0',bottom:'0' }}>
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //          AKLJD<br />FHKS<br />FJHDSLK<br/ >FJHDS<br/ >KLJFH
    //        </Box>
    //      </Box>
    //    </Box>
    //  </Box>
    //  <Box className="Footer" sx={{ flex:'1' }}>
    //    Footer
    //  </Box>
    //</Box>
    //



    //<Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', bgcolor: '#CCCCCC' }}>
    //  <Box sx={{ display:'flex',flexDirection:'column',width:'200px' }}>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#FFCCCC' }}> A </Box>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#DDAAAA' }}> B </Box>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#BB5555' }}> C </Box>
    //  </Box>
    //  <Box sx={{ display:'flex',flexDirection:'column',flex:'1' }}>
    //    <Box sx={{ display:'flex',bgcolor:'#CCFFCC',height:'200px',minHeight:'200px' }}> D </Box>
    //    <Box sx={{ display:'grid',flex:'1',bgcolor:'#AADDAA' }}>
    //      <Box sx={{ position:'relative',flex:'1' }}>
    //        <MaterialReactTable table={table} />
    //      </Box>
    //    </Box>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#55BB55' }}> F </Box>
    //  </Box>
    //  <Box sx={{ display:'flex',flexDirection:'column',width:'400px' }}>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#CCCCFF' }}> G </Box>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#AAAADD' }}> H </Box>
    //    <Box sx={{ display:'flex',flex:'1',bgcolor:'#5555BB' }}> I </Box>
    //  </Box>
    //</Box>
