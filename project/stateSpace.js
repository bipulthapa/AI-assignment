//0 for boat on left side and 1 for boat on right side

let initialState = [3,3,0];
let goalState = [0,0,1];
let state = [];
let killedState = [];
let loop = true;
var i=0;
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
  createCanvas(screen.width,screen.height)
  background('#018786');
  textSize(26);
  fill(255);
  text("State Space tree Diagram of Missionary and Cannible problem",10,75);
  textSize(22);
  
  fill('red');
  rect(10,125,25,25);
  text("Killed State",45,145);

  fill(255);
  rect(10,165,25,25);
  text("Solution",45,185);

  fill(255,245,0);
  rect(10,205,25,25);
  text("Unvisited",45,225);

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
  // check goal state
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

function checker(value, goalArray) {
  // console.log("The array value is: ");
  // console.log(goalArray[0]);
  for(let i = 0; i < goalArray.length; i++) {
    if(goalArray[0] === value[0] && goalArray[1] === value[1] && goalArray[2] === value[2]) {
      return true;
    }
  }
  return false;
}

function draw() {
  // displaying the output
  frameRate(5);
  textSize(22);
  fill("#f5f5f5");
  text(state[0].value,width/2,150);
  textSize(20);
  displayOutput();
  i++
  if (i >= state.length){
    noLoop();
  } 
}

function displayOutput(){
  let tempArray = [];
    for(j = i + 1; j < state.length; j++) {
      if(state[j].parent[0] === state[i].value[0] && state[j].parent[1] === state[i].value[1] && state[j].parent[2] === state[i].value[2] ) {
        if(!checker(state[j].value, tempArray)) {
          var tempValue = {
            value: state[j].value,
            parent: state[i].value
          }
          tempArray.push(tempValue);
        }
      }
    }
    for(k = 0; k < killedState.length; k++) {
      if(killedState[k].parent[0] === state[i].value[0] && killedState[k].parent[1] === state[i].value[1] && killedState[k].parent[2] === state[i].value[2] ) {
        if(!checker(killedState[k].value, tempArray)) {
          var tempValue = {
            value: killedState[k].value,
            parent: state[i].value
          }        
          tempArray.push(tempValue);
        } 
      } 
    }    
    if(tempArray.length === 1) {
      for(let w = 0; w < state.length; w++) {
        if(state[w].value[0] === tempArray[0].value[0] && state[w].value[1] === tempArray[0].value[1] && state[w].value[2] === tempArray[0].value[2] && state[w].parent[0] === tempArray[0].parent[0] && state[w].parent[1] === tempArray[0].parent[1] && state[w].parent[2] === tempArray[0].parent[2]) {
          if(state[w].visited) {
            fill(255, 255, 255);            
          }
        }
      }
      stroke(255, 255, 255, 120);
      line(state[i].x + 5, state[i].y, state[i].x + 5, state[i].y + 20);
      noStroke();
    
      text(tempArray[0].value, state[i].x, state[i].y + 40);
      fill(255, 0, 0);
      for(let b = 0; b < state.length; b++) {
        if(state[b].value[0] === tempArray[0].value[0] && state[b].value[1] === tempArray[0].value[1] && state[b].value[2] === tempArray[0].value[2]) {
          state[b].x =  state[i].x;
          state[b].y = state[i].y + 50;
        }
      }       
    }else if(tempArray.length !== 0 && tempArray.length % 2 === 0) {
      for(p = 0; p < tempArray.length; p++) {
        for(let q = 0; q < state.length; q++) {
          if(state[q].value[0] === tempArray[p].value[0] && state[q].value[1] === tempArray[p].value[1] && state[q].value[2] === tempArray[p].value[2] && state[q].parent[0] === tempArray[p].parent[0] && state[q].parent[1] === tempArray[p].parent[1] && state[q].parent[2] === tempArray[p].parent[2]) {
            
            if(state[q].visited === true) {
              fill(255, 255, 255);
            }else { 
              fill(255, 165, 0);
              
            }  
          }
        }
        stroke(255, 255, 255, 120);
        line(state[i].x + 15, state[i].y, state[i].x - (25 * (tempArray.length - 1)) + p * 50 + 15, state[i].y + 20);
        noStroke();
        text(tempArray[p].value,(state[i].x - (25 * (tempArray.length - 1))) + p * 50, state[i].y + 40);
        fill(255, 0, 0);
  
        for(let b = 0; b < state.length; b++) {
          if(state[b].value[0] === tempArray[p].value[0] && state[b].value[1] === tempArray[p].value[1] && state[b].value[2] === tempArray[p].value[2]) {
            state[b].x = state[i].x - (25 * (tempArray.length - 1)) + p * 50, state[i].y + 40;
            state[b].y = state[i].y + 50;
          }
        }        
      }
    }else{
      for(l = 0; l < tempArray.length; l++){  
        for(let q = 0; q < state.length; q++) {
          if(state[q].value[0] === tempArray[l].value[0] && state[q].value[1] === tempArray[l].value[1] && state[q].value[2] === tempArray[l].value[2] && state[q].parent[0] === tempArray[l].parent[0] && state[q].parent[1] === tempArray[l].parent[1] && state[q].parent[2] === tempArray[l].parent[2]) {
            if(state[q].visited === true) {
              fill(255, 255, 255);        
            }else {
              if (state[q].value[0] === goalState[0] && state[q].value[1] === goalState[1] && state[q].value[2] == goalState[2]){
                fill(255);
              }else{
                fill(255, 225, 0);
              }
              
            }  
          }
        }
        stroke(255, 255, 255, 120);
        line(state[i].x + 15, state[i].y + 5, ((state[i].x) - ((tempArray.length - 3) * 25) - 50) + l * 50 + 15, state[i].y + 20);
        noStroke();
        textSize(20)
        text(tempArray[l].value, ((state[i].x) - ((tempArray.length - 3) * 25) - 50) + l * 50, state[i].y + 40);
        fill(255, 0, 0);
        for(let b = 0; b < state.length; b++) {
          if(state[b].value[0] === tempArray[l].value[0] && state[b].value[1] === tempArray[l].value[1] && state[b].value[2] === tempArray[l].value[2]) {
            state[b].x =((state[i].x) - ((tempArray.length - 3) * 25) - 50) + l * 50, state[i].y + 40;
            state[b].y = state[i].y + 50;
          }
        }
      }
    }  
}
