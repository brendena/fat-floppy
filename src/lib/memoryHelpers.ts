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

export function memcpyStringPadded(dst : Uint8Array, dstOffset: number, src:String, size: number)
{
    memset(dst,dstOffset,0x20,size);
    memcpyString(dst,dstOffset,src);
}

export function memcpyNumber(_dst : Uint8Array, dstOffset: number, num:number, size:number) {
    let data = new Uint8Array(new Int32Array([num]).buffer)
    
    for(let i =0; i < size;i++)
    {
        _dst[i + dstOffset] = data[i];
    }
}

export function memset(dst: Uint8Array, dstOffset: number, value:number, size: number)
{
    for(let i =0; i < size; i++)
    {
        dst[dstOffset] = value;
        dstOffset++; 
    }
}

