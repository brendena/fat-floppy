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
        <div className="popup">
            <button onClick={close}>x</button>
            {children}
        </div>
    );
;


export default PopupTag;