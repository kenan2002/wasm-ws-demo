extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::WebSocket;
use web_sys::console::log_1;

#[wasm_bindgen]
pub struct WS {
    ws: WebSocket,
    onopen: Closure<FnMut(JsValue)>,
    onclose: Closure<FnMut(JsValue)>,
    onmessage: Closure<FnMut(JsValue)>,
    onerror: Closure<FnMut(JsValue)>,
}

#[wasm_bindgen(js_name=startRtm)]
pub fn start_rtm(ws_url: &str) -> WS {
    let ws = WebSocket::new(ws_url).unwrap();
    let onopen = Closure::wrap(Box::new(move |_| {
        log_1(&"open".into());
    }) as Box<FnMut(JsValue)>);
    let onclose = Closure::wrap(Box::new(move |_| {
        log_1(&"close".into());
    }) as Box<FnMut(JsValue)>);
    let onmessage = Closure::wrap(Box::new(move |_| {
        log_1(&"message".into());
    }) as Box<FnMut(JsValue)>);
    let onerror = Closure::wrap(Box::new(move |_| {
        log_1(&"error".into());
    }) as Box<FnMut(JsValue)>);
    ws.set_onopen(Some(onopen.as_ref().unchecked_ref()));
    ws.set_onclose(Some(onclose.as_ref().unchecked_ref()));
    ws.set_onmessage(Some(onmessage.as_ref().unchecked_ref()));
    ws.set_onerror(Some(onerror.as_ref().unchecked_ref()));

    return WS {
        ws,
        onopen,
        onclose,
        onmessage,
        onerror,
    };
}
