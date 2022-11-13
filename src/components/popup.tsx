import React, {useState, useContext} from 'react';
import { useCustomEventListener } from 'react-custom-events'
import './popup.css';


type PopupProps = {
    close: ()=>void,
    children: JSX.Element
};

const PopupTag: React.FC<PopupProps> = ({
    close,
    children
}) => {
    useCustomEventListener('popup-close', (data) => {
        close();
    })
    
    return (
    
        <div id="popupWrapper" onClick={close}>
            <div className="popup" onClick={(e)=>{e.stopPropagation(); console.log("test")}}>
                <button id="popupClose" onClick={close}>x</button>
                {children}
            </div>
        </div>

    );
    }
;


export default PopupTag;