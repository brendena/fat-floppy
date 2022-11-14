import {FatReservedSection} from "./FatRerveredSection"
import { FatTable } from "./FatTable";
import { FatFiles } from "./FatFiles";
import { memcpySplice } from "./memoryHelpers";

export class Fat12FileSystem{
    constructor(buffer : Uint8Array){
        if(buffer.length === 0) return;
        if(buffer.length < 2048)
        {
          console.log("something probably wrong with your input buffer")
          return;
        }
        //parse the reserve section
        this.rSection = new FatReservedSection(buffer);
        if(this.rSection.bpb_bytesPerSector !== 512){
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
        let dirStartPosition = this.rSection.calculateDirOffset();
        console.log(this.rSection.bpb_rootEntCnt)
        
        for(let i=0; i < this.rSection.bpb_rootEntCnt ; i++){
          let slicePosition = dirStartPosition + i * 32;
          let fatF = new FatFiles(buffer.slice(slicePosition, slicePosition + 32));
          if(fatF.isValid())
          {
            this.rootDir.push(fatF);
          }
        }

        //grab the data section
        let dataStartPosition = this.rSection.calculateDataSection();
        this.dataSection = buffer.slice(dataStartPosition, buffer.length - dataStartPosition);
        //this.rootDir.forEach((dir)=>{dir.print()})
        console.log(this);
        
    }

    deleteFatFile(file:FatFiles)
    {
        let clusterSize = this.rSection.numBytesCluster();
        let clusterIndex = file.startCluster;
        for(let i =0; i < (Math.floor(file.size / clusterSize) + 1); i++)
        {
            console.log("clearing index " + clusterIndex)
            //clear the data from the cluster
            let startClusterByte = clusterSize * (clusterIndex - 2);
            for(let i =0; i < clusterSize; i++){
              this.dataSection[startClusterByte + i] = 0;
            }
            //clear previous fat
            let prevIndex = clusterIndex;
            clusterIndex = this.fTables[0].a[clusterIndex];
            for(let i =0; i < this.fTables.length; i++){
              this.fTables[i].a[prevIndex] = 0;
            }
        }
        this.rootDir = this.rootDir.filter((f:FatFiles)=>{
          return f.name !== file.name
        });
    }

    addFile(fileName:string,data:Uint8Array, date:Date){
      let splitName = fileName.split(".")
      let fileNameNoExtension = splitName[0].slice(0,5);
      let fileNameExtension = "";
      if(splitName[1].length > 0){
        fileNameExtension = splitName[1].slice(0,3);;
      }
      

      //remove file if it already exists
      console.log(data);
      let sameNameFile = this.rootDir.find((element)=>{
        return element.name === fileNameNoExtension && element.ext === fileNameExtension
      });
      if(sameNameFile != null){
        this.deleteFatFile(sameNameFile);
      }
      
      
      //figure out how much free space there is
      if(data.length > this.calculateFreeSpace()){
        console.warn("File is to large")
        return false;
      }

      let firstCluster = this.fTables[0].allocateFirstFreeSector();
      let clusterWrighten = firstCluster;
      let clusterSize = this.rSection.numBytesCluster();
      console.log(firstCluster)
      console.log(clusterSize)
      for(let writtenData = 0; writtenData < data.length; writtenData += clusterSize)
      {
        let nextClusterToWrite = 0;
        let sizeToWright = clusterSize
        if(writtenData + clusterSize < data.length){
          nextClusterToWrite = this.fTables[0].allocateFirstFreeSector();
          this.fTables[0].a[clusterWrighten] = nextClusterToWrite;
        }else{
          sizeToWright = data.length - writtenData;
        }
        
        let startClusterByte = clusterSize * (nextClusterToWrite - 2);
        memcpySplice(this.dataSection,
                     startClusterByte,
                     data,
                     writtenData,
                     sizeToWright);
        clusterWrighten = nextClusterToWrite
        
      }
      //add the directory here

      let newFile = new FatFiles();

      
      newFile.name = fileNameNoExtension;
      newFile.ext = fileNameExtension;
      
      newFile.size = data.length;
      newFile.startCluster = firstCluster;
      this.rootDir.push(newFile);
      return true;
    }
    calculateUsedSpace(){
      let dataSectionUsed = this.fTables[0].clusterUsed()  * this.rSection.bpb_secPerClus * this.rSection.bpb_bytesPerSector;

      return  dataSectionUsed + this.rSection.numBytesFatTable() + this.rSection.bpb_rootEntCnt * 32 + 512;
    }

    calculateFreeSpace(){
      let totalSize = this.rSection.numBytesDisk();
      let usedData = this.calculateUsedSpace();

      return totalSize - usedData;
    }


    rSection = new FatReservedSection([]);;
    fTables : Array<FatTable> = []; //probably create something that houses this as one thing
    rootDir : Array<FatFiles> = [];
    dataSection  = new Uint8Array(0)
  }