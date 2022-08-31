export class GRASS {
	constructor(width, height, manager){
	this.width = width;
	this.height = height;
	this.manager = manager;
	this.init();
}

	GRASS_COLOR = 'hsl(%hue, 100%, 20%)';
	SHAKING_FREQUENCY = Math.PI / 100;
	MAX_SHAKING_RATE = 0.2;
	GRASS_WIDTH = 4;
	BOTTOM_OFFSET = 0.01;
	THRESHOLD = 100;
	
	init(){
		let hue = this.manager.getRandomValue(80, 160) | 0;
		
		this.darkColor = this.GRASS_COLOR.replace('%hue', hue);
		this.lightColor = this.GRASS_COLOR.replace('%hue', hue);
		this.theta = Math.PI * 2 * Math.random();
		this.grassHeight = this.height * this.manager.getRandomValue(0.2, 0.5);
		this.centerX = this.manager.getRandomValue(-this.THRESHOLD, this.width + this.THRESHOLD);
		this.bottom = this.height * (1 + this.BOTTOM_OFFSET * Math.random());
	}

	render(context){
		let dx = Math.sin(this.theta) * this.grassHeight * this.MAX_SHAKING_RATE;
		
		context.fillStyle =  this.darkColor;
		context.beginPath();
		context.moveTo(this.centerX - this.GRASS_WIDTH / 2, this.bottom);
		context.quadraticCurveTo(this.centerX + dx / 2, this.bottom - this.grassHeight / 2, this.centerX + this.GRASS_WIDTH / 2 + dx, this.bottom - this.grassHeight);
		context.quadraticCurveTo(this.centerX + this.GRASS_WIDTH / 2 + dx / 2, this.bottom - this.grassHeight / 2, this.centerX + this.GRASS_WIDTH / 2, this.bottom);
		context.closePath();
		context.fill();
		
		this.theta += this.SHAKING_FREQUENCY;
		this.centerX--;
		
		if(this.centerX < -this.THRESHOLD){
			this.centerX += this.width + this.THRESHOLD * 2;
		}
	}
};