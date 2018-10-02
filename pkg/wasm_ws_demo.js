/* tslint:disable */
import * as wasm from './wasm_ws_demo_bg';

let cachedEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

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

const __widl_f_log_1__target = console.log;

const stack = [];

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

export function __widl_f_log_1_(arg0) {
    __widl_f_log_1__target(getObject(arg0));
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __widl_f_new_WebSocket(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new WebSocket(varg0));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_set_onopen_WebSocket_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onopen').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onopen').set does not exist`);
};

export function __widl_f_set_onopen_WebSocket(arg0, arg1) {
    __widl_f_set_onopen_WebSocket_target.call(getObject(arg0), getObject(arg1));
}

const __widl_f_set_onerror_WebSocket_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set does not exist`);
};

export function __widl_f_set_onerror_WebSocket(arg0, arg1) {
    __widl_f_set_onerror_WebSocket_target.call(getObject(arg0), getObject(arg1));
}

const __widl_f_set_onclose_WebSocket_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set does not exist`);
};

export function __widl_f_set_onclose_WebSocket(arg0, arg1) {
    __widl_f_set_onclose_WebSocket_target.call(getObject(arg0), getObject(arg1));
}

const __widl_f_set_onmessage_WebSocket_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set does not exist`);
};

export function __widl_f_set_onmessage_WebSocket(arg0, arg1) {
    __widl_f_set_onmessage_WebSocket_target.call(getObject(arg0), getObject(arg1));
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

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_cb_drop(i) {
    let obj = getObject(i).original;
    obj.a = obj.b = 0;
    dropRef(i);
}

export function __wbindgen_closure_wrapper2(ptr, f, _ignored) {
    let cb = function() {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a);

        } finally {
            this.a = a;

        }

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

