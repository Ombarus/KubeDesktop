import { useEffect, useState, useMemo, useRef, useCallback, SyntheticEvent, ReactNode } from 'react';
import { Box, Tab, Tabs, Typography, Paper, Divider } from '@mui/material';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const rawHTML = `
Name:         grafana
Namespace:    default
Labels:       app.kubernetes.io/instance=grafana
              app.kubernetes.io/managed-by=Helm
              app.kubernetes.io/name=grafana
              app.kubernetes.io/version=10.4.0
              helm.sh/chart=grafana-7.3.7
Annotations:  meta.helm.sh/release-name: grafana
              meta.helm.sh/release-namespace: default

Data
====
plugins:
----
marcusolsson-csv-datasource
grafana.ini:
----
[analytics]
check_for_updates = true
[grafana_net]
url = https://grafana.net
[log]
mode = console
[paths]
data = /var/lib/grafana/
logs = /var/log/grafana
plugins = /var/lib/grafana/plugins
provisioning = /etc/grafana/provisioning
[server]
domain = grafana.dev.eencloud.com


BinaryData
====

Events:  <none>
`

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function DetailPane() {
  const detailbarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [detailbarHeight, setDetailbarHeight] = useState(268);

  const startResizing = useCallback((mouseDownEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback( () => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setDetailbarHeight(
          mouseMoveEvent.clientY -
            detailbarRef.current.getBoundingClientRect().top
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

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box ref={detailbarRef} className="DetailPane" sx={{ display:'flex', flex:'1', flexDirection:'column', height: detailbarHeight }} onMouseDown={(e) => e.preventDefault()}>
      <Divider className="DragHandle" orientation="horizontal" flexItem sx={{
        cursor: 'row-resize',
        height: '6px',
      }} onMouseDown={startResizing} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Events" {...a11yProps(0)} />
          <Tab label="Logs" {...a11yProps(1)} />
          <Tab label="Edit" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper className="DetailEventsPane" sx={{ display:'flex', flex:'1' }}>
          <pre>
            {rawHTML}
          </pre>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

