import React,{useState,useEffect} from 'react';
import {authService} from '../firebase';
const Home =()=>{
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              setAuth(user.email.split("@")[0]);
            } else {
              // User is signed out.
              // ...
            }
        });
        // setUser(authService.currentUser);
    }, [])
    return (
        <div>
            {console.log('user',auth)}
            <h2>Home</h2>
            <h3>안녕하세요 {auth?auth:"~~"} 고객님</h3>
            
        </div>
    );
}

export default Home;