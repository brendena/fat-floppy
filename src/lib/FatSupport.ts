export function toHexString(byteArray : any) {
    return "0x" + Array.from(byteArray, function(byte :any) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2).toUpperCase();
    }).join('')
  }

export function littleEndianToNumber(byteArray : any)
{
    let index = 0;
    return byteArray.reduce((p:number,c:number)=>{
        //console.log(c)
        let r = p + (c << (index * 8));
        index++;
        return r;
    },0);
}

/*
date - year,month,day
time - hours-minutes-(seconds in 2 second chunks)
seconds - 0-2 seconds  in 10 millisecond incriments
*/
export function generateDate(date:number,time:number, seconds:number){

    let year = 1980 + ((date & 0xf000) >> 12);
    let month = ((date & 0b11110000) >> 4) % 13;
    let day = (date & 0b1111);
  
    let hours = ((time & 0xf000) >> 12) %24;
    let minutes = ((time & 0b11110000) >> 4) % 60;
    let second = (date & 0b1111) * 2 
  
    let jsDate = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      second
    );
    return jsDate;
}

export function U8ToString(buff:Uint8Array){
  return new TextDecoder().decode(buff);
}

export const ATTR_READ_ONLY = 0x1;
export const ATTR_HIDDEN = 0x2;
export const ATTR_SYSTEM = 0x4;
export const ATTR_VOLUME_ID = 0x8
export const ATTR_DIRECTORY = 0x10;
export const ATTR_ARCHIVE = 0x20;
export const ATTR_LONG_FILE_NAME = 0xF;
  
