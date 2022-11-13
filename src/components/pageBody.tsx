import React, {useState, useContext} from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";
import PopupTag from "./popup";
import DisplayFatInfo from './displayFatInfo';
import FatTablePopup from "./fatTablePopup"
import "./pageBody.css"

const PageBody: React.FC = () => {  
    let funcToAddFatTable = useFatTableAdd();
    const {state} = useContext(AppContext);
    const [popup, setPopup] = useState(false);

    return (
        <div className="App">
            <a href="https://github.com/brendena/fat-floppy"><img decoding="async" loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_orange_ff7600.png?resize=149%2C149" id="forkGithub" alt="Fork me on GitHub" data-recalc-dims="1"/></a>
            <header className="App-header">
                <div>
                    <img id="mainLogo" src="MainLogo.png"/>
                </div>
                <div>
                    <button className='fancyButton' onClick={()=>{setPopup(!popup)}}>Create</button>
                    <label className="fancyButton">
                        <input type="file" onChange={funcToAddFatTable}/>
                        <i className="fa fa-cloud-upload"></i> Upload
                    </label>
                </div>
            </header>
            { popup && 
                <PopupTag close={()=>{setPopup(false)}}>
                    <FatTablePopup></FatTablePopup>
                </PopupTag>

            }
            
            {state.fd.imgs.length > 0 && 
            <DisplayFatInfo></DisplayFatInfo>
            }
        </div>

    );
};


export default PageBody;