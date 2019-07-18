import Game from './game.js';

// Main game scene
export default class DemoGameScene extends Game {
    constructor(game) {
        super();
        this.game = game;

        // Объект ШАР
        this.ball = {
            x: 50,          // Начальное положение по оси X (горизонталь)
            y: 50,          // Начальное положение по оси Y (вертикаль)
            radius: 8,      // Радиус
            angle: 0,       // Угол наклона (градусы) angle * Math.PI / 180
            color: 'white', // Цвет
            vx: 4,          // Скорость движения по оси X; чем больше число, тем выше скорость
            vy: 8,          // Скорость движения по оси Y; чем больше число, тем выше скорость
        
            // Отрисовка на холсте
            draw() {
                game.ctx.beginPath();
                game.ctx.fillStyle = this.color;
                game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
                game.ctx.fill();
            }
        };
    }

    update(dt) {
        if (this.game.keys['87']) this.posY--;  // W
        if (this.game.keys['83']) this.posY++;  // S
        if (this.game.keys['65']) this.posX--;  // A
        if (this.game.keys['68']) this.posX++;  // D
        if (this.game.keys['82']) this.angle++; // R

        // Движение объекта ШАР в пределах границ холста
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        if (this.ball.x + this.ball.radius > this.canvas.width) {
            this.ball.vx = -this.ball.vx;
            this.ball.x = this.canvas.width - this.ball.radius;
        }
    
        else if (this.ball.x -this.ball.radius < 0) {
            this.ball.vx = -this.ball.vx;
            this.ball.x = this.ball.radius;
        }

        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.ball.vy = -this.ball.vy;
            this.ball.y = this.canvas.height - this.ball.radius;
        }
    
        else if (this.ball.y -this.ball.radius < 0) {
            this.ball.vy = -this.ball.vy;
            this.ball.y = this.ball.radius;
        }
    }

    render(dt, ctx, canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ball.draw();
    }
}