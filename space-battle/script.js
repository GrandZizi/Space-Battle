const alienFleet = [
	{
		type: 'MotherShip',
		hull: 12,
		firepower: 6,
		accuracy: null,
	},
	{
		type: 'heavy',
		hull: 7,
		firepower: 4,
		accuracy: null,
	},
	{
		type: 'light',
		hull: 4,
		firepower: 3,
		accuracy: null,
	},
	{
		type: 'scout',
		hull: 2,
		firepower: 2,
		accuracy: null,
	},
];

//range for the arr
let range = Math.floor(Math.random() * 5) + 4;
// console.log(`range ${range}`);

//space to insert different ship types
let arrSpace = range - alienFleet.length;
// console.log(`arrSpace: ${arrSpace}`);

//loops through the availabe space in the array from range
for (let i = 0; i < arrSpace; i++) {
	//rShip holds a random type of alien ship that will be inserted in alienFleet
	rShip = alienFleet[Math.ceil(Math.random() * arrSpace)];
	// console.log(rShip);

	//loops through the types of ships
	for (let j = 1; j < 4; j++) {
		// console.log(`inner loop: ${j}`);
		//checks if type matches
		if (alienFleet[j].type === rShip.type) {
			//if true, rShip will be inserted at index j
			alienFleet.splice(j, 0, rShip);
			break;
		}
	}
}
// console.log(alienFleet);

const player = {
	hull: 30,
	firepower: 5,
	accuracy: 7,
};

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

let yesOrNo = prompt('Welcome to Space Battle, ready to play? (yes/no)');
while (yesOrNo === 'yes') {
	alert(
		'There is an alien fleet heading to Earth. Only you can prevent this armaggedon. The alien fleet consist of six ships: scouts, rapid fire, cannon and The Mother-Ship'
	);
	alert(
		'After you destroy each ship, another one will appear in order to defend the mother ship'
	);
	alert(
		'Your ship is strong but not invincible, it can handle 20 points of damage. After destroying each ship you can choose to either continuing the fight or flee and hope they see us as a threat and flee'
	);
	alert("Ready to kick alien ass? Don't forget to open the console");

	for (let i = alienFleet.length - 1; i >= 0; i--) {
		//runs code block if ship still has health
		if (player.hull > 0) {
			while (alienFleet[i].hull >= 0) {
				//randomly set alien accuracy to 5-8
				alienFleet[i].accuracy = Math.floor(Math.random() * 3) + 5;
				console.log(` alien acc : ${alienFleet[i].accuracy}`);

				//should return damage of player ship
				let playerAction = shooter(player.accuracy, player, alienFleet[i]);
				console.log(`playerAction ${playerAction}`);

				//subtracts health for alien
				alienFleet[i].hull -= playerAction;
				console.log(` alien health: ${alienFleet[i].hull}`);

				//checks if alien has health
				if (alienFleet[i].hull <= 0) {
					console.log('enemy ship destroyed');
					console.log('-------------------------------');
					//breaks while loop if alien has no health
					break;
				} else {
					//should return alien ship firepower if chance matches
					let cpuAction = shooter(
						alienFleet[i].accuracy,
						alienFleet[i],
						player
					);
					console.log(`cpuAction : ${cpuAction}`);

					//suntracts health for player
					player.hull -= cpuAction;
					if (player.hull <= 0) {
						alert('Oh no!! You died');
						break;
					}
					console.log(` player health: ${player.hull}`);
					console.log(`alienFlet[${i}]`);
					console.log('-------------------------------');
				}
			}
			//tells what the ship index is
			alert(i);
		} else {
			//if no health, else block breaks loop
			break;
		}
	}
	//paths for when for-loop completes
	if (player.hull > 0) {
		yesOrNo = prompt('You saved Earth! Wanna do it again? (yes/no)');
	} else {
		yesOrNo = prompt('Earth is destroyed. Try again? (yes/no)');
	}
}
