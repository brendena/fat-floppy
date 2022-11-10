export const FAT_END_FILE = 0xfff 


export class FatTable{
    constructor(buffer : any){
      if(buffer.length == 0)
      {
        return;
      }
      if(buffer.length < 512 || buffer.length % 512 !== 0){
        console.error(buffer.length + " Fat Table needs to be at least one block size");
        return;
      }
      for(let i =0; i < buffer.length; i+=3){
        let firstSec  = buffer[i]   + ((buffer[i+1]&0x0f) << 8);
        let secondSec = ((buffer[i+1] & 0xf0) >> 4) + (buffer[i+2] << 4);
        this.a.push(firstSec);
        this.a.push(secondSec);
      }
  
    }
    a : Array<number> = []
}