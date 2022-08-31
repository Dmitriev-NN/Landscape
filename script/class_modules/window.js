export class WINDOW {
	constructor(x, y, width, height, rate, renderer){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.rate = rate;
		this.renderer = renderer;
		this.RATE = 0.00005;
		this.init();
	};
		
		init (){
			this.hue = this.renderer.getRandomValue(100, 240, 1);
			this.light = Math.random() >= this.RATE;
		}
	
		render(context){
			if(Math.random() < this.RATE){
				this.light = !this.light;
			}
			if(!this.light){
				return;
			}
			context.fillStyle = 'hsl(' + this.hue + ', 100%, ' + 80 * this.rate + '%)';
			context.fillRect(this.x, this.y, this.width, this.height);
		}
	};