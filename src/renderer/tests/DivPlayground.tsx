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

export function DivPlayground() {

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
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'name',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: 'name',
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
    muiTableProps: {
      sx: {
        height: 200,
        width: 300
      },
    },
  });
  //useEffect( () => {
  //  window.addEventListener("resize", windowResize);
  //  window.addEventListener("mousemove", resize);
  //  window.addEventListener("mouseup", stopResizing);
  //  return () => {
  //    window.removeEventListener("resize", windowResize);
  //    window.removeEventListener("mousemove", resize);
  //    window.removeEventListener("mouseup", stopResizing);
  //  };
  //}, [resize, stopResizing]);

  return (
    <Box className="Screen" sx={{ display: 'flex', overflow: 'auto', flex: '1', bgcolor: '#CCCCCC' }}>
      <Box sx={{ display:'flex',flexDirection:'column',width:'200px' }}>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#FFCCCC' }}> A </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#DDAAAA' }}> B </Box>
        <Box sx={{ display:'flex',flex:'1',bgcolor:'#BB5555' }}> C </Box>
      </Box>
      <Box sx={{ display:'flex',flexDirection:'column',flex:'1' }}>
        <Box sx={{ display:'flex',bgcolor:'#CCFFCC',flex:'1' }}> D </Box>
        <Box sx={{ display:'grid',flex:'1',bgcolor:'#AADDAA' }}>
          <Box>
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

