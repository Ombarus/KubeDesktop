import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box } from '@mui/material';
import DetailPane from './DetailPane';

type PodData = {
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    nodeName: string;
    type: string;
    clusterIP: string;
  };
  status: {
    hostIP: string;
    phase: string;
    startTime: string;
    kubeletVersion: string;
  };
};

const parsePod = (arg) => {
    const podData : PodData[] = [];
    Object.values(arg).forEach((pod) => {
      const data : PodData = {
        metadata: {
          name: pod.metadata?.name || '',
          namespace: pod.metadata?.namespace || '',
        },
        spec: {
          nodeName: pod.spec?.nodeName || '',
          type: pod.spec?.type || '',
          clusterIP: pod.spec?.clusterIP || '',
        },
        status: {
          hostIP: pod.status?.hostIP || '',
          phase: pod.status?.phase || '',
          startTime: '',
          kubeletVersion: pod.status?.nodeInfo?.kubeletVersion || '',
        },
      };
      podData.push(data);
    });
    return podData;
}

const makeHeader = (resourceName) => {
  let cols = []
  if (resourceName != "nodes") {
    cols.push({
      accessorKey: 'metadata.namespace',
      header: 'Namespace',
      size: 200,
      grow: 1,
    });
  }
  cols.push({
    accessorKey: 'metadata.name',
    header: 'Name',
    size: 250,
    grow: true,
  });
  if (resourceName == "pods") {
      cols.push({
        accessorKey: 'status.phase',
        header: 'Status',
        size: 100,
      });
      cols.push({
        accessorKey: 'status.hostIP',
        header: 'IP',
        size: 100,
      });
      cols.push({
        accessorKey: 'spec.nodeName',
        header: 'Node',
        size: 100,
      });
      cols.push({
        accessorKey: 'status.startTime',
        header: 'Start Time',
        size: 300,
      });
  }
  if (resourceName == "services") {
    cols.push({
      accessorKey: 'spec.type',
      header: 'Type',
      size: 100,
    });
    cols.push({
      accessorKey: 'spec.clusterIP',
      header: 'Cluster IP',
      size: 150,
    });
  }
  if (resourceName == "nodes") {
    cols.push({
      accessorKey: 'status.kubeletVersion',
      header: 'Version',
      size: 100,
    });
  }

  return cols;
};

const MainPane = ({paneHeight}) => {
  const [data, setData] = useState<PodData[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [selectedResource, setSelectedResource] = useState<string>("pods");
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<PodData>[]>(
    () => makeHeader(selectedResource),
    [selectedResource],
  );
  useEffect(() => {
    let dataq = [];
    window.electron.ipcRenderer.on('get-resource', async (arg) => {
      setSelectedResource(arg[0]);
      let podData = parsePod(arg[1]);
      setData(podData);
      setRefreshing(false);
      console.log(`paneHeight: ${paneHeight}`)
    });
    window.electron.ipcRenderer.on('set-context', async (arg) => {
      setRefreshing(true);
    });
  }, []);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: false,
    enableRowVirtualization: true,
    enableMultiRowSelection: false,
    enableColumnResizing: true,
    muiTableBodyProps: () => ({
      sx: {
        height: paneHeight,
      },
    }),
    state: {
      showProgressBars: isRefreshing,
    }
  });

  return (
      <MaterialReactTable table={table} layoutMode="grid" />
  );
  //return <div className="MainPane">hello</div>
};

export default MainPane;

