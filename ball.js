
class Ball {
    constructor(graphics) {
        this.xpos = 0;
        this.ypos = 0;
        this.xvel = 0;
        this.yvel = 0;
        this.size = 0;
        this.fx = graphics;
        this.color = "#ffffff";
    }
    
    init() {
        this.size = this.fx.height() * 0.05;
        this.xpos = this.fx.width()/2 - this.size/2;
        this.ypos = this.fx.height()/2 - this.size/2;
        this.xvel = this.fx.width() * 0.005;
        this.yvel = 0;
    }

    reset() {
        this.init();
    }
    
    draw() {
        this.fx.drawRect(this.xpos,this.ypos,this.size,this.size,this.color);
    }
    
    move() {
        this.xpos = this.xpos + this.xvel;
        this.ypos = this.ypos + this.yvel;
    }
    
    deltaY(paddle) {
        return this.ypos - ( paddle.ypos + paddle.height / 2);
    }

    deflection(paddle) {
        this.xvel = -this.xvel;
        this.yvel = this.deltaY(paddle) * 0.25;
    }

    collisions(paddle1, paddle2) {
        this.checkForPerimeterCollisions();
        this.checkForCollisionWith(paddle1);
        this.checkForCollisionWith(paddle2);
    }

    checkForCollisionWith(paddle) {

        let aLeftOfB = ( paddle.xpos + paddle.width ) < ( this.xpos );
        let aRightOfB = ( paddle.xpos ) > ( this.xpos + this.size );
        let aAboveB = ( paddle.ypos ) > ( this.ypos + this.size );
        let aBelowB = ( paddle.ypos + paddle.height ) < ( this.ypos );

        let collided = !( aLeftOfB || aRightOfB || aAboveB || aBelowB );

        if ( collided ) {
            this.deflection(paddle);
        }
    }

    checkForPerimeterCollisions() {

        let ballAtTop = ( this.ypos + this.size/2 ) < 0;
        let ballAtBottom = this.ypos > ( this.fx.height() - this.size/2);

        if ( ballAtTop ) {
            this.yvel = Math.abs(this.yvel);
        }
        if ( ballAtBottom ) {
            this.yvel = -Math.abs(this.yvel);
        }

        let ballLeftOfCanvas = ( this.xpos + this.size ) < 0;
        let ballRightOfCanvas = ( this.xpos ) > this.fx.width();

        if ( ballLeftOfCanvas || ballRightOfCanvas ) {
            this.reset();
        }

    }
}
