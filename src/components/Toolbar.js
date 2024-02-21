import React from 'react';
import "../styles/toolbar.scss"
import toolState from "../store/Tool-state";
import Brush from "../tools/Brush";
import canvasState from "../store/Canvas-state";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Toolbar = () => {
    const changeColor = e =>{
        console.log(e.target.value)
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    return (
        <div className={'toolbar'} style={{top:"40px"}}>
            <button className={ "toolbar__btn brush"} onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}></button>
            <button className={ "toolbar__btn rect" } onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}></button>
            <button className={" toolbar__btn circle"} onClick={()=> toolState.setTool(new Circle(canvasState.canvas))}></button>
            <button className={" toolbar__btn eraser"} onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}></button>
            <button className={" toolbar__btn line" } onClick={()=> toolState.setTool(new Line(canvasState.canvas))}><hr/></button>
            <input onChange={e=> changeColor(e)} type={"color"} style={{marginLeft: "10px"}}/>
        </div>
    );
};

export default Toolbar;