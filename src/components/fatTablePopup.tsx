import React, {useState, useContext} from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";

const FatTablePopup: React.FC = () => {  
    const {state} = useContext(AppContext);
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
    return (
        <div>
            <p>test</p>
        </div>

    );
};


export default FatTablePopup;