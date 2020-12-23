
class Paddle {
    constructor(position, graphics) {
        this.leftPaddle = 1;
        this.rightPaddle = 2;
        this.position = position;
        this.fx = graphics;
        this.xpos = 0;
        this.ypos = 0;
        this.width = 0;
        this.height = 0;
        this.offset = 35;
        this.score = 0;
    }

    init() {
        this.height = this.fx.height() * 0.25;
        this.width = this.fx.width() * 0.05;
        this.ypos = this.fx.height()/2 - this.height/2;
        this.xpos = this.position == this.leftPaddle ? 0 : this.fx.width() - this.width;
        this.score = 0;
    }

    reset() {
        this.ypos = this.fx.height()/2 - this.height/2;
        this.xpos = this.position == this.leftPaddle ? 0 : this.fx.width() - this.width;
        this.score = 0;
    }

    draw() {
        this.fx.drawRect(this.xpos,this.ypos,this.width,this.height,"#ffffff");
    }

    move(ball) {
        let centerY = this.ypos + this.height/2;
        if ( centerY < ball.ypos - this.offset ) {
            this.ypos += 10;
        }
        else if ( centerY > ball.ypos + this.offset ) {
            this.ypos -= 10;
        }
    }

    moveWithMouse(event) {
        let rect = this.fx.getCanvas().getBoundingClientRect();
        let root = document.documentElement;
        let mouseY = event.clientY - rect.top - root.scrollTop;
        this.ypos = mouseY - ( this.height/2 );
    }

}

