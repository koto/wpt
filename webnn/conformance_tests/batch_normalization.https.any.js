// META: title=test WebNN API batchNormalization operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-batchnorm
// Normalize the values of the input tensor using Batch-Normalization.
//
// dictionary MLBatchNormalizationOptions {
//   MLOperand scale;
//   MLOperand bias;
//   [EnforceRange] unsigned long axis = 1;
//   double epsilon = 1e-5;
// };
//
// MLOperand batchNormalization(
//     MLOperand input, MLOperand mean, MLOperand, variance,
//     optional MLBatchNormalizationOptions options = {});


const getBatchNormPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 6, float16: 6};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const batchNormTests = [
  {
    'name':
        'batchNormalization float32 2D tensor (mean and variance are non-constant) default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        },
        'bnMean': {
          'data': [
            -7.814267635345459, -95.64129638671875, 38.15440368652344,
            -55.95203399658203, -87.86500549316406, -41.63645553588867
          ],
          'descriptor': {shape: [6], dataType: 'float32'}
        },
        'bnVariance': {
          'data': [
            60.31186294555664, 26.43260383605957, 53.275634765625,
            40.146121978759766, 59.41098403930664, 35.99981689453125
          ],
          'descriptor': {shape: [6], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -4.312741756439209,  31.068212509155273, -13.910240173339844,
            1.4459478855133057,  22.170541763305664, -6.407354354858398,
            -6.995829105377197,  18.583200454711914, -10.831125259399414,
            17.820920944213867,  16.2480411529541,   16.447195053100586,
            11.57226848602295,   1.8526301383972168, 5.306026458740234,
            24.145092010498047,  8.629376411437988,  -9.216986656188965,
            -0.1989477425813675, 34.203548431396484, -16.923160552978516,
            18.671411514282227,  2.5159497261047363, 4.921559810638428
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 2D constant tensor default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'},
          'constant': true
        },
        'bnMean': {
          'data': [
            -7.814267635345459, -95.64129638671875, 38.15440368652344,
            -55.95203399658203, -87.86500549316406, -41.63645553588867
          ],
          'descriptor': {shape: [6], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [
            60.31186294555664, 26.43260383605957, 53.275634765625,
            40.146121978759766, 59.41098403930664, 35.99981689453125
          ],
          'descriptor': {shape: [6], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -4.312741756439209,  31.068212509155273, -13.910240173339844,
            1.4459478855133057,  22.170541763305664, -6.407354354858398,
            -6.995829105377197,  18.583200454711914, -10.831125259399414,
            17.820920944213867,  16.2480411529541,   16.447195053100586,
            11.57226848602295,   1.8526301383972168, 5.306026458740234,
            24.145092010498047,  8.629376411437988,  -9.216986656188965,
            -0.1989477425813675, 34.203548431396484, -16.923160552978516,
            18.671411514282227,  2.5159497261047363, 4.921559810638428
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 2D tensor default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        },
        'bnMean': {
          'data': [
            -7.814267635345459, -95.64129638671875, 38.15440368652344,
            -55.95203399658203, -87.86500549316406, -41.63645553588867
          ],
          'descriptor': {shape: [6], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [
            60.31186294555664, 26.43260383605957, 53.275634765625,
            40.146121978759766, 59.41098403930664, 35.99981689453125
          ],
          'descriptor': {shape: [6], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -4.312741756439209,  31.068212509155273, -13.910240173339844,
            1.4459478855133057,  22.170541763305664, -6.407354354858398,
            -6.995829105377197,  18.583200454711914, -10.831125259399414,
            17.820920944213867,  16.2480411529541,   16.447195053100586,
            11.57226848602295,   1.8526301383972168, 5.306026458740234,
            24.145092010498047,  8.629376411437988,  -9.216986656188965,
            -0.1989477425813675, 34.203548431396484, -16.923160552978516,
            18.671411514282227,  2.5159497261047363, 4.921559810638428
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 3D tensor default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        },
        'bnMean': {
          'data': [12.810380935668945, 63.13715362548828, -61.62983322143555],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [18.358240127563477, 41.847232818603516, 16.12828254699707],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -12.630594253540039, 11.967890739440918,  -17.781383514404297,
            -13.910285949707031, 3.0739352703094482,  -22.139259338378906,
            -19.36661148071289,  -9.775517463684082,  5.161267280578613,
            29.53006935119629,   24.651947021484375,  29.550840377807617,
            16.161500930786133,  -23.088642120361328, 14.954023361206055,
            19.656957626342773,  -13.06058406829834,  -24.745210647583008,
            -11.206846237182617, 2.638929843902588,   -5.910898208618164,
            30.871898651123047,  -1.7038332223892212, 12.331327438354492
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D tensor default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -16.842504501342773, 2.2579827308654785,  -20.842041015625,
            -17.836172103881836, -1.7581257820129395, -19.30902862548828,
            -17.37898826599121,  -10.702629089355469, 6.4271392822265625,
            17.812623977661133,  15.533489227294922,  17.822328567504883,
            5.514280319213867,   -24.963077545166016, 4.576685905456543,
            8.228469848632812,   -12.989363670349121, -21.123029708862305,
            -11.698976516723633, -2.0609331130981445, 1.2540507316589355,
            18.43954849243164,   3.2196571826934814,  9.777103424072266
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 5D tensor default options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [6, 1, 1, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [35.4078254699707],
          'descriptor': {shape: [1], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [40.93109893798828],
          'descriptor': {shape: [1], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -11.990972518920898, 4.4829583168029785,  -15.440524101257324,
            -12.847999572753906, 7.442382335662842,   -18.051416397094727,
            -15.247910499572754, -5.550075531005859,  -11.927642822265625,
            3.369194269180298,   0.30708834528923035, 3.382232427597046,
            7.291474342346191,   -18.99486541748047,  6.4828104972839355,
            9.632428169250488,   -8.871702194213867,  -20.686368942260742,
            -6.99733304977417,   7.002535343170166,   -18.877885818481445,
            4.211489677429199,   -16.237018585205078, -7.42683744430542
          ],
          'descriptor': {shape: [6, 1, 1, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NCHW tensor options.axis=1',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {'options': {'axis': 1}}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -16.842504501342773, 2.2579827308654785,  -20.842041015625,
            -17.836172103881836, -1.7581257820129395, -19.30902862548828,
            -17.37898826599121,  -10.702629089355469, 6.4271392822265625,
            17.812623977661133,  15.533489227294922,  17.822328567504883,
            5.514280319213867,   -24.963077545166016, 4.576685905456543,
            8.228469848632812,   -12.989363670349121, -21.123029708862305,
            -11.698976516723633, -2.0609331130981445, 1.2540507316589355,
            18.43954849243164,   3.2196571826934814,  9.777103424072266
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NHWC tensor options.axis=3',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  83.02227020263672,    -40.90216064453125,
            64.08863830566406,   -80.08049011230469,   56.96306228637695,
            -63.376670837402344, -62.144378662109375,  37.37249755859375,
            -46.790367126464844, -0.10012771934270859, 57.046478271484375,
            82.05680084228516,   -21.35103988647461,   -85.36802673339844,
            -86.1164321899414,   -96.93824005126953,   62.35185241699219,
            76.8831787109375,    -9.359310150146484,   -68.4724349975586,
            97.03362274169922,   80.20824432373047,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {'options': {'axis': 3}}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -16.842504501342773, -1.7581257820129395, 6.4271392822265625,
            2.2579827308654785,  -19.30902862548828,  17.812623977661133,
            -20.842041015625,    -17.37898826599121,  15.533489227294922,
            -17.836172103881836, -10.702629089355469, 17.822328567504883,
            5.514280319213867,   -12.989363670349121, 1.2540507316589355,
            -24.963077545166016, -21.123029708862305, 18.43954849243164,
            4.576685905456543,   -11.698976516723633, 3.2196571826934814,
            8.228469848632812,   -2.0609331130981445, 9.777103424072266
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NCHW tensor options.scale',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnScale': {
          'data': [65.50171661376953, -71.007568359375, -5.569730758666992],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {'options': {'scale': 'bnScale'}}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -1103.212890625,     147.90174865722656,  -1365.189453125,
            -1168.2999267578125, 124.84024047851562,  1371.087158203125,
            1234.0396728515625,  759.9676513671875,   -35.79743576049805,
            -99.2115249633789,   -86.51734924316406,  -99.26557159423828,
            361.19482421875,     -1635.1243896484375, 299.78076171875,
            538.9788818359375,   922.3430786132812,   1499.89501953125,
            830.7158813476562,   146.3418426513672,   -6.984724998474121,
            -102.70331573486328, -17.9326229095459,   -54.455833435058594
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NCHW tensor options.bias',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnBias': {
          'data': [64.2044677734375, 75.28591918945312, -84.57243347167969],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {'options': {'bias': 'bnBias'}}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            47.36196517944336,  66.46244812011719,  43.3624267578125,
            46.36829376220703,  73.52779388427734,  55.976890563964844,
            57.90693283081055,  64.58329010009766,  -78.14529418945312,
            -66.75981140136719, -69.03894805908203, -66.75010681152344,
            69.71875,           39.241390228271484, 68.7811508178711,
            72.43293762207031,  62.29655456542969,  54.16288757324219,
            63.586944580078125, 73.22498321533203,  -83.3183822631836,
            -66.13288879394531, -81.35277557373047, -74.79533386230469
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NCHW tensor options.epsilon',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  64.08863830566406,    -63.376670837402344,
            -46.790367126464844, 83.02227020263672,    -80.08049011230469,
            -62.144378662109375, -0.10012771934270859, -40.90216064453125,
            56.96306228637695,   37.37249755859375,    57.046478271484375,
            82.05680084228516,   -86.1164321899414,    76.8831787109375,
            97.03362274169922,   -21.35103988647461,   -96.93824005126953,
            -9.359310150146484,  80.20824432373047,    -85.36802673339844,
            62.35185241699219,   -68.4724349975586,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {'options': {'epsilon': 0.000001}}
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -16.842506408691406, 2.2579832077026367,  -20.842044830322266,
            -17.8361759185791,   -1.758125901222229,  -19.309030532836914,
            -17.37898826599121,  -10.702629089355469, 6.427139759063721,
            17.812625885009766,  15.533490180969238,  17.822330474853516,
            5.514281272888184,   -24.96308135986328,  4.576686382293701,
            8.228470802307129,   -12.989363670349121, -21.123031616210938,
            -11.698976516723633, -2.0609331130981445, 1.254050850868225,
            18.43954849243164,   3.2196574211120605,  9.777103424072266
          ],
          'descriptor': {shape: [2, 3, 2, 2], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'batchNormalization float32 4D NHWC tensor all options',
    'graph': {
      'inputs': {
        'bnInput': {
          'data': [
            -41.30733108520508,  83.02227020263672,    -40.90216064453125,
            64.08863830566406,   -80.08049011230469,   56.96306228637695,
            -63.376670837402344, -62.144378662109375,  37.37249755859375,
            -46.790367126464844, -0.10012771934270859, 57.046478271484375,
            82.05680084228516,   -21.35103988647461,   -85.36802673339844,
            -86.1164321899414,   -96.93824005126953,   62.35185241699219,
            76.8831787109375,    -9.359310150146484,   -68.4724349975586,
            97.03362274169922,   80.20824432373047,    -12.10716724395752
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        },
        'bnMean': {
          'data': [51.629150390625, 99.36075592041016, -96.1473617553711],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnVariance': {
          'data': [30.448015213012695, 86.36219024658203, 73.88455200195312],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnScale': {
          'data': [65.50171661376953, -71.007568359375, -5.569730758666992],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        },
        'bnBias': {
          'data': [64.2044677734375, 75.28591918945312, -84.57243347167969],
          'descriptor': {shape: [3], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'batchNormalization',
        'arguments': [
          {'input': 'bnInput'}, {'mean': 'bnMean'}, {'variance': 'bnVariance'},
          {
            'options': {
              'scale': 'bnScale',
              'bias': 'bnBias',
              'axis': 3,
              'epsilon': 0.000001
            }
          }
        ],
        'outputs': 'bnOutput'
      }],
      'expectedOutputs': {
        'bnOutput': {
          'data': [
            -1039.0085734071204, 200.12613597546277, -120.36987167541395,
            212.10626540432202,  1446.3732126569944, -183.78396479879416,
            -1300.9852072279227, 1309.3257094058545, -171.08979404258523,
            -1104.0956031373803, 835.2536189871761,  -183.83801576309426,
            425.3993215144054,   997.6290832897452,  -91.55716013805052,
            -1570.920072497096,  1575.1810627320297, -187.2757593197739,
            363.98524710447384,  906.0018322105,     -102.5050592863526,
            603.1834043179756,   221.6277675074517,  -139.02827100419768
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  batchNormTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getBatchNormPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
