import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Posts} from "../posts/Posts";
import '../styles/menu.scss'
import canvasState from "../store/Canvas-state";
let roomsArr =  await Posts.getIds()
const Menu = () => {
    const [rooms, setRooms] = useState(roomsArr)
    let navigate = useNavigate()
    function changePath(i){
        let path = rooms[i]
        navigate(`.${path}`)
    }
    async function addRoom(){
        await Posts.createRoom()
        roomsArr = await Posts.getIds()
        setRooms(roomsArr)
    }
    return (
        <div className={'menu d-flex flex-column'} style={{display: 'flex', width:'100%'}}>
            <div className={'d-flex mb-5 badge bg-secondary justify-content-center'}>task6 Paint online</div>
        <div className={'container'}>
        <table style={{display:"flex",maxHeight:'300px', overflow: "auto", width: '300px', justifyContent: 'center'}}>
            <tbody>
            {rooms.map((el, i) =>(<tr><td><button className={'btn btn-primary mb-1'} style={{width:'100px'}} onClick={()=>changePath(i)}>room: {i+1}</button></td></tr>))}
            </tbody>
        </table>
            <button onClick={addRoom} className={'btn bg-info'} style={{width: '300px'}}>create room</button>
        </div>
            </div>
    );
};

export default Menu;