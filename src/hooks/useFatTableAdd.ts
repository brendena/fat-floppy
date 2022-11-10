import { Fat12FileSystem } from "../lib/Fat12FileSystem"
import React from 'react';

import { Types } from "../reducers";
import { AppContext } from "../context";


export function useFatTableAdd (){
    const {dispatch} = React.useContext(AppContext);

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
        

    return async function(event : React.ChangeEvent<HTMLInputElement>){
        if(event.target.files?.length &&
            event.target.files?.length > 0)
        {
            //console.log(event.target.files[0])

            const reader = new FileReader();
            let dataBuffer : any =  await readFileAsync(event.target.files[0])
            //console.log(dataBuffer);
            if(dataBuffer.byteLength > 0)
            {
                let fat12FileSystem = new Fat12FileSystem(new Uint8Array(dataBuffer));
                dispatch({
                    type: Types.ADD_FAT_IMG,
                    payload : fat12FileSystem
                });
            }
            
        }
    }
}