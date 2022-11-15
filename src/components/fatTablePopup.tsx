import React, {useState} from 'react';
import { useGenerateFatImg } from '../hooks/useFatTableAdd';
import { emitCustomEvent } from 'react-custom-events'

interface FileSizeDescriptor{
    name:string,
    bytes:number,
    secPerTrack:number,
    numHeads:number,
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
        bytes: 163840,
        secPerTrack: 8,
        numHeads:1
    },
    {
        name:"180 KB",
        bytes: 184320,
        secPerTrack: 9,
        numHeads:1
    },
    {
        name:"320 KB",
        bytes: 327680,
        secPerTrack: 8,
        numHeads:2
    },
    {
        name:"360 KB",
        bytes: 368640,
        secPerTrack: 9,
        numHeads:2
    },
    {
        name:"720 KB",
        bytes: 737280,
        secPerTrack: 9,
        numHeads:2
    },
    {
        name:"1.2 MB",
        bytes: 1228800,
        secPerTrack: 0xf,
        numHeads:2
    },
    {
        name:"1.44 MB",
        bytes: 1474560,
        secPerTrack: 0x12,
        numHeads:2
    },
    {
        name:"2.88 MB",
        bytes: 2949120,
        secPerTrack: 0x24,
        numHeads:2
    }
]

const FatTablePopup: React.FC = () => {  
    const [floppyType, setFloppyType] = useState(fileSizes[3]);
    const [floppyName, setSloppyName] = useState("imgName");
    const generateFat = useGenerateFatImg();
    let createFatSystem = function(){
        generateFat(floppyName + ".IMG",floppyType.bytes, floppyType.secPerTrack, floppyType.numHeads);
        emitCustomEvent('popup-close')
        
    }
    let changedtest = function(f:FileSizeDescriptor)
    {
        setFloppyType(f);
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
                                <input checked={floppyType.bytes === f.bytes}  id={f.bytes.toString()} type="radio" value={f.bytes} name="fileSize" onChange={()=>{changedtest(f)}}/>
                                <label htmlFor={f.bytes.toString()}>{f.name}</label>
                            </div>
                })
            }
            
            <button onClick={createFatSystem}>create</button>
        </div>

    );
};


export default FatTablePopup;