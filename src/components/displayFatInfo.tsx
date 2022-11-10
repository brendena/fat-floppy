import React from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";
import { GetSigleFatFile } from "../lib/GenerateBase64FromFat";
import './displayFatInfo.css';
import { FatFiles } from '../lib/FatFiles';
import { GenerateImgFile } from '../lib/GenerateImgFile';

const DisplayFatInfo: React.FC = () => {  
    const {state} = React.useContext(AppContext);
    //const generatedDoc = useGenerateFileLinks();



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
        
    }

    function generateImgFile(){
        GenerateImgFile(state.fd[0])
    }

    function fDate(date:Date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }
    
    

    let files = state.fd[0].rootDir;
    return (
        <div>
            <p>hello world</p>
            <button onClick={generateImgFile}>Generate a bin image</button>


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
                                <td>{f.size}B</td>
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