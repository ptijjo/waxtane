import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from '../components/SignUp';

const Connection = () => {

    const [connect, setConnect] = useState(true);
    const [enregistre, setEnregistre] = useState(false);

    const HandleConnection = () => {
        setConnect(true);
        setEnregistre(false);
    };

    const handleEnregistrement = () => {
        setEnregistre(true);
        setConnect(false)
    };
    
    return (
        <div className='connection'>
            <div className="ongletConnection">
                <span className='signIn' onClick={HandleConnection}>Connection</span>
                <span className='signUp' onClick={handleEnregistrement}>Enregistrement</span>
            </div>

            {(connect && !enregistre) && <SignIn />}
            {(!connect && enregistre) && <SignUp />}

        </div>
    )
}

export default Connection
