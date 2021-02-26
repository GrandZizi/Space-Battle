# Space-Battle
### First Project for General Assembly Immersive Remote
A simple space battle simulation, attacking is based on chance. 

## Screenshot
<img width="1788" alt="Screen Shot 2021-02-24 at 6 20 36 PM" src="https://user-images.githubusercontent.com/65182748/109079936-b4492d80-76cd-11eb-9ab9-1332a4358d1b.png">

### Devlopment Tools
- VS Code 
- Chrome & Dev Tools 

# User Stories
## Player
- able to attack the alien ship
- able to know what alien ship player is going against
- able to see own health and alien health
- able to see attacks happen

## Alien Fleet
- have different types of alien ships
- able to retailate
- vary range of ships in the fleet 

# Unsolved Problems / Learning Curve
- Canvas was something new for me to learn so I tried my best to implement it
- TypeError: A TypeError is thrown due to draw function being called on a undefined alien2Draw object. It is solved once the user clicks the attack button as a alien2Draw object is finally passed.
- TypeError: In some cases, rShip is undefined causing to throw a TypeError
- Alien does not appear until user clicks the attack button
- Beams simply pass through the alien and player objects

# Future additions 
- Better canvas represention of the game
- collision detection
- user can move the ship
- rather than the game be chance-based, user skill will a factor in order to beat the game
- alien ships gravitating towards the user
