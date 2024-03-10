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


const LeftPane = () => {
    return <div className="LeftPane"><Loading /></div>;
};

export default LeftPane;

