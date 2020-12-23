class Fx {

    constructor(canvasId) {
        this.canvas = window.document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
    }

    setCanvasToPageSize() {
        window.document.body.style.margin = '0px';
        window.document.body.style.padding = '0px';
        window.document.body.style.width = '100vw';
        window.document.body.style.height = '100vh';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    dimensions() {
        return {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    width() {
        return this.canvas.width;
    }

    height() {
        return this.canvas.height;
    }

    getCanvas() {
        return this.canvas;
    }

    fillCanvas(color) {
        this.drawRect(0,0, this.canvas.width,this.canvas.height, color);
    }

    drawRect(x,y, width,height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x,y, width,height);
    }
    
    stroke(p1x,p1y, p2x,p2y, color, lineWidth, pattern) {
        this.context.strokeStyle = color;
        this.context.lineWidth = lineWidth;
        if ( pattern ) {
            this.context.setLineDash(pattern);
        }
        this.context.beginPath();
        this.context.moveTo(p1x, p1y);
        this.context.lineTo(p2x, p2y);
        this.context.stroke();
    }

    createTwoColorGradient(color1, color2, p1x, p1y, p2x, p2y) {
        let gradient = this.context.createLinearGradient(p1x, p1y, p2x, p2y);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    printText(text, x,y, size,font,color) {
        this.context.fillStyle = color;
        this.context.font = `${size} ${font}`;
        this.context.fillText(text,x,y);
    }
} 
