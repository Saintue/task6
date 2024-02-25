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
        navigate('../task6')
    }
    return (
        <div className={'toolbar bg-secondary'} style={{top:"40px"}}>
            <button className={"toolbar__btn btn btn-primary"} onClick={()=>back()}>return</button>
            <button className={ "toolbar__btn btn btn-primary"} onClick={()=> toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>brush</button>
            <button className={ "toolbar__btn btn btn-primary"} onClick={()=> toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}> rectangle</button>
            <button className={" toolbar__btn btn btn-primary"} onClick={()=> toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>circle</button>
            <button className={" toolbar__btn btn btn-primary"} onClick={()=> toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>eraser</button>
            <button className={" toolbar__btn btn btn-primary" } onClick={()=> toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid))}>line</button>
            <input onChange={e=> changeColor(e)} type={"color"} style={{marginRight: "20px", minHeight: "25px", minWidth: "50px"}}/>
        </div>
    );
};

export default Toolbar;