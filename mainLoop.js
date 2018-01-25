var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
rectWidth = 20, //basic game unit size (pixles)
maxWidth = canvas.width, //add maxHight if not perfect square
maxHeight = canvas.height, //add maxHight if not perfect square
FPS = 30,
baseSpeed = 10*rectWidth/FPS, //4
mouse, //mouse x and y for drawing range
currentTower = 0, //tower type selector.
//vertical borders:
// firstBorder = maxHeight,
// secondBorder = maxWidth/2,
// thirdBorder = maxWidth*3/4,
widthBorder = maxWidth*5/6,   // x++,y
heightBorder = maxWidth*3/4, // x,y--
//points/statistics
attackerPoints = 0,
stopped = 0,
//counter for when to add enemy units
addEnemyTimer = 60,
money = 250,
moneyIncrement = 5;


//draw stuff
mainLoopRender = function() {
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    enemies[i].draw();
  }
  
  // drawMouse(); //potential gun radius
  requestAnimationFrame(mainLoopRender);
};

//game logic (seperate from draw stuff)
mainLoopLogic = function() {
  checkForDead();
  addEnemyTimer--;
  if(addEnemyTimer<1) {
    addEnemy()
    addEnemyTimer = (stopped > 40) ? 20 : 30;  //how quicklly a new enemy is generated
  }
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    //true if attacker scored
    if(enemies[i].move()){
      attackerPoints++;
      //add point outside of canvas
      // document.getElementById('attackersScore').innerHTML = attackerPoints; 
      enemies.splice(i,1);
      i--;
      j--;
    }
  }
  
  setTimeout(mainLoopLogic, 1000/FPS);
};
 
window.onload = function() {
  setTimeout(mainLoopLogic, 1000/FPS);
  requestAnimationFrame(mainLoopRender);
};

