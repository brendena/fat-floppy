import React from 'react';
import { useFatTableAdd } from '../hooks/useFatTableAdd';
import { AppContext } from "../context";
import DisplayFatInfo from './displayFatInfo';
const PageBody: React.FC = () => {  
    let funcToAddFatTable = useFatTableAdd();
    const {state} = React.useContext(AppContext);

    return (
        <div className="App">
            <header className="App-header">
                <button>create</button>
                <button>select</button>
                <div>
                    <input type="file" id="inputImage" onChange={funcToAddFatTable}/>
                </div>
            </header>
            <div>
                {state.fd.length > 0 && 
                <DisplayFatInfo></DisplayFatInfo>
                }
            </div>
        </div>

    );
};


export default PageBody;