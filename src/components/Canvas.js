import React, {useEffect, useRef} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite"
import canvasState from "../store/Canvas-state";
import toolState from "../store/Tool-state";
import Brush from "../tools/Brush";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {Posts} from "../posts/Posts";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";


const Canvas = observer(()=> {
    const location = useLocation();
    const canvasRef = useRef()
    const params = useParams()
    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.post(`https://task6server-jwkt.onrender.com/api/initImage?id=${params.id}`, {img: canvasRef.current.toDataURL()}).then(response => {
            const img = new Image()
            img.src = response.data
            img.onload = () => {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
            }
        })
    }, [])

    useEffect(()=>{
       const socket = new WebSocket(`wss://task6server-jwkt.onrender.com`)
        canvasState.setSocket(socket)
        canvasState.setSessionId(params.id)
        toolState.setTool(new Brush(canvasRef.current, socket, params.id))
        socket.onopen = () => {
           socket.send(JSON.stringify({
               id: params.id,
               method: 'connection'
           }))
        }
        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    console.log('user connected')
                    break
                case "draw":
                    drawHandler(msg)
                    break
            }
            }
    }, [])

        const drawHandler = (msg) => {
            const figure = msg.figure
            const ctx = canvasRef.current.getContext('2d')
            switch (figure.type) {
                case "brush":
                    Brush.draw(ctx, figure.x, figure.y, figure.color)
                    break
                case "rect":
                    Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.strokeWidth)
                    ctx.beginPath()
                    break
                case "circle":
                    Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color, figure.strokeColor, figure.strokeWidth)
                    ctx.beginPath()
                    break
                case "eraser":
                    Eraser.draw(ctx, figure.x, figure.y)
                    break
                case "line":
                    Line.staticDraw(ctx, figure.x, figure.y, figure.curX, figure.curY, figure.strokeColor, figure.strokeWidth)
                    ctx.beginPath()
                    break
                case 'finish':
                    ctx.beginPath()
                    break
            }
        }
        function  mouseUpHandler(){
            axios.post(`https://task6server-jwkt.onrender.com/api/image?id=${params.id}`, {img: canvasRef.current.toDataURL()}).then((response) => {
                console.log(response.data);
        })
        }

    return (
        <div className={'canvas'}>
            <canvas onMouseUp={()=>mouseUpHandler()} ref={canvasRef} id={'canvas'} width={1200} height={800} />
        </div>
    );
})

export default Canvas;