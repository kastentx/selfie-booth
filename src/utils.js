import * as tf from '@tensorflow/tfjs'

const MODEL_PATH = 'https://raw.githubusercontent.com/kastentx/tfjs-conversion/master/second-try/tensorflowjs_model.pb'
const WEIGHTS_PATH = 'https://raw.githubusercontent.com/kastentx/tfjs-conversion/master/second-try/weights_manifest.json'

export const MAX_SIZE = 513
export const OBJ_LIST = ['background', 'airplane', 'bicycle', 'bird', 'boat', 
'bottle', 'bus', 'car', 'cat', 'chair', 'cow', 'dining table', 
'dog', 'horse', 'motorbike', 'person', 'potted plant', 'sheep', 
'sofa', 'train', 'tv']

let objMap = {} 
OBJ_LIST.forEach((x,i)=> objMap[x]=i)
export const OBJ_MAP = objMap



export const loadTFJSModel = () => tf.loadFrozenModel(MODEL_PATH, WEIGHTS_PATH)

export const cleanTFJSResponse = modelOutput => {
  const objIDs = [...new Set(modelOutput)] // eslint-disable-next-line
  const objPixels = modelOutput.reduce((a, b) => (a[OBJ_LIST[b]] = ++a[OBJ_LIST[b]] || 1, a), {})
  const objTypes = objIDs.map(x => OBJ_LIST[x])
  return {
    objectTypes: objTypes,
    objectIDs: objIDs,
    objectPixels: objPixels,
    flatSegMap: modelOutput
  }
}

export const getScaledSize = ({ height, width }) => {
  if (width > height) {
    return {
      scaledWidth: MAX_SIZE,
      scaledHeight: Math.round((height / width) * MAX_SIZE)
    }
  } else {
    return {
      scaledWidth: Math.round((width / height) * MAX_SIZE),
      scaledHeight: MAX_SIZE
    }
  }
}