// Main Game Class
export default class Game {
    
    constructor(Scene) {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setScene(Scene);
        this.initInput();
        this.start();
    }

    initInput() {
        // Save keys state
        this.keys = {};
        document.addEventListener('keydown', e => {
            this.keys[e.which] = true; 
        });

        document.addEventListener('keyup', e => {
            this.keys[e.which] = false;
        });
    }

    checkKeyPress(keyCode) {
        // handle key press + release
        let isKeyPressed = !!this.keys[keyCode];
        this.lastKeyState = this.lastKeyState || {};

        // disallow key event from previous scene
        if (typeof this.lastKeyState[keyCode] === 'undefined') {
            this.lastKeyState[keyCode] = isKeyPressed;
            return false;
        }

        // allow press only when state was changed
        if (this.lastKeyState[keyCode] !== isKeyPressed) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return isKeyPressed;
        } else {
            return false;
        }
    }

    setScene(Scene = DefaultScene) {
        this.activeScene = new Scene(this);
    }

    update(dt) {
        this.activeScene.update(dt);
    }

    render(dt, ctx, canvas) {
        this.ctx.save();
        this.activeScene.render(dt, this.ctx, this.canvas);
        this.ctx.restore();
    }

    start() {
        let last = performance.now(),
            fps = 30,
            slomo = 1, // Slow motion multiplier
            step = 1 / fps,
            slowStep = slomo * step,
            dt = 0,
            now;

        let frame = () => {
            now = performance.now();
            dt = dt + Math.min(1, (now - last) / 1000);
            while(dt > slowStep) {
                dt = dt - slowStep;
                this.update(step);
            }
            last = now;

            this.render(dt / slomo * fps);
            requestAnimationFrame(frame);
        };

        requestAnimationFrame(frame);
    }
}

// Default scene if constructor Game is empty
class DefaultScene {
    constructor(game) {
        this.game = game;
    }

    update(dt) {}

    render(dt, ctx, canvas) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Display text
        const defaultText = 'It Works!';
        ctx.textBaseline = 'top';
        ctx.font = '100px Helvetica';
        ctx.fillStyle = 'gray';
        ctx.fillText(defaultText, (canvas.width - ctx.measureText(defaultText).width) / 2, 
                        canvas.height / 2 - 50);
    }
}
// =============================================================================