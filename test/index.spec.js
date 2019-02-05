// importamos la funcion que vamos a testear
import { loginCall } from "../src/lib/index.js";

describe('loginCall', () => {
  it('debería ser una función', () => {
    expect(typeof loginCall).toBe('function');
  });
});
