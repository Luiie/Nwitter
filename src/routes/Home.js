import React, {useEffect, useState} from "react";
import { dbService } from "fbase"
import { addDoc, collection,
        query, //getDocs,
        onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";

// export default () => <span>Home</span>
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
/*
    const getNweets = async () => {
        const dbNweets = await getDocs(query(collection(dbService, "nweets")));
        // console.log(dbNweets);
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev])
        });
    };
*/
    useEffect(() => {
        // getNweets();
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
        setNweet("");
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorid: userObj.uid,
            });
            setNweet("");
        } catch (error){

        }
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setNweet(value);
    };

    return (
        <div>
            <span>Home</span>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Good" maxLength={120}
                        value={nweet} onChange={onChange} />
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorid === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}
export default Home;