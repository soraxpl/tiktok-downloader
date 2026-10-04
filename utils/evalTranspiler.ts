import type BeautifulDom from 'beautiful-dom';
import vm from 'vm';
import { getDom } from './getDom';
import {isCodeContainError} from './isCodeContainError';

export function evalTranspiler(obfsCode: string): BeautifulDom {
  let capturedCode: string[] = [];

  const sandbox: {
    [key: string]: any;
    eval: (code: string) => string;
    setTimeout: (code: string) => string;
    setInterval: (code: string) => string;
  } = {
    eval: (code: string) => {
      capturedCode.push(code);
      return code;
    },
    setTimeout: (code: string) => {
      capturedCode.push(code);
      return code;
    },
    setInterval: (code: string) => {
      capturedCode.push(code);
      return code;
    },
  };

  sandbox.Function = function (...args: string[]) {
    const code = args.join(', ');
    capturedCode.push(code);
    return function () {};
  };

  const context = vm.createContext(sandbox);

  try {
    vm.runInContext(obfsCode, context, { timeout: 15000 });
  } catch (error) {
    console.error(`Error executing code: ${(error as Error).message}`);
  }

  const finalCode = capturedCode.join('\n');

  const isError = isCodeContainError(finalCode);
  if (isError) {
    throw new Error(isError);
  }

  const finalDom = getDom(finalCode);

  if (!finalDom) {
    throw new Error('Error: Invalid URL!');
  }

  return finalDom;
}
