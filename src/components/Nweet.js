import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            //Delete
            await deleteDoc(NweetTextRef);
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
    }
    return (
        <div>
            {
                editing ? (
                <>
                    {isOwner && (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" value={newNweet} onChange={onChange} required />
                            <input type="submit" value="update" />
                        </form>
                        <button onClick={toggleEditing}>CANCEL</button>
                    </>
                    )}
                </>
                ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                        { isOwner && (
                            <>
                                <button onClick={onDeleteClick}>DELETE</button>
                                <button onClick={toggleEditing}>EDIT</button>
                            </>
                        )}
                </>
                )
            }
        </div>
    )
};

export default Nweet;