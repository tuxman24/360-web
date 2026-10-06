const input=document.querySelector('#gameInput');
const log=document.querySelector('#log');
const library=document.querySelector('#library');
const status=document.querySelector('#status');
const write=m=>{log.textContent+='\n'+m;log.scrollTop=log.scrollHeight};
const caps=[['WebAssembly',typeof WebAssembly!=='undefined'],['WebGPU','gpu' in navigator],['Gamepad API','getGamepads' in navigator],['IndexedDB','indexedDB' in window],['SharedArrayBuffer',typeof SharedArrayBuffer!=='undefined']];
document.querySelector('#caps').innerHTML=caps.map(([n,v])=>`<div class="cap"><span>${n}</span><b class="${v?'yes':'no'}">${v?'AVAILABLE':'UNAVAILABLE'}</b></div>`).join('');
for(const id of ['addGame','heroAdd']) document.querySelector('#'+id).onclick=()=>input.click();
document.querySelector('#fullscreen').onclick=()=>document.documentElement.requestFullscreen?.();
input.onchange=async()=>{const f=input.files?.[0];if(!f)return;status.textContent='INSPECTING';write(`Selected: ${f.name} (${formatBytes(f.size)})`);const head=new Uint8Array(await f.slice(0,0x1000).arrayBuffer());const kind=inspect(f.name,head);write(`Detected: ${kind}`);library.className='';library.innerHTML=`<div class="game"><div><strong>${escapeHtml(f.name)}</strong><small>${kind} · ${formatBytes(f.size)} · local file</small></div><span class="yes">Loaded</span></div>`;status.textContent='FILE READY'};
function inspect(name,b){const n=name.toLowerCase();if(n.endsWith('.xex')||(b[0]===0x58&&b[1]===0x45&&b[2]===0x58&&b[3]===0x32))return'Xbox 360 XEX2 executable';if(n.endsWith('.iso'))return'Optical-disc image (ISO)';if(n.endsWith('.god'))return'Games on Demand container';return'Unknown/binary image'}
function formatBytes(n){if(!n)return'0 B';const u=['B','KB','MB','GB','TB'],i=Math.min(Math.floor(Math.log(n)/Math.log(1024)),u.length-1);return`${(n/1024**i).toFixed(i?2:0)} ${u[i]}`}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
window.addEventListener('gamepadconnected',e=>write(`Controller connected: ${e.gamepad.id}`));
(async()=>{if('gpu'in navigator){try{const a=await navigator.gpu.requestAdapter();write(a?'WebGPU adapter initialized.':'WebGPU: no adapter available.')}catch(e){write('WebGPU init failed: '+e.message)}}write('WASM core boundary ready for integration.')})();
