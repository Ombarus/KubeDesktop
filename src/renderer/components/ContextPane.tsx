import { useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loading from './Loading';


const ContextPane = () => {
    const handleChange = (event: SelectChangeEvent) => {
        window.electron.ipcRenderer.sendMessage('set-context', event.target.value as string);
    };

    const [contextList, setContextList] = useState([]);
    const [currentContext, setCurrentContext] = useState("minikube");
    useEffect(() => {
      let dataq = [];
      window.electron.ipcRenderer.on('set-context', async (arg) => {
          console.log(`setCurrentContext ${arg}`);
          setCurrentContext(arg);
      })
      window.electron.ipcRenderer.once('get-contexts', async (arg) => {

          const contextData = [];
          Object.values(arg).forEach((context) => {
            const data = <MenuItem key={context.name} value={context.name}>{context.name}</MenuItem>;
            contextData.push(data);
          });
          setContextList(contextData);
      });
      window.electron.ipcRenderer.sendMessage('get-contexts');
    }, []);

    return (
      <Box className="ContextPane" sx={{ minWidth: 120, display: 'block' }}>
        <FormControl fullWidth>
          <InputLabel id="context-selector-label">Context</InputLabel>
          <Select
            labelId="context-selector-label"
            id="context-selector"
            value={currentContext}
            onChange={handleChange}
          >
            {contextList}
          </Select>
        </FormControl>
      </Box>
    );
};

export default ContextPane;

