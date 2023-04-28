const todoModal = document.getElementById("todoModal");
const todoButton = document.getElementById("todoButton");
const todoClose = document.getElementById("todoClose");

// modal open button clicked
todoButton.addEventListener("click", function() {
    console.log("todobutton clicked")
    todoModal.style.display = "block";
});

// modal close button clicked
todoClose.addEventListener("click", function() {
    console.log("close the modal");
    todoModal.style.display = "none";
});

// anywhere on the window clicked 
window.onclick = function(event) {
    if(event.target == todoModal) {
        todoModal.style.display = "none";
    }
}

// function addTask() {
//     if(document.querySelector('#newtask input').value.length == 0){
//         alert("Enter your task!")
//     }

//     else{
//         document.querySelector('#tasks').innerHTML += `
//             <div class="tasksModal">
//                 <div id="taskname" class="todoTask">
//                     ${document.querySelector('#newtask input').value}
//                     <button class="delete"><i class="far fa-trash-alt deleteButton"></i></button>
//                 </div>
                
//             </div>
//         `;
//         const todoInput = document.querySelector("#todoInput");
//         todoInput.value = "";

//         var current_tasks = document.querySelectorAll(".delete");
//         for(var i=0; i<current_tasks.length; i++){
//             current_tasks[i].onclick = function(){
//                 this.parentNode.remove();
//             }
//         }
//     }
// }

// document.addEventListener('keypress', function(e) {
//     if(e.key === 'Enter') {
//         addTask();
//     }
// } )

// document.querySelector('#push').onclick = function(){
//     addTask();
// }