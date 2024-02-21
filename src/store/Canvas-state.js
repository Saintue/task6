import {makeAutoObservable} from "mobx"
class Canvas{
    canvas = null
    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas){
        this.canvas = canvas;
    }
}

export default new Canvas()