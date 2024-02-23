import {makeAutoObservable} from "mobx"
class Canvas{
    canvas = null
    socket = null
    sessionid = null
    constructor() {
        makeAutoObservable(this)
    }
    setSessionId(id){
        this.sessionid = id
    }
    setSocket(socket){
        this.socket = socket;
    }
    setCanvas(canvas){
        this.canvas = canvas;
    }
}

export default new Canvas()