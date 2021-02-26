//creating the canvas tools
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const centerY = canvas.height / 2;
const centerX = canvas.width / 2;

// =================================================
// Player class still needs its perks
class Player {
	//can pass where the player needs to be but for now it is set to the center
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	//draws the player
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
}
//creates the player with 30px radius and color red
const player = new Player(200, 300, 30, 'red');
player.draw();

// =================================================
// can be changed to different types of beams but for now will only be one
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

// =================================================
class Alien {
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
	update() {
		this.draw();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
}
// =================================================
// with this i am able to have multiple beams or mulitiple aliens
// const beam = new Beam(centerX, centerY, 5, 'red', {x:1,y:1});
const beams = [];
const aliens = [];

function spawnAliens() {
	// setInterval(() => {
	let radius = Math.random() * 25 + 5;
	let x, y; // used to place the aliens

	//randomizes where each alien can be
	//in the if statement, either the alien can be on the left or right side with a random placement on the y-axis, else can be on the top or bottom with a random placement on the x-axis
	if (Math.random() < 0.5) {
		// if Math.random() falls below .5 alien will be placed on left side of screen, if not placed on the right side of screen
		x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
		y = Math.random() * canvas.height;
	} else {
		x = Math.random() * canvas.width;
		y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
	}
	// calc that brings alien towards the player
	const angle = Math.atan2(centerY - y, centerX - x);
	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle),
	};

	//pushes new alien for animation
	aliens.push(new Alien(x, y, radius, 'blue', velocity));
	// }, 1000);
}

//basically a good infinite forloop that is about to animate
let animateId;
function animate() {
	// causes the loop
	animateId = requestAnimationFrame(animate);

	c.fillStyle = 'rgba(0,0,0,0.1)';
	// clears the window
	c.fillRect(0, 0, canvas.width, canvas.height);
	//redraws the player
	player.draw();
	// for every click, the newly added beam from the eventListener will appear and do its animation
	beams.forEach((beam, index) => {
		beam.update();

		if (
			beam.x + beam.radius < 0 ||
			beam.x - beam.radius > canvas.width ||
			beam.y - beam.radius < 0 ||
			beam.y + beam.radius > canvas.height
		) {
			setTimeout(() => {
				beams.splice(index, 1);
			}, 0);
		}
	});

	aliens.forEach((alien, index) => {
		alien.update();
		const dist = Math.hypot(player.x - alien.x, player.y - alien.y);

		//collsion detection for when alien touches player
		if (dist - alien.radius - player.radius < 0) {
			cancelAnimationFrame(animateId);
		}

		beams.forEach((beam, beamIndex) => {
			const dist = Math.hypot(beam.x - alien.x, beam.y - alien.y);

			//collsion detection
			if (dist - alien.radius - beam.radius < 1) {
				setTimeout(() => {
					aliens.splice(index, 1);
					beams.splice(beamIndex, 1);
				}, 0);
			}
		});
	});
}

addEventListener('click', (e) => {
	console.log(beams);

	// calcus the angle from where player clicks
	const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);

	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle),
	};

	// pushes a new beam object into the beams arr for animation
	beams.push(new Beam(player.x, player.y, 5, 'red', velocity));
});

spawnAliens();
animate();