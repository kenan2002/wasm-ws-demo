import { startRtm } from "wasm-ws-demo";

(async function() {
    let ws = startRtm('wss://rtm.bearychat.com/nimbus/ws:131c822e3c42f31b3cedcb86db2f39ce');
    console.log(ws);
})();

