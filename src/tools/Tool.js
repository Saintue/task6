export default class Tool{
    constructor(canvas, socket, id) {
        this.socket = socket
        this.id = id;
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.destroyListeners()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width){
        this.ctx.lineWidth = width
    }
    destroyListeners() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
}