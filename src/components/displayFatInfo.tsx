import React from 'react';
import { AppContext } from "../context";
import { GetSigleFatFile } from "../lib/GenerateBase64FromFat";
import './displayFatInfo.css';
import { FatFiles } from '../lib/FatFiles';
import { GenerateImgFile } from '../lib/GenerateImgFile';
import { FAT_UNDEFINED_DATE } from '../lib/FatSupport';
import { Types } from "../reducers";
import { useFatTableAddFile } from '../hooks/useFatTableAdd';

const DisplayFatInfo: React.FC = () => {  
    const {state, dispatch} = React.useContext(AppContext);
    let addFile = useFatTableAddFile();



    async function downloadImage(file:FatFiles){
        if(state.fd.length > 0)
        {
            console.log(state.fd)
            let fd = state.fd[0];
            let fileData = GetSigleFatFile(fd.fTables, file, fd.dataSection, fd.rSection.numBytesCluster());
            console.log(fileData)
            let bytesAsBlob = new Blob
            (
                [ fileData ], 
                {type:'application/type'}
            );
            console.log(file.name.charCodeAt(5))
            let fileName = file.name.replace(/\s/g, '');
            fileName += "." + file.ext
            let downloadLink = document.createElement("a");
            let url = window.URL;
            downloadLink.href = url.createObjectURL(bytesAsBlob);
            downloadLink.download = fileName;
            downloadLink.click();

        }
    }

    function deleteFile(file:FatFiles){
        state.fd[0].deleteFatFile(file);
        dispatch({
            type: Types.ADD_FAT_IMG,
            payload : state.fd[0]
        });
    }

    function generateImgFile(){
        GenerateImgFile(state.fd[0])
    }

    function fDate(date:Date) {
        if(date === FAT_UNDEFINED_DATE)
        {
            return "NaN"
        }
        
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    function numberWithCommas(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    

    let files = state.fd[0].rootDir;
    return (
        <div>
            <p>Data used {state.fd[0].calculateUsedSpace()} / {state.fd[0].rSection.numBytesDisk()} B </p>
            <button onClick={generateImgFile}>Generate a bin image</button>
            <input type="file" id="inputImage" onChange={addFile}/>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>size</th>
                        <th>created</th>
                        <th>modified</th>
                        <th>download</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        files.map((f:FatFiles, i:number )=>{

                    return <tr key={i}> 
                                <td>{f.name}.{f.ext}</td>
                                <td>{numberWithCommas(f.size)} B</td>
                                <td>{fDate(f.creationDate)}</td>
                                <td>{fDate(f.lastAccessDate)}</td>
                                <td><button onClick={()=>{downloadImage(f)}}>Download</button></td>
                                <td><button onClick={()=>{deleteFile(f)}}>delete</button></td>
                            </tr>
                    })
                    }
                </tbody>
            </table>
        </div>

    );
};


export default DisplayFatInfo;