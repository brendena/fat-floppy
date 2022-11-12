import { Fat12FileSystem } from "./Fat12FileSystem";
import { FatFiles } from "./FatFiles";
import { FatReservedSection } from "./FatRerveredSection";
import { FatTable } from "./FatTable";
import { memcpy, memcpyString,memcpyNumber,memcpyStringPadded } from "./memoryHelpers";
import { grabFat12Date,grabFat12Time,grabFat12SubSeconds } from "./FatSupport";

export function ConvertReserveSectionBinary(rs:FatReservedSection,a:Uint8Array){
    memcpy(a,0,rs.bs_jmpBoot);
    memcpyString(a,3,rs.bs_oemName);
    memcpyNumber(a,11,rs.bpb_bytesPerSector, 2);
    memcpyNumber(a,13,rs.bpb_secPerClus,1);
    memcpyNumber(a,14,rs.bpb_rsvdSecCnt,2);
    memcpyNumber(a,16,rs.bpb_numFats,1);
    memcpyNumber(a,17,rs.bpb_rootEntCnt,2);
    memcpyNumber(a,19,rs.bpb_totalSec16,2);
    memcpyNumber(a,21,rs.bpb_media,1);
    memcpyNumber(a,22,rs.bpb_FATz16,2);

    memcpyNumber(a,24,rs.bpb_secPerTrack,2);
    memcpyNumber(a,26,rs.bpb_numHeads,2);
    memcpyNumber(a,28,rs.bpb_hiddSec,4);
    memcpyNumber(a,32,rs.bpb_totalSec32,4);
    memcpyNumber(a,36,rs.bs_drvNum,1);
    memcpyNumber(a,37,rs.bs_reserved,1);

    memcpyNumber(a,38,rs.bs_bootSig,1);
    memcpyNumber(a,39,rs.bs_volID,4);
    memcpy(a,43,rs.bs_volLab);
    memcpyString(a,54,rs.bs_fileSysType);
    memcpy(a,62,rs.bs_cootCode);
    console.log(rs.bs_bootSign)
    memcpy(a,510,rs.bs_bootSign);
}

export function convertFatTableSection(ft:Array<FatTable>,a:Uint8Array)
{
    let offset = 511;
    for(let f =0; f < ft.length; f++)
    {
        let iBuffer = ft[f].a;
        for(let i =0; i < ft[f].a.length; i+=2){

            let firstPart  = iBuffer[i] & 0xff;
            let secondPart = (iBuffer[i] >> 8) + ((iBuffer[i+1] & 0xf) << 4);
            let thrirdPart = (iBuffer[i+1] >> 4);
            a[++offset] = firstPart;
            a[++offset] = secondPart;
            a[++offset] = thrirdPart;
        }
        --offset;//512 doesn't go into sets of 3 
    }
}

export function convertDirSection(files:Array<FatFiles>,a:Uint8Array, offset:number){
    
    for(let i =0; i < files.length; i++){
        memcpyStringPadded(a,offset,files[i].name, 8);
        memcpyStringPadded(a,(offset + 8),files[i].ext,3);
        memcpyNumber(a,(offset + 11),files[i].attrs,1);
        memcpyNumber(a,(offset + 12),files[i].ntRes,1);
        memcpyNumber(a,(offset + 13),grabFat12SubSeconds(files[i].creationDate), 1);
        memcpyNumber(a,(offset + 14),grabFat12Time(files[i].creationDate), 2);
        memcpyNumber(a,(offset + 16),grabFat12Date(files[i].creationDate), 2);
        memcpyNumber(a,(offset + 18),grabFat12Date(files[i].lastAccessDate), 2);
        memcpyNumber(a,(offset + 20),files[i].highStartCluster,2);
        memcpyNumber(a,(offset + 22),grabFat12Time(files[i].writeDate), 2);
        memcpyNumber(a,(offset + 24),grabFat12Date(files[i].writeDate), 2);
        memcpyNumber(a,(offset + 26),files[i].startCluster,2);
        memcpyNumber(a,(offset + 28),files[i].size,4);
        offset += 32;
    }
    
}

export function GenerateImgFile(fat12System:Fat12FileSystem){
    let rB = new Uint8Array(fat12System.rSection.numBytesDisk());
    ConvertReserveSectionBinary(fat12System.rSection,rB);
    convertFatTableSection(fat12System.fTables, rB);
    convertDirSection(fat12System.rootDir,rB,fat12System.rSection.calculateDirOffset());
    memcpy(
        rB,
        fat12System.rSection.calculateDataSection(),
        fat12System.dataSection
    );
    console.log(rB);


    //copyied from other code.  Probably should 
    let bytesAsBlob = new Blob
    (
        [ rB ], 
        {type:'application/type'}
    );
    let downloadLink = document.createElement("a");
    let url = window.URL;
    downloadLink.href = url.createObjectURL(bytesAsBlob);
    downloadLink.download = "generatedImage.img";
    downloadLink.click();
}