import { startRtm } from "wasm-ws-demo";

(async function() {
    let ws = startRtm('wss://echo.websocket.org');
    console.log(ws);
    setInterval(() => {
        ws.send(`${Math.random()}`);
    }, 1000);
})();

