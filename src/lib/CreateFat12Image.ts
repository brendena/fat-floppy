import { Fat12FileSystem } from "./Fat12FileSystem";
import { FILE_SYS_TYPE } from "./FatRerveredSection";
import { FatTable } from "./FatTable";

export function CreateFat12Image(imageSize:number){
    let fatSystem = new Fat12FileSystem(new Uint8Array(0));
    
    //reserve section  
    fatSystem.rSection.bs_jmpBoot = new Uint8Array([0xEb,0x58,0x90]);
    fatSystem.rSection.bs_oemName = "WINIMAGE";
    fatSystem.rSection.bpb_bytesPerSector = 512;
    fatSystem.rSection.bpb_secPerClus = 2; //might want to change
    fatSystem.rSection.bpb_numFats = 2;
    fatSystem.rSection.bpb_rootEntCnt = (16 * 7);// might want to change
    fatSystem.rSection.bpb_totalSec16 = imageSize / 512;
    fatSystem.rSection.bpb_media = 253;
    fatSystem.rSection.bpb_FATz16 = 1 //might change size of the fat tables
    fatSystem.rSection.bpb_secPerTrack = 8;
    fatSystem.rSection.bpb_numHeads = 1;
    fatSystem.rSection.bpb_hiddSec = 0
    fatSystem.rSection.bpb_totalSec32 = 0;
    fatSystem.rSection.bpb_hiddSec = 0;
    fatSystem.rSection.bpb_totalSec32 = 0;
    fatSystem.rSection.bs_drvNum = 0;
    fatSystem.rSection.bs_reserved = 0;
    fatSystem.rSection.bs_bootSig = 0x29;
    fatSystem.rSection.bs_volID = 604444122;//probably should be a random number?
    fatSystem.rSection.bs_fileSysType = FILE_SYS_TYPE;
    
    for(let i =0; i < fatSystem.rSection.bpb_numFats; i++)
    {
        let fatTable = new FatTable(new Uint8Array());
        fatTable.a = new Array(Math.floor(fatSystem.rSection.numBytesFatTable() * (2/3)) + 1);
        fatTable.a[0] = 0xFFD;
        fatTable.a[1] = 0xFFF;
        fatSystem.fTables.push(fatTable);
    }
    fatSystem.dataSection = new Uint8Array(imageSize - fatSystem.rSection.calculateDataSection());
    console.log(fatSystem)
    return fatSystem;
}