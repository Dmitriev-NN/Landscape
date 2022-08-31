export class MOON {
	RADIUS = 100;
	DELTA_THETA = Math.PI / 2000;
	
	constructor({width, baseY}){
		this.x = width / 2;
		this.y = baseY;
		this.theta = Math.PI * 3 / 2;
		this.phi = Math.PI;
	}

	init(){
		return this;
	}

	render(context){
		for(var i = -0.5; i <= 1; i += 1.5){
			context.save();
			context.translate(this.x, this.y);
			context.scale(1, i);
			context.shadowColor = 'hsl(60, 90%, 90%)';
			context.shadowBlur = 20;
			context.save();
			
			var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.RADIUS);
			gradient.addColorStop(0, 'hsl(60, ' + (40 + 20 * i) + '%, 60%)');
			gradient.addColorStop(0.8, 'hsl(60,' + (40 + 20 * i) + '%, 80%)');
			gradient.addColorStop(1, 'hsl(60,' + (40 + 20 * i) + '%, 80%)');
			context.fillStyle = gradient;
			context.beginPath();
			context.translate(0, -this.y * 2 / 3);
			context.rotate(Math.PI * 3 / 4 + this.phi);
			context.save();
			context.scale(1, Math.cos(this.theta));
			context.arc(0, 0, this.RADIUS, 0, Math.PI, false);
			context.restore();
			context.arc(0, 0, this.RADIUS, Math.PI, Math.PI * 2, false);
			context.fill();
			context.restore();
			context.restore();
		}
		this.theta += this.DELTA_THETA;
		this.phi = (this.theta >= Math.PI && this.theta <= Math.PI * 2) ? Math.PI : 0;
		this.theta %= Math.PI * 2;
		return Math.cos(this.theta);
	}
};