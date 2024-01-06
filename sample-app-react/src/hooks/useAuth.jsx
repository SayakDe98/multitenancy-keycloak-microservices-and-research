import React, { useEffect, useRef, useState } from 'react'
import Keycloak from 'keycloak-js';

const client = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEACLOAK_REALM,
  clientId: process.env.REACT_APP_CLIENT,
});

const useAuth = () => {
    const isRun = useRef(false);
    const [token, setToken] = useState(null);
    const [isLogin, setLogin] = useState(false); 
    
    useEffect(() => {
        if(isRun.current) return;
        isRun.current = true;
        client.init({ onload: "login-required" }).then(res => {
            setLogin(res);
            setToken(client.token);
        });
    }, []);
  return [isLogin, token];
}

export default useAuth