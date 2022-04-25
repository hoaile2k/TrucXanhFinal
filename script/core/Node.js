export class Node { // entity

    constructor() {
        this._background = ""
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._text = 0;
        this._zIndex =0
        this._border = ""
        this._display = ""
        this._scaleX = 0
        this._opacity = 0
        this._fontSize = ""
        this._fontFamily = ""
        this._rotate = 0
        this._rotateY = 0
        this._cursor = ""
        this.elm = this._createElement();
        this.children = [];
    }
    get cursor() {
        return this._cursor;    
    }
    set cursor(value) {
        this._cursor = value;
        this.elm.style.cursor = this._cursor
    }
    get rotateY() {
        return this._rotateY;    
    }
    set rotateY(value) {
        this._rotateY = value;
        this.elm.style.transform = `rotateY(${this._rotateY}deg)`
    }
    get rotate() {
        return this._rotate;    
    }
    set rotate(value) {
        this._rotateY = value;
        this.elm.style.transform = `rotate(${this._rotate}deg)`
    }
    get fontSize() {return this._fontSize}
    set fontSize(value){
        this._fontSize = value
        this.elm.style.fontSize = this._fontSize +"px"
    }
    get fontFamily() {return this._fontFamily}
    set fontFamily(value){
        this._fontFamily = value
        this.elm.style.fontFamily = this._fontFamily
    }
    get opacity() {return this._opacity}
    set opacity(value){
        this._opacity = value
        this.elm.style.opacity = this._opacity
    }
    get scale() {return this._scale}
    set scale(value){
        this._scale = value
        this.elm.style.transform = `scale(${this._scale})` 
    }
    get scaleX() {return this._scaleX}
    set scaleX(value){
        this._scaleX = value
        this.elm.style.transform = `scaleX(${this._scaleX})` 
    }
    get display() {return this._display}
    set display(value){
        this._display = value
        this.elm.style.display = this._display
    }
    get border() {return this._border}
    set border(value){
        this._border = value
        this.elm.style.border = this._border
    }
    get zIndex() { return this._zIndex; }
    set zIndex(value) {
        this._zIndex = value;
        // this.elm.style.zIndex = this._zIndex;
    }
    get x() { return this._x; }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";
    }
    get y() { return this._y; }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";
    }

    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width + "px";
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }
    get background() {
        return this._background;    
    }
    set background(value) {
        this._background = value;
        this.elm.style.background = this.background;
    }
    get text() {
        return this._text;    
    }
    set text(value) {
        this._text = value;
        this.elm.textContent = value
    }
    
    _createElement() {
        let elm = document.createElement("div");
        elm.style.position = "absolute";
        return elm;
    }

    addChild(node) {
        this.elm.appendChild(node.elm);
        this.children.push(node);
    }
    removeChild(node) {
        let index = this.children.indexOf(node); if (index === -1) return;
        this.elm.removeChild(node.elm);
        this.children.splice(index, 1);
    }
}