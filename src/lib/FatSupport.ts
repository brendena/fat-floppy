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

export const FAT_UNDEFINED_DATE = new Date(0,0,0,0,0,0);
/*
date - year,month,day
time - hours-minutes-(seconds in 2 second chunks)
seconds - 0-2 seconds  in 10 millisecond incriments
*/
export function generateDate(date:number,time:number, seconds:number){
    if(date == 0 && time == 0 && seconds == 0){
      return FAT_UNDEFINED_DATE;
    }

    let year = 1980 + ((date >> 9));
    
    let month = ((date & 0b111100000) >> 5) % 13;
    
    let day = (date & 0b11111);

    let hours = ((time >> 11) %24);
    let minutes = ((time & 0b11111100000) >> 5) % 60;
    let second = (date & 0b1111) * 2 
  
    console.log(minutes)

    let jsDate = new Date(
      year,
      month -1,//it seems that month is 0 indexed??
      day,
      hours,
      minutes,
      second
    );
    return jsDate;
}


export function grabFat12Date(date:Date){
  if(date === FAT_UNDEFINED_DATE){
    return 0;
  }

  return ((date.getFullYear() - 1980) << 9) + ((date.getMonth()+1) << 5) + date.getDate();
}
export function grabFat12Time(date:Date){
  if(date === FAT_UNDEFINED_DATE)
  {
    return 0;
  }
  console.log(date)
  console.log(date.getMinutes())
  //console.log(date.getMinutes());
  return (date.getHours() << 11) + (date.getMinutes() << 5) + (Math.round(date.getSeconds()/2));
}
export function grabFat12SubSeconds(date:Date){
  return 0;
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
  
