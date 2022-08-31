export class FIREFLY {
	constructor(width, height, manager){
	this.width = width;
	this.height = height;
	this.manager = manager;
	this.init();
}

	RANGE_MARGIN = 10;
	VELOCITY = 1;
	
	init(){
		this.radius = this.manager.getRandomValue(4, 6);
		this.x = this.width * Math.random();
		this.y = this.manager.getRandomValue(this.height / 2, this.height);
		this.velocityRate = this.VELOCITY * Math.pow(this.radius / 6, 3);
		this.phi = Math.PI * 2 * Math.random();
		this.vx = Math.cos(this.phi) * this.velocityRate;
		this.vy = Math.sin(this.phi) * this.velocityRate;
		this.accelaration = this.manager.getRandomValue(-Math.PI / 300, Math.PI / 300);
		this.frequency = this.manager.getRandomValue(Math.PI / 200, Math.PI / 100);
		this.theta = Math.PI * 2 * Math.random();
		this.opacity = 0.5 + 0.3 * Math.sin(this.theta);
	}
	
	render(context){
		let gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
		gradient.addColorStop(0, 'hsla(60,  80%, 100%,' + this.opacity + ')');
		gradient.addColorStop(0.3, 'hsla(60, 80%, 80%,' + this.opacity + ')');
		gradient.addColorStop(0.4, 'hsla(60, 80%, 60%,' + this.opacity + ')');
		gradient.addColorStop(0.6, 'hsla(60, 80%, 40%,' + this.opacity * 0.7 + ')');
		gradient.addColorStop(1, 'hsla(60, 80%, 40%, 0)');
		
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		
		this.x += this.vx;
		this.y += this.vy;
		
		if(this.x < -this.RANGE_MARGIN || this.x > this.width + this.RANGE_MARGIN
			|| this.y < this.height / 2 && this.opacity < 0.1 || this.y > this.height + this.RANGE_MARGIN){
			this.x = this.manager.getRandomValue(0, this.width);
			this.y = this.manager.getRandomValue(this.height / 2, this.height);
			this.theta = 0;
		}
		this.theta += this.frequency;
		this.opacity = 0.5 - 0.5 * Math.cos(this.theta);
		
		if(this.theta > Math.PI * 2){
			this.accelaration = this.manager.getRandomValue(-Math.PI / 300, Math.PI / 300);
			this.theta %= Math.PI * 2;
		}
		this.phi += this.accelaration;
		this.phi %= Math.PI * 2;
		this.vx = Math.cos(this.phi) * this.velocityRate;
		this.vy = Math.sin(this.phi) * this.velocityRate;
	}
};