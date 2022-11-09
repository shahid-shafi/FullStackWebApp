import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    userDetails: {},
    currentUser: {},
    setIsLoggedIn: () => { },
});

export default AuthContext;