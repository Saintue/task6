import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Tool {
    constructor(canvas,socket, id) {
        super(canvas, socket, id);
        this.listen()
    }
    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    }
    mouseUpHandler(e){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e){
        if (this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeWidth: this.ctx.lineWidth
                }
            }))
        }
    }


    static draw(ctx, x, y, strokeWidth) {
        ctx.lineWidth = strokeWidth
        let state = ctx.strokeStyle
        ctx.strokeStyle = "white"
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = state
    }
}