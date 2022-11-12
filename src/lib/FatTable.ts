export const FAT_END_FILE = 0xfff 


export class FatTable{
    constructor(buffer : Uint8Array){
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
    clusterUsed(){
      let usedClusters = this.a.reduce((prev:number,cur:number)=>{
        return (cur !== 0 )? prev + 1 : prev;
      },0);

      //Minus 2 becuase of the first don't refer to the data cluster
      return usedClusters - 2;
    }

    firstFreeSector(){
      let ret = 0;
      for(let i =0; i < this.a.length; i++){
        if(this.a[i] == 0){
          ret = i;
          break;
        }
      }
      return ret;
    }

    allocateFirstFreeSector(){
      let freeSector = this.firstFreeSector();
      this.a[freeSector] = FAT_END_FILE;
      return freeSector;
    }

    a : Array<number> = []
}