import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
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
    <div className="Leftpane" ref={sidebarRef} style={{width: sidebarWidth }} onMouseDown={(e) => e.preventDefault()}>
      <div className="Leftpane-Content"><ContextPane /><ResourcePane /></div>
      <div className="Leftpane-Resizer" onMouseDown={startResizing} />
    </div>
    </Drawer>
  );
//  return <div className="LeftPane"><ContextPane /><ResourcePane /></div>;
};

export default LeftPane;

