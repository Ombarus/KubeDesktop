import { useEffect, useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import Loading from './Loading';

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
    state: {
      showProgressBars: isRefreshing,
    }
  });

  return <div className="ResourcePane"><MaterialReactTable table={table} layoutMode="grid" /></div>;
};

export default ResourcePane;

