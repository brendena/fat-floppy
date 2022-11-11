import { Fat12FileSystem } from "./Fat12FileSystem";
import { FatReservedSection } from "./FatRerveredSection";
import { memcpy, memcpyString,memcpyNumber } from "./memoryHelpers";


export function ConvertReserveSectionBinary(rs:FatReservedSection,a:Uint8Array){
    memcpy(a,0,rs.bs_jmpBoot);
    memcpyString(a,3,rs.bs_oemName);
    memcpyNumber(a,11,rs.bpb_bytesPerSector, 2);
    memcpyNumber(a,13,rs.bpb_secPerClus,1);
    memcpyNumber(a,14,rs.bpb_rsvdSecCnt,2);
    memcpyNumber(a,16,rs.bpb_numFats,1);
    memcpyNumber(a,17,rs.bpb_numFats,2);
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

export function GenerateImgFile(fat12System:Fat12FileSystem){
    let rB = new Uint8Array(fat12System.rSection.numBytesDisk());
    ConvertReserveSectionBinary(fat12System.rSection,rB);
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