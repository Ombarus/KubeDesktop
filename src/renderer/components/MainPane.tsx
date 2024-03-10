import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';


//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

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

//nested data is ok, see accessorKeys in ColumnDef below
//const data: PodData[] = [];

const MainPane = () => {
  const datap : PodData[] = [
  {
metadata: {
name: "a",
        namespace: "b",
          },
spec: {
nodeName: "c",
      },
status: {
hostIP: "d",
        phase: "e",
        startTime: "f",
        }
  }
  ];
  const [data, setData] = useState<PodData[]>(datap);
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
    //() => [
    //  {
    //    accessorKey: 'name.firstName', //access nested data with dot notation
    //    header: 'First Name',
    //    size: 200,
    //    minSize: 100,
    //    maxSize: 300,
    //    grow: true,
    //  },
    //  {
    //    accessorKey: 'name.lastName',
    //    header: 'Last Name',
    //    size: 150,
    //    grow: true,
    //  },
    //  {
    //    accessorKey: 'address', //normal accessorKey
    //    header: 'Address',
    //    size: 200,
    //  },
    //  {
    //    accessorKey: 'city',
    //    header: 'City',
    //    size: 150,
    //  },
    //  {
    //    accessorKey: 'state',
    //    header: 'State',
    //    size: 150,
    //  },
    //],
    //[],
  );
  useEffect(() => {
    console.log("Test");
    const dataq : PodData[] = [
  {
metadata: {
name: "aa",
        namespace: "bb",
          },
spec: {
nodeName: "cc",
      },
status: {
hostIP: "dd",
        phase: "ee",
        startTime: "ff",
        }
  }
  ];
    setData(dataq);

  }, []);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <div className="MainPane"><MaterialReactTable table={table} layoutMode="grid" /></div>;
};

export default MainPane;

