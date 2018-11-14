//0 for boat on left side and 1 for boat on right side

let initialState = [3,3,0];
let goalState = [0,0,1];
let state = [];
let killedState = [];
let loop = true;
var i=0;

let tracker = [3,3,0];
let boatPosition = tracker[2];

class StateCreation{

  constructor(){
    this.parent;
    this.value;
    this.x;
    this.y;
    this.visited;
  }
}


var rootNode = new StateCreation();
rootNode.value = initialState;
rootNode.parent = initialState;
rootNode.visited = false;

function setup() {
  createCanvas(windowWidth,windowHeight)
  background('#018786');
  textSize(26);
  fill(255);
  text("State Space tree Diagram of Missionary and Cannible problem",10,75);
  textSize(22);
  
  
  rootNode.x = windowWidth  /2;
  rootNode.y = 150;
  state.push(rootNode);
  // possibleOperations(rootNode);
  while(loop){
   possibleOperations(state[state.length-1]);
  }

  console.log("State is : ");
  console.log(state);
  console.log("Killed State is : ");
  console.log(killedState);
  console.log("====================");
  console.log("Current Selected State is:");
  console.log(tracker);
}

function possibleOperations(newState){
  if (newState.visited === true){
    killedState.push(state[state.length-1]);
    state.splice(state.length-1,1);
  }else{
    newState.visited = true;

    // possible operations goes here...

    if (newState.value[2] == 0){
      // console.log("Boat on left side");
      
      // 1 cannible
      if (newState.value[1] >= 1){
        addToState(newState,[newState.value[0],newState.value[1]-1,1]);
      }
      // 2 cannible
      if(newState.value[1] >=2 ){
        addToState(newState,[newState.value[0],newState.value[1]-2,1]);
      }
      // 1 missionary
      if(newState.value[0] >= 1){
        addToState(newState,[newState.value[0]-1,newState.value[1],1]);
      }
      // 2 missionary
      if(newState.value[0] >=2 ){
        addToState(newState,[newState.value[0]-2,newState.value[1],1]);
      }
      if(newState.value[0] >=1 && newState.value[1] >= 1){
        addToState(newState,[newState.value[0]-1,newState.value[1]-1,1]);
      }

    }else if(newState.value[2] == 1){
      // console.log("Boat on right side");

      // for 1 cannible
      if (3-newState.value[1] >= 1){
        addToState(newState,[newState.value[0],newState.value[1]+1,0]);
      }
      // for 2 cannible
      if(3-newState.value[1] >= 2){
        addToState(newState,[newState.value[0],newState.value[1]+2,0]);
      }
      // for 1 missionary
      if(3-newState.value[0] >= 1){
        addToState(newState,[newState.value[0]+1,newState.value[1],0]);
      }
      // for 2 missionary
      if(3-newState.value[0] >= 2){
        addToState(newState,[newState.value[0]+2,newState.value[1],0]);
      }
      // for 1 missionary and 1 cannible
      if(3-newState.value[0] >= 1 && newState.value[1] >= 1){
        addToState(newState,[newState.value[0]+1,newState.value[1]+1,0]);
      }
    }
  }
}

function addToState(parent,value){
  // console.log("Parent is "+parent+"and value is "+value);

  var temp = new StateCreation();
  temp.value = value;
  temp.parent = parent.value;
  temp.visited = false;
  // checking goal state
  if (goalState[0] == value[0] && goalState[1] == value[1] && goalState[2] == value[2]){ 
    state.push(temp);
    loop = false;
  }else if( temp.value[0] === 0 || ( temp.value[0] >= temp.value[1] )){
    if ((3-temp.value[0] === 0) || (3-temp.value[0]) >= (3-temp.value[1])){
      if(alreadyVisited(value)){
        killedState.push(temp);
      }else{
        state.push(temp);
      }
    }else{
      killedState.push(temp);
    }
  }else if(temp.value[0]<temp.value[1]){ 
    killedState.push(temp);
  }
}

function alreadyVisited(tempValue){
   for(var i=0;i<state.length;++i){
     if(state[i].value[0] == tempValue[0] && state[i].value[1] == tempValue[1] && state[i].value[2] == tempValue[2] ){
       return true;
     } 
   }
   return false;
}

function draw() {
  // drawing the output here...
  var valueToShow = document.getElementById("current");
  valueToShow.innerHTML = tracker;

  background(0);
  noFill();
      for(var i=0;i<tracker[0];++i){
        fill('yellow');
        ellipse(40+map(i,0,2,50,120),300,30,30);
        fill('black');
        textSize(18);
        text('M',32+map(i,0,2,50,120),307);
      }

      for(var i=0;i<tracker[1];++i){
        fill('red');
        rect(25+map(i,0,2,50,120),330,30,30);
        fill('black');
        text('C',33+map(i,0,2,50,120),350);
      }

      for(var i=0;i<3-tracker[0];++i){
        fill('yellow');
        ellipse(640+map(i,0,2,50,120),300,30,30);
        fill('black');
        textSize(18);
        text('M',632+map(i,0,2,50,120),305);
      }
      
      for(var i=0;i<3-tracker[1];++i){
        fill('red');
        rect(625+map(i,0,2,50,120),330,30,30);
        fill('black');
        text('C',633+map(i,0,2,50,120),350)
      }

      fill('#4286f4');
      rect(200,10,400,600);
      fill('#be8d00');
      rect(198,10,5,600);
      rect(600,10,5,600);

      fill('#022f77');
      if (tracker[2] == 0){
        rect(210,315,100,20)
        boatPosition = 1;
      }else{
        boatPosition = 0;
        rect(490,315,100,20);  
      }

      
      
    // fill('yellow');
    // ellipse(40+map(i,0,2,50,100),300,20,20);
    // fill('red');
    // rect(30+map(i,0,2,50,100),350,20,20)

   
}


