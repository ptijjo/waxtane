import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { userConnected } from '../features/user/userSlice';
import Loader from '../components/Loader';





const Home: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch: any = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSlice = useSelector((state: any) => state.user);

    const token: string | null = localStorage.getItem("token");

    console.log(userSlice);


    useEffect(() => {
        if (token) dispatch(userConnected(token))
    }, [dispatch, token]);
    
    if(userSlice.loding === "pending") return "loding"



    return (
        <div className='home'>
            <Header picture={(userSlice.loading === "pending") ? <Loader /> : userSlice.info.userPicture} prenom={(userSlice.loading === "pending") ? <Loader /> : userSlice.info.userFirstName} />
            
            {(userSlice.loading==="pending")? <Loader/> : <p>Bonjour</p>}
           
            <Footer />
        </div>
    )
}

export default Home