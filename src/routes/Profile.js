import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "fbase"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        signOut(authService);
        history.push("/");
    };
    return(
    <>
        <button onClick={onLogOutClick}>LOG OUT</button>
    </>
    );
};