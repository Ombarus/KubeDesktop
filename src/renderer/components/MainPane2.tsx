import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type PodData = {
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    nodeName: string;
  };
  status: {
    hostIP: string;
    phase: string;
    startTime: string;
  };
};

const MainPane2 = () => {
  const [data, setData] = useState<PodData[]>([]);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<PodData>[]>(
    () => [
      {
        accessorKey: 'metadata.namespace',
        header: 'Namespace',
        size: 100,
      },
      {
        accessorKey: 'metadata.name',
        header: 'Name',
        size: 250,
      },
      {
        accessorKey: 'status.phase',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'status.hostIP',
        header: 'IP',
        size: 100,
      },
      {
        accessorKey: 'spec.nodeName',
        header: 'Node',
        size: 100,
      },
      {
        accessorKey: 'status.startTime',
        header: 'Start Time',
        size: 300,
      },
    ],
    [],
  );
  useEffect(() => {
    let dataq = [];
    window.electron.ipcRenderer.once('get-pod', async (arg) => {
        console.log(`received ${arg}`);

        const podData : PodData[] = [];
        Object.values(arg).forEach((pod) => {
          console.log(`data: name=${pod.metadata.name}, namespace=${pod.metadata.namespace}, node=${pod.spec.nodeName}, ip=${pod.status.hostIP}, status=${pod.status.phase}, t=${pod.status.startTime}`);
          const data : PodData = {
            metadata: {
              name: pod.metadata.name || '',
              namespace: pod.metadata.namespace || '',
            },
            spec: {
              nodeName: pod.spec.nodeName || '',
            },
            status: {
              hostIP: pod.status.hostIP || '',
              phase: pod.status.phase || '',
              startTime: '',
            },
          };
          podData.push(data);
        });
        console.log(`And all together : ${podData}`);
        setData(podData);
    });
    window.electron.ipcRenderer.sendMessage('get-pod');
    //setData(dataq);

  }, []);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <div className="MainPane"><MaterialReactTable table={table} layoutMode="grid" /></div>;
};

export default MainPane2;

