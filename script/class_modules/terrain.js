export class TERRAIN {
	constructor(renderer, offset){
	this.renderer = renderer;
	this.offset = offset;
	this.init();
}

	DISPLACEMENT = 80;
	DELTA_DESPLACEMENT = 0.6;
	TERRAIN_SPEED = 2; // Было TICK
	
	init(){
		this.vertices = this.createVertices();
		this.count = this.vertices.length;
	}

	createVertices(base){
		let power = Math.pow(2, Math.ceil(Math.log(this.renderer.width / this.TERRAIN_SPEED + 1) / Math.log(2))),
			displacement = this.renderer.height / this.renderer.getRandomValue(5, 10),
			vertices = [];
			
		vertices[0] = base ? base : (this.renderer.height * (0.5 + this.renderer.getRandomValue(0.05, 0.3) * this.offset));
		vertices[power] = this.renderer.height * (0.5 + this.renderer.getRandomValue(0.05, 0.3) * this.offset);
		
		for(let i = 1; i < power; i *= 2) {
			let offset = power / i / 2;
			
			for(let j = offset; j < power; j += offset * 2) {
				vertices[j] = ((vertices[j - offset] + vertices[j + offset]) / 2) + Math.floor(displacement * (1 - Math.random())) * this.offset;
			}
		  	displacement *= this.DELTA_DESPLACEMENT;
		}
		return vertices.slice(2);
	}
	
	render(context, offsetY){
		this.vertices = this.vertices.slice(1);
		
		if(this.vertices.length < this.count){
			this.vertices = this.vertices.concat(this.createVertices(this.vertices[this.vertices.length - 1]));
		}
		let base = this.renderer.height / 2 * (1 + this.offset);
		
		context.fillStyle = 'hsl(0, 0%, 0%)';
		context.beginPath();
		context.moveTo(0, base);
		
		for(let i = 0, count = this.vertices.length; i < count; i++){
			context.lineTo(this.TERRAIN_SPEED * i, this.vertices[i] + offsetY);
		}
		context.lineTo(this.renderer.width, base);
		context.closePath();
		context.fill();
	}
};