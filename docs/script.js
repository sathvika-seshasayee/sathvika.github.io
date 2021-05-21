(function(){
    var features = [
        {
            id: 1,
            name: "My Day",
            icon: "far fa-sun",
            tasks:[]
        },
        {
            id: 2,
            name: "Important",
            icon: "far fa-star",
            tasks:[]
        },
        {
            id: 3,
            name: "Planned",
            icon: "far fa-calendar",
            tasks:[]
        },
        {
            id: 4,
            name: "Assigned to you",
            icon: "fas fa-user-alt",
            tasks:[]
        },
        {
            id: 5,
            name: "Tasks",
            icon: "fas fa-home",
            tasks:[]
        }
    ];

function init () {
    var unOrderedList = document.getElementById("left-navigation");
    for(var feature in features) {
        var list = document.createElement("li");
        var span = document.createElement("span");
        var icon = document.createElement("i");
        icon.className = features[feature].icon;
        span.id = features[feature].id;
        span.appendChild(document.createTextNode(features[feature].name));
        list.appendChild(icon);
        list.appendChild(span);
        unOrderedList.appendChild(list);
    }
}
// document.addEventListener("mouseover", function(event) {
//     if("LI" === event.target.tagName  || "new-task-category-input" == event.target.name &&
//     event.target.firstChild != document.getElementsByClassName("navigation-border")[0]) {                   // See that span can get clicked also
//         event.target.style.backgroundColor = "#e6e4e4";
//     }  
// });
// document.addEventListener("mouseover", function(event) {
//     if("SPAN" === event.target.tagName  && "left-navigation" === event.target.parentNode.parentNode.id) {                   
//         event.target.parentNode.style.backgroundColor = "#e6e4e4";
//     }  
// });
// document.addEventListener("mouseout", function(event) {
//     if("SPAN" === event.target.tagName  && "left-navigation" === event.target.parentNode.parentNode.id) {                   
//         event.target.parentNode.style.backgroundColor = "#f4f4f4";
//     }  
// });
// document.addEventListener("mouseout", function(event) {
//     if("LI" === event.target.tagName || "new-task-category-input" == event.target.name &&  
//     event.target.firstChild != document.getElementsByClassName("navigation-border")[0]) {
//         event.target.style.backgroundColor = "#f4f4f4";
//     } 
// });
document.getElementById("input-new-task-category").addEventListener("keypress", function(event){
    if("Enter" == event.key && document.getElementById("input-new-task-category").value != "") {
        var newTaskCategory = document.getElementById("input-new-task-category").value;
        document.getElementById("input-new-task-category").value = "";
        addNewTaskCategory(newTaskCategory);
    }
})
document.getElementById("new-sub-task-input").addEventListener("keypress", function(event){
    if("Enter" == event.key && document.getElementById("new-sub-task-input").value != "") {
        var newSubTask = document.getElementById("new-sub-task-input").value;
        document.getElementById("new-sub-task-input").value = "";
        var taskCategoryId = document.getElementById("center-title").firstChild.nextSibling.id;
        addNewSubTask(newSubTask, taskCategoryId);
    }
})
function addNewSubTask(newSubTask, taskCategoryId) {
    var subTask = {
        id : (features[taskCategoryId - 1].tasks.length + 1) + features[taskCategoryId - 1].name,
        name : newSubTask,
        checked:false,
        subCategory : [] 
    }
    features[taskCategoryId - 1].tasks.push(subTask);
    var unOrderedList = document.getElementById("existing-task-list"); 
    var list = document.createElement("li");
    var input = document.createElement("input");
    var icon = document.createElement("i");
    var span = document.createElement("span");
    input.id = subTask.id;
    icon.className = "far fa-star";
    span.appendChild(document.createTextNode(subTask.name));
    input.setAttribute("type", "checkbox");
    list.appendChild(input);
    list.appendChild(span);
    list.appendChild(icon);
    unOrderedList.appendChild(list);
}
function addNewTaskCategory(newTaskCategory) {
    var newTask = {
        id : features.length + 1,
        icon : "fas fa-list-ul",
        name: newTaskCategory,
        tasks:[]
    }
    features.push(newTask);
    var unOrderedList = document.getElementById("left-navigation");
    var list = document.createElement("li");
    var icon = document.createElement("i");
    var span = document.createElement("span");
    icon.className = newTask.icon;
    list.appendChild(icon);
    span.id = newTask.id;
    span.appendChild(document.createTextNode(newTask.name));
    list.append(span);
    unOrderedList.appendChild(list);
}
document.addEventListener("click", function(event) {
    if( "SPAN" == event.target.tagName &&  event.target.parentNode.parentNode.id == "left-navigation") {   
          document.getElementById("center-title").firstChild.nextSibling.innerHTML = 
          event.target.textContent;
          document.getElementById("center-title").firstChild.nextSibling.id = 
          event.target.id;
          var subTasks = features[event.target.id - 1].tasks;
          var taskId = event.target.id;
          var unOrderedList = document.getElementById("existing-task-list"); 
          unOrderedList.innerHTML = "";
          for(var subTask in subTasks) {
              var list = getOneSubTask(subTasks[subTask], taskId);
              unOrderedList.appendChild(list);
          }
      } 
  });
  document.addEventListener("click", function(event) {
    if( "SPAN" == event.target.tagName && "existing-task-list" === event.target.parentNode.parentNode.id) {
           document.getElementById("set-sub-task-name").value = event.target.textContent;
           document.getElementById("set-sub-task-icon").className = event.target.nextSibling.className;
           document.getElementById("center").id = "center-shrunk";
           document.getElementById("right").style.display = "inline-block";
      } 
  });
   function getOneSubTask(subTask, taskId) {
    var list = document.createElement("li");
    var input = document.createElement("input");
    var icon = document.createElement("i");
    var span = document.createElement("span");
    input.id = subTask.id;
    if(2 == taskId) {
        icon.className = "fas fa-star";
        icon.id = "changeIconBlue";
    } else {
        icon.className = "far fa-star";
    }
    
    span.appendChild(document.createTextNode(subTask.name));
    input.setAttribute("type", "checkbox");
    if(true === subTask.checked) {
        input.setAttribute("checked", "checked");
    }
    list.appendChild(input);
    list.appendChild(span);
    list.appendChild(icon);
    return list;
   }
   document.addEventListener("click", function(event) {
    if("far fa-star" == event.target.className && "existing-task-list" === event.target.parentNode.parentNode.id) {
        if("changeIconBlue" != event.target.id) {
            event.target.id = "changeIconBlue";
            event.target.className = "fas fa-star";
            var subTaskId = parseInt(event.target.previousSibling.previousSibling.id.charAt(0));
            var taskCategoryId = document.getElementById("center-title").firstChild.nextSibling.id;
            var subTask = features[taskCategoryId - 1].tasks[subTaskId - 1];
            features[1].tasks.push(subTask);
        } 
    }
});
init();
}())