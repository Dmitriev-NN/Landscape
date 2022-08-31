import {TERRAIN} from './terrain.js';
import {FIREFLY} from './firefly.js';
import {GRASS} from './grass.js';

export class RENDERER2 {
	WATCH_INTERVAL = 300;
	OFFSET_Y = 0.1;
	OFFSET_COUNT = 10;
	GRASS_COUNT = 100;
	FIREFLY_COUNT = 10;
	
	constructor(background){
		this.background = background;
		this.setParameters();
		this.reconstructMethods();
		this.setup();
		this.bindEvent();
		this.render();
	}

	setParameters(){
		this.$window = $(window);
		this.$container = $('#jsi-landscape-container');
		this.$canvas = $('<canvas />');
		this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
		this.terrains = [];
		this.grasses = [];
		this.fireflies = [];
		this.watchIds = [];
	}

	reconstructMethods(){
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
		this.watchMouse = this.watchMouse.bind(this);
		this.render = this.render.bind(this);
	}

	setup(){
		this.terrains.length = 0;
		this.grasses.length = 0;
		this.fireflies.length = 0;
		this.watchIds.length = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.offsetX = {base : this.width / 2, source : this.width / 2, destination : this.width / 2};
		this.offsetY = {base : 0, source : 0, destination : 0};
		this.offsetCount = 0;
		this.$canvas.attr({width : this.width, height : this.height});
		this.createElements();
	}
	createElements(){
		this.terrains.push(new TERRAIN(this, 1));
		this.terrains.push(new TERRAIN(this, -1));
		
		for(let i = 0, length = this.GRASS_COUNT * this.width / 500; i < length; i++){
			this.grasses.push(new GRASS(this.width, this.height, this));
		}
		for(let i = 0, length = this.FIREFLY_COUNT * this.width / 500; i < length; i++){
			this.fireflies.push(new FIREFLY(this.width, this.height, this));
		}
	}

	watchWindowSize(){
		this.clearTimer();
		this.tmpWidth = this.$window.width();
		this.tmpHeight = this.$window.height();
		this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
	}

	clearTimer(){
		while(this.watchIds.length > 0){
			clearTimeout(this.watchIds.pop());
		}
	}
	jdugeToStopResize(){
		let width = this.$window.width(),
			height = this.$window.height(),
			stopped = (width == this.tmpWidth && height == this.tmpHeight);
			
		this.tmpWidth = width;
		this.tmpHeight = height;
		
		if(stopped){
			this.setup();
			this.background.setup();
		}
	}

	watchMouse(event){
		this.offsetY.source = this.offsetY.base;
		this.offsetY.destination = -(event.clientY - this.$container.offset().top + this.$window.scrollTop() - this.height / 2) * this.OFFSET_Y;
		this.offsetCount = 0;
	}

	getRandomValue(min, max){
		return min + (max - min) * Math.random();
	}

	bindEvent(){
		this.$window.on('resize', this.watchWindowSize);
		this.$container.on('mousemove', this.watchMouse);
	}

	render(){
		requestAnimationFrame(this.render);
		
		this.context.save();
		this.context.clearRect(0, 0, this.width, this.height);
		
		for(let i = 0, count = this.terrains.length; i < count; i++){
			this.terrains[i].render(this.context, this.offsetY.base);
		}
		for(let i = 0, length = this.grasses.length; i < length; i++){
			this.grasses[i].render(this.context);
		}
		for(let i = 0, length = this.fireflies.length; i < length; i++){
			this.fireflies[i].render(this.context);
		}
		this.context.restore();
		
		if(this.offsetCount < this.OFFSET_COUNT){
			this.offsetCount++;
		}
		this.offsetY.base = this.offsetY.source + (this.offsetY.destination - this.offsetY.source) * this.offsetCount / this.OFFSET_COUNT;
	}
};