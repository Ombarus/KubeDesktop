import k8s = require('@kubernetes/client-node');
import log from 'electron-log';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export const GetPod = async () => {
  try {
    const podRes = await k8sApi.listNamespacedPod('default');
    // api.listPodForAllNamespaces()
    log.debug('Pod: ', podRes.body);
    return podRes.body.items;
  } catch (err) {
    log.warn(err);
  }
  return [];
};

