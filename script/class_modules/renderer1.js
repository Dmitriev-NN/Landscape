import { BUILDING } from "./building.js";
import { CAR } from "./car.js";
import { MOON } from "./moon.js";

export class RENDERER1 {
	
	BUILDING_COUNT = 20;
	CAR_COUNT = 5;
	BASE_Y_RATE = 2 / 3;
	OFFSET_Y = 5;
	
	constructor(){
		this.setParameters();
		this.setup();
		this.reconstructMethods();
		this.render();
		return this;
	}
	
	setParameters(){
		this.$container = $('#jsi-landscape-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container);
		this.context = this.$canvas.get(0).getContext('2d');
		this.baseY = this.height * this.BASE_Y_RATE;
		this.buildings = [];
		this.cars = [];
		this.brightness = 0;
	}

	setup(){
		this.buildings.length = 0;
		this.cars.length = 0;
		this.baseY = this.height * this.BASE_Y_RATE;
		this.brightness = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas.attr({width : this.width, height : this.height});
		this.createElements();
	}

	createElements(){
		for(let i = 0, length = this.BUILDING_COUNT * this.width / 500; i < length; i++){
			this.buildings.push(new BUILDING(this));
		}
		for(let i = 0, length = this.CAR_COUNT * this.width / 500 | 0; i < length; i++){
			this.cars.push(new CAR(this));
		}
		this.moon = new MOON(this);
	}

	reconstructMethods(){
		this.render = this.render.bind(this);
	}
	
	getRandomValue(min, max, weight){
		return min + Math.round((max - min) * Math.pow(Math.random(), weight));
	}

	render(){
		requestAnimationFrame(this.render);
		this.context.clearRect(0, 0, this.width, this.height);
		
		let gradient = this.context.createLinearGradient(0, 0, 0, this.baseY - this.OFFSET_Y);
		gradient.addColorStop(0, 'hsl(220, 100%, ' + (20 + 20 * this.brightness) + '%)');
		gradient.addColorStop(1, 'hsl(220, 100%, 0%)');
		this.context.fillStyle = gradient;
		this.context.fillRect(0, 0, this.width, this.baseY - this.OFFSET_Y);
		this.brightness = this.moon.render(this.context);
		
		
		this.buildings.sort(function(buildings1, buildings2){
			return buildings2.z - buildings1.z;
		});
		for(let i = 0, length = this.buildings.length; i < length; i++){
			this.buildings[i].render(this.context, (this.brightness + 1) / 2);
		}
		this.context.clearRect(0, this.baseY - this.OFFSET_Y, this.width, this.OFFSET_Y * 2);
		this.context.fillStyle = 'hsla(0, 0%, 0%, 0.4)';
		this.context.fillRect(0, this.baseY + this.OFFSET_Y, this.width, this.height - this.baseY - this.OFFSET_Y);
		
		for(let i = 0, length = this.cars.length; i < length; i++){
			this.cars[i].render(this.context);
		}
	}
};