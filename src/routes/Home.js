import React, {useEffect, useState} from "react";
import { dbService, storageService } from "fbase"
import { addDoc, collection,
        query, //getDocs,
        onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

// export default () => <span>Home</span>
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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
        let attachmentUrl = "";
        if (attachment != "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        // console.log(attachmentUrl);

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorid: userObj.uid,
            attachmentUrl,
        }
        // try {
        await addDoc(collection(dbService, "nweets"), nweetObj
        //         text: nweet,
        //         createdAt: Date.now(),
        //         creatorid: userObj.uid,
        );
        setNweet("");
        // } catch (error){
        setAttachment("");
        // }
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment("");

    return (
        <div>
            <span>Home</span>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Good" maxLength={120}
                        value={nweet} onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>CLEAR</button>    
                </div>
                )}
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