export function memcpySplice (_dst : Uint8Array, dstOffset: number, _src:Uint8Array, srcOffset: number,numberBytes:number) {
    
    for(let i =srcOffset; i < (srcOffset + numberBytes);i++)
    {
        _dst[i + dstOffset] = _src[i];
    }
}

export function memcpy (_src : Uint8Array, srcOffset: number, _dst:Uint8Array) {
    for(let i =0; i < _dst.length;i++)
    {
        _src[i + srcOffset] = _dst[i];
    }
}

export function memcpyString(_src : Uint8Array, srcOffset: number, _dst:String) {
    for(let i =0; i < _dst.length;i++)
    {
        _src[i + srcOffset] = _dst.charCodeAt(i);
    }
}
export function memcpyNumber(_dst : Uint8Array, dstOffset: number, num:number, size:number) {
    let data = new Uint8Array(new Int32Array([num]).buffer)
    
    for(let i =0; i < size;i++)
    {
        _dst[i + dstOffset] = data[i];
    }
}

