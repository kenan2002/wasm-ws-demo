/* tslint:disable */
import * as wasm from './wasm_ws_demo_bg';

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

export function __wbg_new_27723c26a045dd2c(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new WebSocket(varg0));
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __wbg_setonopen_050a501582e11d3f_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onopen').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onopen').set does not exist`);
};

const stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

export function __wbg_setonopen_050a501582e11d3f(arg0, arg1) {
    __wbg_setonopen_050a501582e11d3f_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonclose_66c81fce49a0f252_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set does not exist`);
};

export function __wbg_setonclose_66c81fce49a0f252(arg0, arg1) {
    __wbg_setonclose_66c81fce49a0f252_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonmessage_d96a30134b3d9611_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set does not exist`);
};

export function __wbg_setonmessage_d96a30134b3d9611(arg0, arg1) {
    __wbg_setonmessage_d96a30134b3d9611_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonerror_feed480a1aa8481f_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set does not exist`);
};

export function __wbg_setonerror_feed480a1aa8481f(arg0, arg1) {
    __wbg_setonerror_feed480a1aa8481f_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_close_7d848fc3e18292f7_target = WebSocket.prototype.close || function() {
    throw new Error(`wasm-bindgen: WebSocket.prototype.close does not exist`);
};

export function __wbg_close_7d848fc3e18292f7(arg0) {
    __wbg_close_7d848fc3e18292f7_target.call(getObject(arg0));
}

const __wbg_log_f57c568ecd16a171_target = console.log;

export function __wbg_log_f57c568ecd16a171(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_log_f57c568ecd16a171_target(varg0);
}

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}
/**
* @param {string} arg0
* @returns {WS}
*/
export function startRtm(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return WS.__wrap(wasm.startRtm(ptr0, len0));

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

}

function freeWS(ptr) {

    wasm.__wbg_ws_free(ptr);
}
/**
*/
export class WS {

    static __wrap(ptr) {
        const obj = Object.create(WS.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeWS(ptr);
    }
}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_cb_drop(i) {
    let obj = getObject(i).original;
    obj.a = obj.b = 0;
    dropRef(i);
}

export function __wbindgen_closure_wrapper2(ptr, f, _ignored) {
    let cb = function(arg0) {
        return this.f(this.a, addHeapObject(arg0));
    };
    cb.f = wasm.__wbg_function_table.get(f);
    cb.a = ptr;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

