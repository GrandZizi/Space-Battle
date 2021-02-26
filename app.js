const canvas = document.querySelector('canvas');
class Alien {
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

const alienFleet = [
	{
		type: 'Mother',
		hull: 12,
		firepower: 6,
		accuracy: null,
		drawing: new Alien(
			canvas.width - canvas.width / 6,
			canvas.height / 2,
			13,
			'purple'
		),
	},
	{
		type: 'Heavy ',
		hull: 7,
		firepower: 4,
		accuracy: null,
		drawing: new Alien(
			canvas.width - canvas.width / 6,
			canvas.height / 2,
			10,
			'green'
		),
	},
	{
		type: 'Light ',
		hull: 4,
		firepower: 3,
		accuracy: null,
		drawing: new Alien(
			canvas.width - canvas.width / 6,
			canvas.height / 2,
			7,
			'#add8e6'
		),
	},
	{
		type: 'Scout',
		hull: 2,
		firepower: 2,
		accuracy: null,
		drawing: new Alien(
			canvas.width - canvas.width / 6,
			canvas.height / 2,
			5,
			'brown'
		),
	},
];

//range for the arr
let range = Math.floor(Math.random() * 5) + 4;

//space to insert different ship types
let arrSpace = range - alienFleet.length;

//loops through the availabe space in the array from range
for (let i = 0; i < arrSpace; i++) {
	//rShip holds a random type of alien ship that will be inserted in alienFleet
	rShip = alienFleet[Math.ceil(Math.random() * arrSpace)];

	//loops through the types of ships
	for (let j = 1; j < 4; j++) {
		//checks if type matches
		if (alienFleet[j].type === rShip.type) {
			//if true, rShip will be inserted at index j
			alienFleet.splice(j, 0, rShip);
			break;
		}
	}
}

const player = {
	hull: 20,
	firepower: 5,
	accuracy: 7,
};
const beams = [];

//shooter function works by decreasing the range of numbers that can be generated
//the set range will be 10, so if accuracy is 7 the range of numbers is 3 (8-10)
//fireChance will random generate a num through that range and if it matches
//shooter() will return the ships fire power, if not return 0
// takes a num, alien object and player object
function shooter(acc, ship, enemyShip) {
	//calculates a chance num for user to hit from  their accuracy
	let chance = 10 - acc;
	//calcus a num that can/cannot determine if the hit hits
	let fireChance = 10 - (Math.floor(Math.random() * chance) + acc);
	if (chance === fireChance) {
		return ship.firepower;
	} else {
		return 0;
	}
}

// ===============================================================================
const dialogueText = document.querySelector('.dialogue-text');
const contBtn = document.querySelector('.continue');
const dialogue = document.querySelector('.dialogue');
const action = document.querySelector('.action');
const playerHealthText = document.querySelector('#player-health');
const alienShipHealth = document.querySelector('#alien-health');
const hitText = document.querySelector('#hit-text');
const missedText = document.querySelector('#missed-text');
const alienDestroyedText = document.querySelector('#alienship-destroyed');
const playerDestroyedText = document.querySelector('#player-destroyed');
const attackbtn = document.querySelector('.attack-button');
const close = document.querySelector('.close');
const notice = document.querySelector('.alert');
const alienType = document.querySelector('#alien-type');
notice.addEventListener('click', () => {
	notice.style.display = 'none';
});

//texts to display
const texts = [
	'There is an alien fleet heading to Earth. Only you can prevent this armaggedon. The alien fleet consist of different type ships: scouts, light ships, heavy ships and The Mother-Ship',
	'After you destroy each ship, another one will appear in order to defend the mother ship',
	'Your ship is strong but not invincible, it can handle 20 points of damage.',
	'Ready to kick alien ass?',
];

//keeps count of left to destroy
shipsIndex = alienFleet.length - 1;
//rolls through the text arr
let textCount = 0;
contBtn.addEventListener('click', () => {
	dialogueText.innerText = texts[textCount];
	if (textCount >= 4) {
		dialogue.style.display = 'none';
		action.style.display = 'block';
		canvas.style.display = 'block';
		attackbtn.style.display = 'block';
		playerHealthText.innerText = player.hull;
		alienType.innerText = `Alien ${alienFleet[shipsIndex].type} Ship Health`;
		alienShipHealth.innerText = alienFleet[alienFleet.length - 1].hull;
	}
	textCount++;
});

//used to draw the following alien ship
let alien2Draw;
attackbtn.addEventListener('click', () => {
	alien2Draw = alienFleet[shipsIndex].drawing;
	playerHealthText.innerText = player.hull;
	alienShipHealth.innerText = alienFleet[shipsIndex].hull;

	//calculates if the player is able to hit the ship
	let playerAction = shooter(player.accuracy, player, alienFleet[shipsIndex]);

	if (playerAction === 0) {
		beams.push(
			new Beam(canvas.width / 6, canvas.height / 2, 3, 'yellow', {
				x: 1,
				y: Math.ceil((Math.random() - 0.5) * 10),
			})
		);
		notice.style.display = 'block';
		hitText.style.display = 'none';
		missedText.style.display = 'block';
	} else {
		beams.push(
			new Beam(canvas.width / 6, canvas.height / 2, 3, 'yellow', { x: 1, y: 0 })
		);
		alienFleet[shipsIndex].hull -= playerAction;
		notice.style.display = 'block';
		missedText.style.display = 'none';
		hitText.style.display = 'block';
	}

	//checks alien health
	if (alienFleet[shipsIndex].hull <= 0) {
		alienDestroyedText.style.display = 'block';
		shipsIndex--;
		alienType.innerText = `Alien ${alienFleet[shipsIndex].type} Ship Health`;
	} else {
		alienFleet[shipsIndex].accuracy = Math.floor(Math.random() * 4) + 5;

		//calculates if the alien is able to hit
		let cpuAction = shooter(
			alienFleet[shipsIndex].accuracy,
			alienFleet[shipsIndex],
			player
		);

		if (cpuAction === 0) {
			beams.push(
				new Beam(
					canvas.width - canvas.width / 6,
					canvas.height / 2,
					3,
					'blue',
					{ x: -1, y: Math.ceil((Math.random() - 0.5) * 10) }
				)
			);
		} else {
			player.hull -= cpuAction;
			beams.push(
				new Beam(
					canvas.width - canvas.width / 6,
					canvas.height / 2,
					3,
					'blue',
					{ x: -1, y: 0 }
				)
			);
		}

		if (player.hull <= 0) {
			playerDestroyedText.style.display = 'block';
		}
	}
});

// ===================================================================

const c = canvas.getContext('2d');

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

class Beam {
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

let animateId;
function animate() {
	animateId = requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.1)';
	c.fillRect(0, 0, 1000, 1000);
	let player = new Player(canvas.width / 6, canvas.height / 2, 10, 'red');
	player.draw();
	alien2Draw.draw();

	beams.forEach((beam) => {
		beam.update();
	});
}
animate();
