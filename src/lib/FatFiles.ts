import {littleEndianToNumber, generateDate, ATTR_VOLUME_ID, U8ToString} from "./FatSupport"

export class FatFiles{
    constructor(buffer : any){
      if(buffer.length < 32)
      { 

        return;
      }
      this.name = U8ToString(buffer.slice(0,8));
      this.ext = U8ToString(buffer.slice(8,11));
      this.creationDate = generateDate(
        littleEndianToNumber(buffer.slice(16,18)),
        littleEndianToNumber(buffer.slice(14,16)),
        buffer[13]
      );
      this.lastAccessDate = generateDate(
        littleEndianToNumber(buffer.slice(18,20)),
        0,
        0,
      );
      this.writeDate = generateDate(
        littleEndianToNumber(buffer.slice(24,26)),
        littleEndianToNumber(buffer.slice(22,24)),
        0,
      );
      
      this.startCluster = littleEndianToNumber(buffer.slice(26,28));
      this.size = littleEndianToNumber(buffer.slice(28,32));
  
    }
    name: string  = ""         //size 8
    ext: string   = ""              //size 3
    attrs: number = 0             //size 1
    ntRes: number = 0             //size 1
    //createTimeFine: number    //size 1 
    //creationTime: number     //size 2
    //creationData: number     //size 2
    creationDate: Date = new Date()
    //lastAccessData: number     //size 2
    lastAccessDate: Date = new Date()
    highStartCluster: number =0  //size 2
  
    //writeTime: number         //size 2
    //writeDate: number         //size 2
    writeDate: Date = new Date()
  
    startCluster: number  = 0      //size 2
    size: number = 0               //size 4
    
    isValid(){
      let valid = true;
      if(this.size == 0 && 
         (this.attrs & ATTR_VOLUME_ID) == 0)
      {
        valid = false;
      }
  
      return valid;
    }
  
    print(){
      var month = this.creationDate.getUTCMonth() + 1; //months from 1-12
      var day = this.creationDate.getUTCDate();
      var year = this.creationDate.getUTCFullYear();
      console.log(this.name + this.ext + " - " + this.size + " created " + year + "/" + month + "/" + day);
    }
}
