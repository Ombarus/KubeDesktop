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


export function ResizeDiv() {

  const detailbarRef = useRef(null);
  const tablecontainerRef = useRef(null);
  const [isDetailbarResizing, setIsDetailbarResizing] = useState(false);
  const [detailbarHeight, setDetailbarHeight] = useState(300);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const columns = useMemo<MRT_ColumnDef<ResourceData>[]>(
    () => [
      {
        accessorKey: 'namespace',
        header: 'Namespace',
        size: 200,
        grow: true,
      },
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
        grow: true,
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
        height: detailbarHeight - 188 - 100,
      },
    },
  });

  const stopResizing = useCallback( () => {
    setIsDetailbarResizing(false);
  }, []);

  const startDetailbarResizing = useCallback( (mouseDownEvent) => {
    setIsDetailbarResizing(true);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isDetailbarResizing) {
        let newHeight = mouseMoveEvent.clientY;
        if (newHeight < 100) {
          newHeight = 100;
        }
        if (newHeight > getWindowDimensions().height - 100) {
          newHeight = getWindowDimensions().height - 100;
        }
        console.log(`newHeight ${newHeight}`);
        getTableParentDimensions();
        setDetailbarHeight(newHeight);
      }
    },
    [isDetailbarResizing]
  );

  function getTableParentDimensions() {
    console.log(`table container size (${tablecontainerRef.current.offsetWidth}, ${tablecontainerRef.current.offsetHeight})`);
    return {
      width: tablecontainerRef.current.offsetWidth,
      height: tablecontainerRef.current.offsetHeight,
    };
  }

  const windowResize = useCallback( () => {
    setWindowDimensions(getWindowDimensions());
  }, []);

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
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', bgcolor: '#CCCCCC', minHeight: 0 }}>
      <Box sx={{ display:'flex',flexDirection:'column',width:'200px' }}>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#FFCCCC' }}> A </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#DDAAAA' }}> B </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#BB5555' }}> C </Box>
      </Box>
      <Box sx={{ display:'flex',flexDirection:'column',flex:'1', minHeight: 0 }}>
        <Box sx={{ display:'flex',bgcolor:'#CCFFCC',flex:'1', height:100, minHeight:100, maxHeight:100 }}> D </Box>

        <Box ref={tablecontainerRef} sx={{
          display:'flex',
          flexDirection: 'column',
          bgcolor:'#AADDAA',
          minWidth: 0,
          minHeight: 0,
          height: detailbarHeight - 100,
          maxHeight: detailbarHeight - 100,
        }}>
            <MaterialReactTable table={table} />
          <Divider className="DetailPaneDragHandle" orientation="horizontal" flexItem sx={{
            cursor: 'row-resize',
            height: 6,
          }} onMouseDown={startDetailbarResizing} />
        </Box>

        <Box ref={detailbarRef} sx={{
          display:'flex',
          flex: '1',
          bgcolor:'#55BB55',
          height: getWindowDimensions().height - 100 - detailbarRef,
          minHeight: getWindowDimensions().height - 100 - detailbarRef,
          maxHeight: getWindowDimensions().height - 100 - detailbarRef,
        }} onMouseDown={(e) => e.preventDefault()}>
          F
        </Box>
      </Box>
      <Box sx={{ display:'flex',flexDirection:'column',width:'400px' }}>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#CCCCFF' }}> G </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#AAAADD' }}> H </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#5555BB' }}> I </Box>
      </Box>
    </Box>
  );
};

        //height: getWindowDimensions().height - 100 - detailbarHeight,
            //<MaterialReactTable table={table} />
            //<Typography sx={{ textWrap:'nowrap', overflow:'auto' }}>
            //  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum convallis dictum. Sed eu orci sed velit laoreet porttitor sed nec orci. Nam at nisi volutpat, varius est sed, porta lorem. Curabitur quis massa ligula. Etiam ultrices, dui ac placerat elementum, nulla leo sagittis elit, vel auctor ante nunc non magna. Cras at vestibulum quam, eu finibus felis. Mauris eleifend lobortis nunc vitae feugiat. Maecenas mollis nunc in neque volutpat, vel vulputate ipsum consectetur. Proin convallis arcu mattis metus pretium porta. Curabitur bibendum vel leo sed interdum. Suspendisse a imperdiet libero. Integer ex risus, commodo quis ante ut, congue porttitor tellus. Mauris rhoncus semper blandit. Nullam id ante vel nulla vulputate bibendum.<br />
            //  Lorem<br />ipsum<br />dolor<br />sit<br />amet,<br />consectetur<br />adipiscing<br />elit.<br />Integer<br />fermentum<br />convallis<br />dictum.<br />Sed<br />eu<br />orci<br />sed<br />velit<br />laoreet<br />porttitor<br />sed<br />nec<br />orci.<br />Nam<br />at<br />nisi<br />volutpat,<br />varius<br />est<br />sed,<br />porta<br />lorem.<br />Curabitur<br />quis<br />massa<br />ligula.<br />Etiam<br />ultrices,<br />dui<br />ac<br />placerat<br />elementum,<br />nulla<br />leo<br />sagittis<br />elit,<br />vel<br />auctor<br />ante<br />nunc<br />non<br />magna.<br />Cras<br />at<br />vestibulum<br />quam,<br />eu<br />finibus<br />felis.<br />Mauris<br />eleifend<br />lobortis<br />nunc<br />vitae<br />feugiat.<br />Maecenas<br />mollis<br />nunc<br />in<br />neque<br />volutpat,<br />vel<br />vulputate<br />ipsum<br />consectetur.<br />Proin<br />convallis<br />arcu<br />mattis<br />metus<br />pretium<br />porta.<br />Curabitur<br />bibendum<br />vel<br />leo<br />sed<br />interdum.<br />Suspendisse<br />a<br />imperdiet<br />libero.<br />Integer<br />ex<br />risus,<br />commodo<br />quis<br />ante<br />ut,<br />congue<br />porttitor<br />tellus.<br />Mauris<br />rhoncus<br />semper<br />blandit.<br />Nullam<br />id<br />ante<br />vel<br />nulla<br />vulputate<br />bibendum.
            //</Typography>
