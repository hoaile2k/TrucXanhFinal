import { Node } from "../core/Node.js";
export class Label extends Node{
    constructor(){
        super()
    }
    _createElement(){
        let elm = document.createElement("h1")
        elm.style.position = "absolute"
        return elm;
    }
}