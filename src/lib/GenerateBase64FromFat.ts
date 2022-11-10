import { FatFiles } from "./FatFiles";
import { FatTable, FAT_END_FILE } from "./FatTable";

function blobToBase64(blob:Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
}

var _appendBuffer = function(buffer1:Uint8Array, buffer2:Uint8Array) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  };

export function GetSigleFatFile(
    fatTables: FatTable[], 
    fatFile: FatFiles, 
    data : Uint8Array,
    clusterSize : number )
{
    console.log("~~~~~~~~~~~~~~")
    let returnData = new Uint8Array();
    let clusterIndex = fatFile.startCluster;
    for(let i =0; i < (Math.floor(fatFile.size / clusterSize)); i++)
    {
        console.log("cluster Index " + clusterIndex);
        let startClusterByte = clusterSize * (clusterIndex - 2);
        returnData = _appendBuffer(returnData, data.slice(startClusterByte, startClusterByte + clusterSize));

        clusterIndex = fatTables[0].a[clusterIndex];
    }
    //grab the half cluster sizes
    let startClusterByte = clusterSize * (clusterIndex - 2);
    returnData = _appendBuffer(returnData, data.slice(startClusterByte, startClusterByte + fatFile.size %clusterSize));


    console.log(fatFile.size);
    console.log("return size " + returnData.length);
    console.log("-----------------")
    return returnData;
}