/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {registerKernel, TensorInfo} from '../../kernel_registry';
import {MathBackendWebGL} from './backend_webgl';
import {SQUARE, UnaryOpProgram} from './unaryop_gpu';

interface SquareInputs {
  x: TensorInfo;
}

registerKernel({
  kernelName: 'Square',
  backendName: 'webgl',
  kernelFunc: ({inputs, backend, save}) => {
    const {x} = inputs as {} as SquareInputs;
    const webglBackend = backend as MathBackendWebGL;

    // Save it for the gradient.
    save([x]);
    const program = new UnaryOpProgram(x.shape, SQUARE);
    return webglBackend.runWebGLProgram(program, [x], x.dtype);
  }
});