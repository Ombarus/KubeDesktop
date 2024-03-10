import { useEffect, useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import Loading from './Loading';


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
    startTime: Date;
  };
}


const MainPane2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [podList, setpodList] = useState<PodData[]>([]);
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
  console.log(`Before ReactTable podList = ${podList}`);
  const table = useMaterialReactTable({
    columns,
    podList
  });
  //useEffect(() => {
  //    window.electron.ipcRenderer.once('get-pod', (arg) => {
  //        // TODO: handle error when failed to auth/reach k8s
  //        var data: PodData[] = [];
  //        console.log(`Received arg: ${arg}`);
  //        arg.items.forEach(row => {
  //          console.log(`Reading properties of ${row}`);
  //          var entry: PodData = {
  //            metadata: {
  //              name: row.metadata.name,
  //              namespace: row.metadata.namespace,
  //            },
  //            spec: {
  //              nodeName: row.spec.nodeName,
  //            },
  //            status: {
  //              hostIP: row.status.hostIP,
  //              phase: row.status.phase,
  //              startTime: row.status.startTime,
  //            }
  //          };
  //          data.push(entry);
  //        });
  //        setpodList(data);
  //        setIsLoading(false);
  //    });
  //    window.electron.ipcRenderer.sendMessage('get-pod', ['ping']);
  //}, []);
  //if (isLoading) {
  //  console.log(`Laoding===> ${podList}`);
  //  return <div className="MainPane"><Loading /></div>;
  //} else {
    console.log(`tabble==> ${podList}`);
    return <div className="MainPane"><MaterialReactTable table={table} layoutMode="grid" /></div>;
  //}
};

export default MainPane2;

