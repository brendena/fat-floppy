import React, {useState, useContext} from 'react';
import './popup.css';


type PopupProps = {
    close: ()=>void,
    children: JSX.Element
};

const PopupTag: React.FC<PopupProps> = ({
    close,
    children
}) => (
        <div id="popupWrapper" onClick={close}>
            <div className="popup">
                <button onClick={close}>x</button>
                {children}
            </div>
        </div>

    );
;


export default PopupTag;