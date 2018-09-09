/* tslint:disable */
import * as wasm from './wasm_tutorial_bg';

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

export function __wbg_new_d4e88827cd64d9e0(arg0, arg1) {
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

const __wbg_setonopen_21702c07a152e877_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onopen').set || function() {
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

export function __wbg_setonopen_21702c07a152e877(arg0, arg1) {
    __wbg_setonopen_21702c07a152e877_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonclose_73e852073dba413d_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onclose').set does not exist`);
};

export function __wbg_setonclose_73e852073dba413d(arg0, arg1) {
    __wbg_setonclose_73e852073dba413d_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonmessage_b871c81db0151e1d_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onmessage').set does not exist`);
};

export function __wbg_setonmessage_b871c81db0151e1d(arg0, arg1) {
    __wbg_setonmessage_b871c81db0151e1d_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_setonerror_6824ea8d8d8e7564_target = GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(WebSocket.prototype, 'onerror').set does not exist`);
};

export function __wbg_setonerror_6824ea8d8d8e7564(arg0, arg1) {
    __wbg_setonerror_6824ea8d8d8e7564_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_close_ac67a2cfecd83758_target = WebSocket.prototype.close || function() {
    throw new Error(`wasm-bindgen: WebSocket.prototype.close does not exist`);
};

export function __wbg_close_ac67a2cfecd83758(arg0) {
    __wbg_close_ac67a2cfecd83758_target.call(getObject(arg0));
}

const __wbg_log_57aa2e65b7e4067a_target = console.log;

export function __wbg_log_57aa2e65b7e4067a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_log_57aa2e65b7e4067a_target(varg0);
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
        return WS.__construct(wasm.startRtm(ptr0, len0));
        
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
    
    static __construct(ptr) {
        return new WS(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
        
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

export function __wbindgen_closure_wrapper2(ptr, f) {
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

