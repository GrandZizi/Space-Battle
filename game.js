const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

function spawn() {}

// ===========================================================
class Player {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
}
const player = new Player(innerWidth / 6, innerHeight / 2, 50, 'red');
const beams = [];

// ===========================================================
class Beam {
	//values can be changed to vary types of beams
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	//when called it will redraw the beam and increase its position
	update() {
		this.draw();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}
// ===========================================================
class Alien {
	types = [
		{
			type: 'MotherShip',
			radius: 50,
			color: 'purple',
		},
		{
			type: 'heavy',
			radius: 35,
			color: 'blue',
		},
		{
			type: 'rapid',
			radius: 30,
			color: '',
		},
	];

	//constructors just initailizes the position of the alien ship
	constructor(x, y, velocity) {
		this.x = x;
		this.y = y;
		// this.velocity = velocity;
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	drawMotherShip() {
		c.beginPath();
		c.arc(this.x, this.y, this.types[0].radius, Math.PI * 2, false);
		c.fillStyle = this.types[0].color;
		c.fill();
	}
	drawHeavy() {
		c.beginPath();
		c.arc(this.x, this.y, this.types[1].radius, Math.PI * 2, false);
		c.fillStyle = this.types[1].color;
		c.fill();
	}
	drawRapid() {
		c.beginPath();
		c.arc(this.x, this.y, this.types[2].radius, Math.PI * 2, false);
		c.fillStyle = this.types[2].color;
		c.fill();
	}
	motherShipRadius() {
		return this.types[0].radius;
	}
	heavyRadius() {
		return this.types[1].radius;
	}
	rapidRadius() {
		return this.types[2].radius;
	}
	update() {
		this.draw();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}
const alien = new Alien(innerWidth - innerWidth / 6, innerHeight / 2);

function makeAliens() {
	fleetRange = Math.ceil(Math.random() * 5 + 4);

	for (let i = 1; i < fleetRange; i++) {}
}
//===========================================================

let animateId;
function animate() {
	animateId = requestAnimationFrame(animate);

	//draws the background and the ship
	c.fillStyle = 'rgb(0,0,0,0.1)';
	c.fillRect(0, 0, innerWidth, innerHeight);
	player.draw();
	alien.drawMotherShip();

	// animation for the beam
	beams.forEach((beam) => {
		beam.update();

		//distance formula
		const dist = Math.hypot(beam.x - alien.x, beam.y - alien.y);
		if (dist - beam.radius - alien.motherShipRadius() < 1) {
			console.log('hit');
		}
	});
}

addEventListener('click', (e) => {
	console.log(player.y);

	// calcus the angle from where player clicks
	const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);

	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle),
	};

	// pushes a new beam object into the beams arr for animation
	beams.push(new Beam(player.x, player.y, 5, 'blue', velocity));
});

animate();
