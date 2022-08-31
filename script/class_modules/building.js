import {WINDOW} from './window.js';
import {LIGHT} from './light.js';


export class BUILDING {
	constructor(renderer){
	this.renderer = renderer;
	this.init(false);
}

	FOCUS_POSITION = 500;
	FAR_LIMIT = 800;
	WINDOW_RATE = 0.8;
	LIGHT_RATE = 0.3;
	VELOCITY = 0.2;
	
	init(toReset){
		this.setParameters(toReset);
		this.createObjects();
	}

	setParameters(toReset){
		this.x = toReset ? this.renderer.width : this.renderer.getRandomValue(-this.renderer.width, this.renderer.width, 1);
		this.y = this.renderer.OFFSET_Y;
		this.z = this.renderer.getRandomValue(0, this.FAR_LIMIT, 1);
		this.vx = -this.VELOCITY;
		this.height = Math.round(this.renderer.getRandomValue(this.renderer.height / 8, this.renderer.baseY , 4) / 10) * 10;
		this.width = Math.round(this.renderer.height / 6 * Math.sqrt(this.height / this.renderer.height) / 10) * 10;
		this.y += this.height;
		this.offsetX = 0;
		this.hue = this.renderer.getRandomValue(220, 260, 1);
		this.windows = [];
		this.lights = [];
	}

	createObjects(){
		let axis = this.getAxis();
		
		for(let row = 0, rowMax = this.height / 10; row < rowMax; row++){
			for(let column = 0, columnMax = this.width / 10; column < columnMax; column++){
				if(Math.random() <= this.WINDOW_RATE){
					this.windows.push(
						new WINDOW(
							axis.x + 3 + 10 * column * axis.rate, // x
							axis.y + 3 + 10 * row * axis.rate,	// y
							4 * axis.rate, // width
							4 * axis.rate, // height
							axis.rate, // rate
							this.renderer // renderer (function)
							));
				}
			}
		}
		if(Math.random() < this.LIGHT_RATE && this.z < this.FAR_LIMIT / 3){
			for(let column = 0, columnMax = this.renderer.getRandomValue(3, 5, 1); column < columnMax; column++){
				this.lights.push(new LIGHT(axis.x + axis.width * (column + 0.5) / columnMax, axis.y - 3 * axis.rate, 3 * axis.rate, axis.rate, this.renderer));
			}
		}
	}

	getAxis(){
		let rate = this.FOCUS_POSITION / (this.z + this.FOCUS_POSITION);
		return {x : this.x * rate, y : -this.y * rate, width : this.width * rate, height : this.height * rate, rate : rate};
	}

	render(context, brightness){
		let axis = this.getAxis();
		this.offsetX += this.vx * axis.rate;
		
		if(axis.x + this.offsetX > this.renderer.width / 2){
			return;
		}else if(axis.x + axis.width + this.renderer.width / 2 + this.offsetX < 0){
			this.init(true);
			return;
		}
		context.save();
		context.translate(this.renderer.width / 2 + this.offsetX, this.renderer.baseY);
		
		for(let i = -0.5; i <= 1; i += 1.5){
			context.save();
			context.scale(1, i);
			
			let gradient = context.createLinearGradient(axis.x, axis.y, axis.x, axis.y + axis.height);
			gradient.addColorStop(0, 'hsl(' + this.hue + ', ' + (30 + 30 * i) + '%, ' + 30 * axis.rate * brightness + '%)');
			gradient.addColorStop(1, 'hsl(' + this.hue + ', ' + (30 + 30 * i) + '%, ' + 5 * axis.rate * brightness + '%)');
			context.fillStyle = gradient;
			context.fillRect(axis.x, axis.y, axis.width, axis.height);
			
			for(let j = 0, length = this.windows.length; j < length; j++){
				this.windows[j].render(context);
			}
			for(let j = 0, length = this.lights.length; j < length; j++){
				this.lights[j].render(context);
			}
			context.restore();
		}
		context.restore();
	}
};