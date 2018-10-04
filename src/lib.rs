extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use js_sys::{ArrayBuffer, Uint8Array};
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::console::{log_1, log_2};
use web_sys::{BinaryType, MessageEvent, WebSocket};

#[wasm_bindgen]
pub struct WS {
    ws: Rc<WebSocket>,
    onopen: Closure<FnMut(JsValue)>,
    onclose: Closure<FnMut(JsValue)>,
    onmessage: Closure<FnMut(MessageEvent)>,
    onerror: Closure<FnMut(JsValue)>,
}

#[wasm_bindgen]
impl WS {
    pub fn send(&self, data: &str) -> Result<(), JsValue> {
        return self.ws.send_with_str(data);
    }
}

#[wasm_bindgen(js_name=startRtm)]
pub fn start_rtm(ws_url: &str) -> WS {
    let ws = Rc::new(WebSocket::new(ws_url).unwrap());
    ws.set_binary_type(BinaryType::Arraybuffer);

    let openWs = ws.clone();
    let onopen = Closure::wrap(Box::new(move |_| {
        log_1(&"open".into());
        openWs.send_with_str("Hello");
        let mut data = [111u8, 222u8, 13u8];
        openWs.send_with_u8_array(&mut data);
    }) as Box<FnMut(JsValue)>);
    let onclose = Closure::wrap(Box::new(|_| {
        log_1(&"close".into());
    }) as Box<FnMut(JsValue)>);
    let onmessage = Closure::wrap(Box::new(|event: MessageEvent| {
        let data = event.data();
        match data.dyn_into::<ArrayBuffer>() {
            Ok(buffer) => {
                log_1(&"binary message:".into());
                // TODO: convert buffer to &[u8] when https://github.com/rustwasm/wasm-bindgen/pull/918 is merged
                let array = Uint8Array::new(buffer.as_ref());
                array.for_each(&mut |n: u8, _: u32, _: Uint8Array| log_1(&n.into()));
            }
            Err(data) => match data.as_string() {
                Some(text) => log_2(&"text message:".into(), &text.into()),
                _ => log_1(&"other type of message (which is impossible)".into()),
            },
        }
    }) as Box<FnMut(MessageEvent)>);
    let onerror = Closure::wrap(Box::new(|_| {
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
