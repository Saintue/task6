import React, {useEffect, useRef} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite"
import canvasState from "../store/Canvas-state";
import toolState from "../store/Tool-state";
import Brush from "../tools/Brush";
const Canvas = observer(()=> {
    const canvasRef = useRef()
    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    return (
        <div className={'canvas'}>
            <canvas ref={canvasRef}   width={1500} height={800} />

        </div>
    );
})

export default Canvas;