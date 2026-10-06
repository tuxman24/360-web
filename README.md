# 360 Web

Experimental local-first Xbox 360 emulation environment for modern browsers.

**Milestone 1:** browser/runtime shell. It does not emulate Xbox 360 games yet.

## Included
- Local `.iso`, `.xex`, `.god`, `.bin` file picker
- XEX2 magic detection and basic file inspection
- WebGPU, WebAssembly, Gamepad, IndexedDB and SharedArrayBuffer capability checks
- 16:9 render surface and runtime console
- Clean emulator-core interface for future WASM integration
- ROM/game files ignored by Git

## Run
From this folder:

    python3 -m http.server 8080

Then open http://localhost:8080

## Legal
No games, firmware, encryption keys, or Microsoft system files are included. Use only software you are legally entitled to use.

## Roadmap
1. Browser/runtime shell
2. XEX/container parsing
3. Guest memory model
4. Xenon PowerPC interpreter
5. Kernel/HLE services
6. Xenos command translation to WebGPU
7. Audio, input and saves
8. Compatibility work
