import {littleEndianToNumber, toHexString, U8ToString} from "./FatSupport"
//Based on this guy's table
//http://elm-chan.org/docs/fat_e.html
//bpb - BIOS Paramter Block
//BS  - just boot sector
export class FatReservedSection{
    constructor(buffer : any){
        if(buffer.length == 0)
        {
          return;
        }
        if(buffer.length < 512 )
        {
          console.log(buffer)
          console.error( buffer.length + " the file isn't large enough to be a reserve section");
          return;
        }
        this.bs_jmpBoot = buffer.slice(0,3);
        this.bs_oemName = U8ToString(buffer.slice(3,11));
        this.bpb_bytesPerSector = littleEndianToNumber(buffer.slice(11,13));
        this.bpb_secPerClus = buffer[13];
        this.bpb_rsvdSecCnt = littleEndianToNumber(buffer.slice(14,16));
        this.bpb_numFats = buffer[16];
        this.bpb_rootEntCnt = littleEndianToNumber(buffer.slice(17,19));
        this.bpb_totalSec16 = littleEndianToNumber(buffer.slice(19,21));
        this.bpb_media = buffer[21];
        this.bpb_FATz16 = littleEndianToNumber(buffer.slice(22,24));
        this.bpb_secPerTrack = littleEndianToNumber(buffer.slice(24,26));
        this.bpb_numHeads = littleEndianToNumber(buffer.slice(26,28));
        this.bpb_hiddSec = littleEndianToNumber(buffer.slice(28,32));
        this.bpb_totalSec32 = littleEndianToNumber(buffer.slice(32,36));
        this.bs_drvNum = buffer[36];
        this.bs_reserved = buffer[37];
        this.bs_bootSig = buffer[38];
        this.bs_volID = littleEndianToNumber(buffer.slice(39,43))
        this.bs_volLab = buffer.slice(43,54);
        this.bs_fileSysType = U8ToString(buffer.slice(54,62))
        this.bs_cootCode = buffer.slice(62,510); //448
        this.bs_bootSign = buffer.slice(510,512);
        console.log(buffer.slice(510,512))
    }
    
    bs_jmpBoot: Uint8Array = new Uint8Array(3) // size 3
    bs_oemName: String    = ""     // size 8
    bpb_bytesPerSector: number  = 0// size 2
    bpb_secPerClus: number      = 0// size 1
    bpb_rsvdSecCnt: number      = 0// size 2
    bpb_numFats:number          = 0// size 1
    bpb_rootEntCnt:number       = 0// size 2
    bpb_totalSec16:number       = 0// size 2
    bpb_media: number           = 0// size 1 //enum??
    bpb_FATz16: number          = 0// size 2
    bpb_secPerTrack: number     = 0// size 2
    bpb_numHeads: number        = 0// size 2
    bpb_hiddSec: number         = 0// size 4
    bpb_totalSec32: number      = 0// size 4
    bs_drvNum: number           = 0// size 1
    bs_reserved: number         = 0// size 1
    bs_bootSig: number          = 0// size 1
    bs_volID: number            = 0// size 4
    bs_volLab: Uint8Array = new Uint8Array(11)    // size 11
    bs_fileSysType: string = ""    // size 8
    bs_cootCode: Uint8Array = new Uint8Array(448)     // size 448
    bs_bootSign: Uint8Array = new Uint8Array(2)      // size 2

    numBytesFatTable(){
      return this.bpb_FATz16 * this.bpb_bytesPerSector;
    }
    numBytesCluster(){
      return this.bpb_secPerClus * this.bpb_bytesPerSector;
    }

    numBytesDisk(){
      return this.bpb_totalSec16 * this.bpb_bytesPerSector;
    }
    

    print(){
        console.log("bs_jmpBoot " + toHexString(this.bs_jmpBoot));
        console.log("bs_oemName " + this.bs_oemName);
        console.log("bpb_bytesPerSector " + this.bpb_bytesPerSector)
        console.log("bpb_secPerClus " + this.bpb_secPerClus)
        console.log("bpb_rsvdSecCnt " + this.bpb_rsvdSecCnt)
        console.log("bpb_numFats " + this.bpb_numFats)
        console.log("bpb_rootEntCnt " + this.bpb_rootEntCnt)
        console.log("bpb_totalSec16 " + this.bpb_totalSec16)
        console.log("bpb_media " + this.bpb_media)
        console.log("bpb_FATz16 " + this.bpb_FATz16)
        console.log("bpb_secPerTrack " + this.bpb_secPerTrack)
        console.log("bpb_numHeads " + this.bpb_numHeads)
        console.log("bpb_hiddSec " + this.bpb_hiddSec)
        console.log("bpb_totalSec32 " + this.bpb_totalSec32)
        console.log("bs_drvNum " + this.bs_drvNum)
        console.log("bs_reserved " + this.bs_reserved)
        console.log("bs_bootSig " + this.bs_bootSig)
        console.log("bs_volID " + this.bs_volID)
        console.log("bs_volLab " + toHexString(this.bs_volLab));
        console.log("bs_fileSysType " + this.bs_fileSysType)
    }
}
