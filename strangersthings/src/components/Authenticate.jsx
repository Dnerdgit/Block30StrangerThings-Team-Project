// import { AuthProvider } from 'react-auth-kit'
import { createContext, useContext, useState } from 'react'
// import { useSessionStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(
        sessionStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const handleAuth = (signedIn, userData = null) => {
        setIsSignedIn(signedIn);
        if (userData) {
            console.log("Auth user", userData);
            setUser(userData);
        }
    };
    return <AuthContext.Provider value ={{ isSignedIn, user, handleAuth }}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}