import { Fat12FileSystem } from "../lib/Fat12FileSystem"
import React from 'react';
import { CreateFat12Image } from "../lib/CreateFat12Image";
import { Types } from "../reducers";
import { AppContext } from "../context";


//https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
function readFileAsync(file : any){
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
        resolve(reader.result);
        
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    })
}

async function getFileBuffer(file:FileList){
    if(file.length &&
       file.length > 0)
    {
        //console.log(event.target.files[0])
        let dataBuffer : any =  await readFileAsync(file[0])
        return new Uint8Array(dataBuffer);
    }
    return new Uint8Array([]);
}


export function useFatTableAdd (){
    const {dispatch} = React.useContext(AppContext);
    return async function(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.files == null) return;

        console.log(event.target.files[0])

        let dataBuffer = await getFileBuffer(event.target.files);
        //console.log(dataBuffer);
        if(dataBuffer.byteLength > 0)
        {
            let fat12FileSystem = new Fat12FileSystem(dataBuffer);
            dispatch({
                type: Types.ADD_FAT_IMG,
                payload : {
                    name: event.target.files[0].name,
                    imgs:[fat12FileSystem]
                }
            });
        }
    }
}

export function useFatTableAddFile(){
    const {state, dispatch} = React.useContext(AppContext);
    return async function(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.files == null) return;
        
        let dataBuffer = await getFileBuffer(event.target.files);
        
        if(dataBuffer.byteLength > 0)
        {
            let file = event.target.files[0];
            let addedFile = state.fd.imgs[0].addFile(file.name, dataBuffer, new Date());
            if(addedFile === true){
                dispatch({
                    type: Types.MODIFIED_FAT_IMAGE,
                    payload : state.fd.imgs[0]
                });
            }
        }
    }
}

export function useGenerateFatImg(){
    const {dispatch} = React.useContext(AppContext);
    return async function(name:string,size:number, secPerTrack:number,numHeads:number){
        
        let fatImg =  CreateFat12Image(size);
        fatImg.rSection.bpb_secPerTrack = secPerTrack;
        fatImg.rSection.bpb_numHeads = numHeads;
        dispatch({
            type: Types.ADD_FAT_IMG,
            payload : {
                name:name,
                imgs:[fatImg]
            }   
        });
    
    }
}