import React, { useState, /*useEffect*/ } from "react";
import { signOut } from "firebase/auth";
import { authService } from "fbase"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useNavigate } from "react-router-dom";

// import { dbService } from "fbase"
// import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
    const history = useHistory();
    // const navigate = useNavigate();
    const onLogOutClick = () => {
        signOut(authService);
        history.push("/");
        window.location.reload();
        // navigate("/", { replace: true });
    };

    // const getMyNweets = async () => {
    //     const nweets = await query(
    //         collection(dbService, "nweets"),
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "desc"),
    //     );
    // }
    // useEffect(() => {
    //     getMyNweets();
    // }, []);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
    };

    return(
    <>
        <form onSubmit={onSubmit}>
            <input
                onChange={onChange}
                type="text"
                placeholder="Display name"
                value={newDisplayName}
            />
            <input type="submit" value="Update Profile" />
        </form>

        <button onClick={onLogOutClick}>LOG OUT</button>
    </>
    );
};
export default Profile;