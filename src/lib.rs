extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::WebSocket;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

#[wasm_bindgen]
pub struct WS {
    ws: WebSocket,
    onopen: Closure<FnMut()>,
    onclose: Closure<FnMut()>,
    onmessage: Closure<FnMut()>,
    onerror: Closure<FnMut()>,
}

#[wasm_bindgen(js_name=startRtm)]
pub fn start_rtm(ws_url: &str) -> WS {
    let ws = WebSocket::new(ws_url).unwrap();
    let onopen = Closure::wrap(Box::new(move || {
        log("open");
    }) as Box<FnMut()>);
    let onclose = Closure::wrap(Box::new(move || {
        log("close");
    }) as Box<FnMut()>);
    let onmessage = Closure::wrap(Box::new(move || {
        log("message");
    }) as Box<FnMut()>);
    let onerror = Closure::wrap(Box::new(move || {
        log("error");
    }) as Box<FnMut()>);
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
