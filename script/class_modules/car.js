export class CAR {
	constructor(renderer){
	this.renderer = renderer;
	this.init(false);
};

	RADIUS = 4;
	
	init(toReset){
		let upper = Math.random() > 0.5;
		this.x = toReset ? (upper ? -this.RADIUS : this.renderer.width) : this.renderer.getRandomValue(0, this.renderer.width, 1);
		this.y = this.renderer.baseY + this.renderer.OFFSET_Y * (upper ? -1 : 0);
		this.vx = this.renderer.getRandomValue(5, 8, 1) / 10 * (upper ? 1 : -1);
	}
	
	render(context){
		context.save();
		context.translate(this.x, this.y);
		context.scale(1, 0.6);
		context.shadowColor = 'hsl(220, 90%, 90%)';
		context.shadowOffsetX = this.RADIUS * (this.vx >= 0 ? 1 : -1);
		context.shadowBlur = this.RADIUS * 1.5;
		
		let gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.RADIUS);
		gradient.addColorStop(0, 'hsl(220, 80%, 100%)');
		gradient.addColorStop(0.3, 'hsl(220, 80%, 90%)');
		gradient.addColorStop(1, 'hsl(220, 80%, 30%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(0, 0, this.RADIUS, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		this.x += this.vx;
		
		if(this.x < -this.RADIUS || this.x > this.renderer.width + this.RADIUS){
			this.init(true);
		}
	}
};