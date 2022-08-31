export class LIGHT {
		constructor(x, y, radius, rate, renderer){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.rate = rate;
		this.renderer = renderer;
		this.init();
	}
	
		DELTA_THETA = Math.PI / 500;
		
		init(){
			this.theta = this.renderer.getRandomValue(0, Math.PI * 2, 1);
		}
	
		render(context){
			let gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius),
				rate = Math.abs(Math.sin(this.theta));
			gradient.addColorStop(0, 'hsl(0, 100%, ' + 100 * this.rate * rate + '%)');
			gradient.addColorStop(0.3, 'hsl(0, 100%, ' + 80 * this.rate * rate + '%)');
			gradient.addColorStop(1, 'hsl(0, 100%, ' + 30 * this.rate * rate + '%)');
			
			context.save();
			context.fillStyle = gradient;
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			context.fill();
			context.restore();
			
			this.theta += this.DELTA_THETA;
			this.theta %= Math.PI * 2;
		}
	}
