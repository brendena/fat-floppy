import React, {useState, useContext} from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";
import PopupTag from "./popup";
import DisplayFatInfo from './displayFatInfo';
import FatTablePopup from "./fatTablePopup"
const PageBody: React.FC = () => {  
    let funcToAddFatTable = useFatTableAdd();
    const {state} = useContext(AppContext);
    const [popup, setPopup] = useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={()=>{setPopup(!popup)}}>create</button>
                <label className="custom-file-upload">
                    <input type="file" onChange={funcToAddFatTable}/>
                    <i className="fa fa-cloud-upload"></i> Custom Upload
                </label>
            </header>
            { popup && 
                <PopupTag close={()=>{setPopup(false)}}>
                    <FatTablePopup></FatTablePopup>
                </PopupTag>

            }
            
            <div>
                {state.fd.imgs.length > 0 && 
                <DisplayFatInfo></DisplayFatInfo>
                }
            </div>
        </div>

    );
};


export default PageBody;