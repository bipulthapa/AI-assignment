document.getElementById("go").addEventListener("click",getValue);

function getValue(){

    var missionary = parseInt(document.getElementById("missionary").value) || 0;
    document.getElementById("missionary").value = "";
    var cannible = parseInt(document.getElementById("cannible").value) || 0;
    document.getElementById("cannible").value = "";

    if((missionary+cannible)>0 && (missionary+cannible)<=2){
        if (tracker[2]==0){
            if(missionary <= tracker[0] && cannible <= tracker[1] ){
                tracker = [tracker[0]-missionary,tracker[1]-cannible,tracker[2]^1];
                if(!checkState(tracker)){
                    alert("Game Over.");
                    tracker= [3,3,0];
                }
            }else{
                alert("Invalid Move! Try other value");
            }
        }else if(tracker[2] == 1){
            if(missionary <=3 - tracker[0] && cannible <= 3 - tracker[1] ){
                tracker = [tracker[0]+missionary,tracker[1]+cannible,tracker[2]^1];
                if(!checkState(tracker)){
                    alert("Game Over");
                    tracker = [3,3,0];
                }
            }else{
                alert("Invalid Move! Try other value");
            }
        }
        console.log(tracker);
          
    }else{
        alert("Invalid choice! Try new value");
    }
    if (tracker[0] == goalState[0] && tracker[1]==goalState[1] && tracker[2]==goalState[2]){
        if (confirm("Congratulations! You have won the game \n Restart?")){
            tracker = [3,3,0];
        }else{
            tracker = [0,0,1];
        }
    }
}

function checkState(tracker){

    for (var i=0;i<state.length;++i){
        if (state[i].value[0] == tracker[0] && state[i].value[1] == tracker[1] && state[i].value[2] == tracker[2]){
            return true;
        }
    }
    return false;
}


