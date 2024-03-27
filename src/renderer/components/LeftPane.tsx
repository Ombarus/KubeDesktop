import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import Loading from './Loading';
import ContextPane from './ContextPane';
import ResourcePane from './ResourcePane';

const LeftPane = () => {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback( () => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  useEffect( () => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
      <Box sx={{
        width: sidebarWidth + 10}}
      >
        <Drawer
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <div className="Leftpane-Content"><ContextPane /><ResourcePane /></div>
          </Box>
        </Drawer>
        <box sx={{
          width: 10,
          height: '100vh',
          cursor: 'col-resize',
          }} onMouseDown={startResizing} />
      </Box>
  );
//  return <div className="LeftPane"><ContextPane /><ResourcePane /></div>;
};

export default LeftPane;

