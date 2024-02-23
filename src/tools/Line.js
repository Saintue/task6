import Tool from "./Tool";


export default class Line extends Tool {
    constructor(canvas,socket, id) {
        super(canvas,socket, id);
        this.listen()
        this.name = 'Line'
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e) {
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.mouseDown = true
        this.currentX = e.pageX-e.target.offsetLeft
        this.currentY = e.pageY-e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                x: this.startX,
                y: this.startY,
                curX: e.pageX-e.target.offsetLeft,
                curY: e.pageY-e.target.offsetTop,
                color: this.ctx.fillStyle,
                strokeColor: this.ctx.strokeStyle,
                strokeWidth: this.ctx.lineWidth
            }
        }))
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    }


    draw(x,y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY )
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }.bind(this)

    }
    static staticDraw(ctx,x,y, curX, curY, strokeColor, strokeWidth) {
            ctx.lineWidth = strokeWidth
            ctx.strokeStyle = strokeColor
            ctx.beginPath()
            ctx.moveTo(curX, curY )
            ctx.lineTo(x, y)
            ctx.stroke()

    }
}