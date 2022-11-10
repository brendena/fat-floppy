import {FatReservedSection} from "./FatRerveredSection"
import { FatTable } from "./FatTable";
import { FatFiles } from "./FatFiles";

export class Fat12FileSystem{
    constructor(buffer : Uint8Array){
        if(buffer.length < 2048)
        {
          console.log("something probably wrong with your input buffer")
          return;
        }
        //parse the reserve section
        this.rSection = new FatReservedSection(buffer);
        if(this.rSection.bpb_bytesPerSector != 512){
          console.log("something wrong? the bytes per sector is not 512")
          return;
        }
  
        //grab the fat sections
        for(let i =0; i < this.rSection.bpb_numFats; i++){
          let startPosition = (i * this.rSection.numBytesFatTable()) + this.rSection.bpb_bytesPerSector;
          //console.log(this.rSection.numBytesFatTable())
      
          this.fTables.push(new FatTable(buffer.slice(startPosition, startPosition + this.rSection.numBytesFatTable())))
          
        }
        //console.log(this.rSection.bpb_rootEntCnt);
        //directory
        let dirStartPosition = (this.rSection.bpb_numFats * this.rSection.numBytesFatTable()) + this.rSection.bpb_bytesPerSector;
        //console.log(dirStartPosition)
        
        for(let i=0; i < this.rSection.bpb_rootEntCnt ; i++){
          let slicePosition = dirStartPosition + i * 32;
          let fatF = new FatFiles(buffer.slice(slicePosition, slicePosition + 32));
          if(fatF.isValid())
          {
            this.rootDir.push(fatF);
          }
        }

        //grab the data section
        let dataStartPosition = dirStartPosition + this.rSection.bpb_rootEntCnt * 32;
        this.dataSection = buffer.slice(dataStartPosition, buffer.length - dataStartPosition);
        //this.rootDir.forEach((dir)=>{dir.print()})
        
    }
    rSection = new FatReservedSection([]);;
    fTables : Array<FatTable> = [];
    rootDir : Array<FatFiles> = [];
    dataSection  = new Uint8Array(0)  
  }