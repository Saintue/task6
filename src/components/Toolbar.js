import React from 'react';
import "../styles/toolbar.scss"
import toolState from "../store/Tool-state";
import Brush from "../tools/Brush";
import canvasState from "../store/Canvas-state";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import {useNavigate} from "react-router-dom";
import CanvasState from "../store/Canvas-state";

const Toolbar = () => {
    let navigate = useNavigate()
    const changeColor = e =>{
        console.log(e.target.value)
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    function back(){
        CanvasState.socket.disconnect()
        navigate('/')
    }
    return (
        <div className={'toolbar'} style={{top:"40px"}}>
            <button onClick={()=>back()}>return</button>
            <button className={ "toolbar__btn brush"} onClick={()=> toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}></button>
            <button className={ "toolbar__btn rect" } onClick={()=> toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}></button>
            <button className={" toolbar__btn circle"} onClick={()=> toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))}></button>
            <button className={" toolbar__btn eraser"} onClick={()=> toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))}></button>
            <input onChange={e=> changeColor(e)} type={"color"} style={{marginRight: "20px", minHeight: "25px", minWidth: "50px"}}/>
            <button className={" toolbar__btn line" } onClick={()=> toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))}><hr/></button>
        </div>
    );
};

export default Toolbar;