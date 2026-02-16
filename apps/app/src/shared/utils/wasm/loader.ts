import init, * as wasmExports from './pkg/src_wasm';


export class WasmUtils {
  private isInitialized = false;

  public async loadWasm() {
    if (!this.isInitialized) {
      await init();
      this.isInitialized = true;
    }
    return wasmExports;
  }

  public getInitStatus() {
    return this.isInitialized;
  }
}
