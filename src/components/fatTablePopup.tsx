import React, {useState, useContext} from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";
import { useGenerateFatImg } from '../hooks/useFatTableAdd';
interface FileSizeDescriptor{
    name:string,
    bytes:number
}

/*
160kb
180kb
320kb
720kb
1.2Mb
1.44MB
2.88MB

802KB
1.72MB
1.68MB
DMF cluster 1024
DMF cluster 2048
*/

const fileSizes : Array<FileSizeDescriptor> = [
    {
        name:"160 KB",
        bytes: 163840
    },
    {
        name:"180 KB",
        bytes: 184320
    },
    {
        name:"320 KB",
        bytes: 327680
    },
    {
        name:"360 KB",
        bytes: 368640
    },
    {
        name:"720 KB",
        bytes: 737280
    },
    {
        name:"1.2 MB",
        bytes: 1228800
    },
    {
        name:"1.44 MB",
        bytes: 1474560
    },
    {
        name:"2.88 MB",
        bytes: 2949120
    }
]

const FatTablePopup: React.FC = () => {  
    const {state} = useContext(AppContext);
    const [sizeFloppy, setSizeFloppy] = useState(fileSizes[3].bytes);
    const [floppyName, setSloppyName] = useState("imgName");
    const generateFat = useGenerateFatImg();
    let createFatSystem = function(){
        generateFat(floppyName,sizeFloppy)
    }
    let changedtest = function(size:number)
    {
        setSizeFloppy(size);
    }
    let changeName = function(event:any){
        setSloppyName(event.target.value)
    }

    return (
        <div>
            <p>Form creating fat img</p>
            <label htmlFor="nameFloppy">Name floppy</label><input id="nameFloppy" type="text" value={floppyName} onChange={changeName}/><span>.img</span>
            <p>choose size</p>
            {
                fileSizes.map((f:FileSizeDescriptor, i:number )=>{
                   return   <div key={i}>
                                <input checked={sizeFloppy == f.bytes}  id={f.bytes.toString()} type="radio" value={f.bytes} name="fileSize" onChange={()=>{changedtest(f.bytes)}}/>
                                <label htmlFor={f.bytes.toString()}>{f.name}</label>
                            </div>
                })
            }
            
            <button onClick={createFatSystem}>create</button>
        </div>

    );
};


export default FatTablePopup;