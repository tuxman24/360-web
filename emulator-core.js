/** Stable boundary between the browser shell and a future WASM Xbox 360 core. */
export class EmulatorCore {
  async initialize(options={}) { throw new Error('Xbox 360 emulation core not implemented yet'); }
  async loadGame(source) { throw new Error('Game execution is not implemented yet'); }
  runFrame() { throw new Error('CPU/GPU execution is not implemented yet'); }
  pause() {}
  reset() {}
}
