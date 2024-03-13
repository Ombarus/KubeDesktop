import k8s = require('@kubernetes/client-node');
import { ipcMain } from 'electron';
import log from 'electron-log';
import { sendRenderer } from '../main';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
let currentContext = kc.getCurrentContext();

let k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const GetPod = async () => {
  try {
    kc.setCurrentContext(currentContext);
    k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const podRes = await k8sApi.listNamespacedPod('default');

    return podRes.body.items;
  } catch (err) {
    log.warn(err);
  }
  return [];
};

// [
//   { cluster: 'dex', name: 'aus1hub1', user: 'gbouvier-dex' },
//   { cluster: 'aus1mon1', name: 'aus1mon1', user: 'gbouvier-dex' },
//   { cluster: 'aus1p1', name: 'aus1p1', user: 'gbouvier-dex' },
//   { cluster: 'aus1p10', name: 'aus1p10', user: 'gbouvier-dex' },
// ]
export const GetContexts = () => {
  try {
    return kc.getContexts();
  } catch (err) {
    log.warn(err);
  }
  return [];
};

export const GetActiveContext = () => {
  return currentContext;
};

export const SetActiveContext = (contextName: string) => {
  if (contextName && contextName !== currentContext) {
    log.debug(`Set Context to ${contextName}`);
    currentContext = contextName;
    sendRenderer('set-context', currentContext);
  }
};

export const GetAPIResources = async () => {
  try {
    kc.setCurrentContext(currentContext);
    k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const resources: V1APIResourceList = await k8sApi.getAPIResources();
    return resources.body.resources;
    //resources.body.resources.forEach( r => {
    //  log.debug(`R ============> ${r}`);
    //});

  } catch (err) {
    log.warn(err);
  }
  return [];
};
