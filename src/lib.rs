extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub type WebSocket;
    #[wasm_bindgen(constructor)]
    fn new(url: &str) -> WebSocket;

    #[wasm_bindgen(method, setter)]
    fn set_onopen(this: &WebSocket, onopen: &Closure<Fn(JsValue)>);

    #[wasm_bindgen(method, setter)]
    fn set_onclose(this: &WebSocket, onopen: &Closure<Fn(JsValue)>);

    #[wasm_bindgen(method, setter)]
    fn set_onmessage(this: &WebSocket, onopen: &Closure<Fn(JsValue)>);

    #[wasm_bindgen(method, setter)]
    fn set_onerror(this: &WebSocket, onopen: &Closure<Fn(JsValue)>);

    #[wasm_bindgen(method)]
    fn close(this: &WebSocket);

    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);

    fn setInterval(closure: &Closure<FnMut()>, millis: u32) -> f64;
    fn cancelInterval(token: f64);
}

#[wasm_bindgen]
pub struct WS {
    ws: WebSocket,
    open_closure: Closure<Fn(JsValue)>,
    close_closure: Closure<Fn(JsValue)>,
    message_closure: Closure<Fn(JsValue)>,
    error_closure: Closure<Fn(JsValue)>,
}

impl WS {
    pub fn new<FOPEN: 'static, FCLOSE: 'static, FMESSAGE: 'static, FERROR: 'static>(
        ws_url: &str,
        on_open: FOPEN,
        on_close: FCLOSE,
        on_message: FMESSAGE,
        on_error: FERROR,
    ) -> WS
    where FOPEN: Fn(JsValue), FCLOSE: Fn(JsValue), FMESSAGE: Fn(JsValue), FERROR: Fn(JsValue)
    {
        let ws = WebSocket::new(ws_url);

        let open_closure = Closure::new(on_open);
        ws.set_onopen(&open_closure);

        let close_closure = Closure::new(on_close);
        ws.set_onclose(&close_closure);

        let message_closure = Closure::new(on_message);
        ws.set_onmessage(&message_closure);

        let error_closure = Closure::new(on_error);
        ws.set_onerror(&error_closure);

        WS {ws, open_closure, close_closure, message_closure, error_closure}
    }
}

impl Drop for WS {
    fn drop(&mut self) {
        self.ws.close();
    }
}

#[wasm_bindgen(js_name=startRtm)]
pub fn start_rtm(ws_url: &str) -> WS {
    WS::new(
        ws_url,
        |_| {log("ws open")},
        |_| {log("ws close")},
        |_| {log("ws message")},
        |_| {log("ws error")},
    )
}
