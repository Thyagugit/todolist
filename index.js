const addButton = document.getElementById("addBtn");
const  inputBox = document.getElementById("inputBox");
const taskContainer = document.getElementById("taskContainer");


const taskArr = [];


function handleTaskClick() {

 this.classList.toggle("completed");

const taskId = this.id.toString();
console.log( taskId);

  for(let i=0; i<taskArr.length; i++){

          const taskObj = taskArr[i];
          console.log(taskObj.id);
          if(taskObj.id.toString() ===  taskId)taskObj.isCompleted = !taskObj.isCompleted;

            
          
  }

  setTasks();


}


function handleRemove() {

   const taskValue = this.innerText;
   const taskId = this.id.toString();
   for(let i=0; i< taskArr.length; i++)
    {
        if(taskArr[i].id.toString() === taskId) taskArr.splice(i,1);
       
    }
    setTasks();

    this.remove();

}

function consoleArr(){

    console.log(taskArr);
}


function setTasks() {

    localStorage.setItem("tasks", JSON.stringify(taskArr));

}


function getTasks() {

    let tasks = localStorage.getItem("tasks");

    if(!tasks){
        return;
    }

    tasks = JSON.parse(tasks);
    // console.log(tasks);

    for (index in tasks) {


        const taskObj = tasks[index];
        createTask(taskObj.value, taskObj.isCompleted, taskObj.id);
        taskArr.push(tasks[index]);
    }


}

getTasks();


function createTask(userInput, isCompleted,taskId){
    const newElement = document.createElement("div");
    newElement.innerText =  userInput;

    newElement.setAttribute("id",taskId);


    // console.log(newElement);

   if(isCompleted)
   newElement.setAttribute("class","task completed");
   else
   newElement.setAttribute("class","task");

    newElement.addEventListener("click" , handleTaskClick);
    newElement.addEventListener("dblclick", handleRemove);


   taskContainer. append (newElement);
}


function addTask() {

    const userInput = inputBox.value;


    if(userInput.length === 0) return alert("Please Enter Some Task....");
        

    const inputLength = userInput.length;
    console.log(inputLength);
    let count = 0;


    for (let i= 0; i< inputLength ; i++)
        {
          if( userInput[i] === " ")
            {

               count += 1;
            }
        }

        // console.log(count);

        if (inputLength === count) return alert("Please enter valid task...");
            
      let taskId = taskArr.length+1;
    
      let taskObj = {};
      taskObj.value = userInput;
      taskObj.isCompleted = false;
      taskObj.id = taskId;

    taskArr.push(taskObj);
    setTasks();
    createTask(userInput,false,taskId);

    

}



function handleEnter(e){

    if(e.keyCode === 13) addTask();

}


addButton.addEventListener("click", addTask);
inputBox.addEventListener("keyup" , handleEnter);
