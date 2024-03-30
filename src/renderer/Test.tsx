import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';
import { Stack, Box, Typography, Container, Chip, Button, Drawer, Divider } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import KToolbar from './components/KToolbar';
import Leftpane from './components/LeftPane';
import MainPane from './components/MainPane';

export function Test() {

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
        maxHeight:'calc(100vh - 500px)',
      },
    },
  });

  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', bgcolor: '#CCCCCC' }}>
      <Box sx={{ display:'flex',flexDirection:'column',width:'200px' }}>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#FFCCCC' }}> A </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#DDAAAA' }}> B </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#BB5555' }}> C </Box>
      </Box>
      <Box sx={{ display:'flex',flexDirection:'column',flex:'1' }}>
        <Box sx={{ display:'flex',bgcolor:'#CCFFCC',height:'200px',minHeight:'200px' }}> D </Box>
        <Box sx={{ display:'grid',flex:'1',bgcolor:'#AADDAA' }}>
          <Box sx={{ position:'relative',flex:'1' }}>
            <MaterialReactTable table={table} />
          </Box>
        </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#55BB55' }}> F </Box>
      </Box>
      <Box sx={{ display:'flex',flexDirection:'column',width:'400px' }}>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#CCCCFF' }}> G </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#AAAADD' }}> H </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#5555BB' }}> I </Box>
      </Box>
    </Box>
  );
};
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
