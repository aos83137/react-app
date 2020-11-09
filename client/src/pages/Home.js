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

    }, [])
    return (
        <div>
            <h2>Home</h2>
            {
                auth?
                <h3>안녕하세요 {auth} 고객님</h3>
                :
                <>
                    <h3>로그인을 해주세요</h3>
                    <h3>로그인 시 게시판이 사용가능합니다.</h3>
                </>
            }           
        </div>
    );
}

export default Home;