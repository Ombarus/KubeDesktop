import { useEffect, useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';
import { Box } from '@mui/material';


type ResourceData = {
  categories: Array,
  group: string,
  kind: string,
  name: string,
  namespaced: boolean,
  shortNames: Array,
  singularName: string,
  version: string,
};


const parseResources = (arg) => {
    const podResource : resourceData[] = [];
    Object.values(arg).forEach((res) => {
      const data : ResourceData = {
        categories: res.categories,
        group: res.group,
        kind: res.kind,
        name: res.name,
        namespaced: res.namespaced,
        shortNames: res.shortNames,
        singularName: res.singularName,
        version: res.version,
      };
      podResource.push(data);
    });
    return podResource;
}

const ResourcePane = () => {
  const [data, setData] = useState<ResourceData[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ResourceData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Resource',
        size: 200,
      },
    ],
    [],
  );
  const rowSelected = (row) => {
    console.log(`GB: ROW => ${JSON.stringify(row)}`);
    window.electron.ipcRenderer.sendMessage('get-resource', row.id as string);
    setRowSelection((prev) => ({[row.id]: !prev[row.id]}));
  };
  window.electron.ipcRenderer.on('set-context', async (arg) => {
    window.electron.ipcRenderer.once('get-api-resources', async (arg) => {
      let podResource = parseResources(arg);
      setData(podResource);
      setRefreshing(false);
    });
    setRefreshing(true);
    window.electron.ipcRenderer.sendMessage('get-api-resources');
  });
  useEffect(() => {
    let dataq = [];
    window.electron.ipcRenderer.once('get-api-resources', async (arg) => {
        let podResource = parseResources(arg);
        setData(podResource);
        setRefreshing(false);
    });
    setRefreshing(true);
    window.electron.ipcRenderer.sendMessage('get-api-resources');
  }, []);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: false,
    enableRowVirtualization: true,
    enableSelectAll: false,
    enableMultiRowSelection: false,
    getRowId: (row) => row.name,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => rowSelected(row),
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer',
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: {
      showProgressBars: isRefreshing,
      rowSelection,
    },
  });

  return (
      <MaterialReactTable table={table} />
  );
};

export default ResourcePane;

    //<Box className="ResourcePane" sx={{ overflow: 'scroll', display: 'flex', maxHeight:'500px' }}>
