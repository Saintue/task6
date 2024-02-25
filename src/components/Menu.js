import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Posts} from "../posts/Posts";
let roomsArr =  await Posts.getIds()
const Menu = () => {
    const [rooms, setRooms] = useState(roomsArr)
    let navigate = useNavigate()
    function changePath(i){
        let path = rooms[i]
        navigate(`task6/${path}`)
    }
    async function addRoom(){
        await Posts.createRoom()
        roomsArr = await Posts.getIds()
        setRooms(roomsArr)
    }
    return (
        <div style={{display: 'flex', width:'100%',justifyContent: 'center'}}>
        <div className={'container'}>
        <table style={{display:"flex",height:'300px', overflow: "auto", width: '300px', justifyContent: 'center'}}>
            <tbody>
            {rooms.map((el, i) =>(<tr><td><button onClick={()=>changePath(i)}>room: {i+1}</button></td></tr>))}
            </tbody>
        </table>
            <button onClick={addRoom} style={{width: '300px'}}>create room</button>
        </div>
            </div>
    );
};

export default Menu;