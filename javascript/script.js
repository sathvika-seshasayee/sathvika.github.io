(function () {
    var categories = [
        {
            id: 1,
            name: "My Day",
            icon: "far fa-sun",
            tasks: []
        },
        {
            id: 2,
            name: "Important",
            icon: "far fa-star",
            tasks: []
        },
        {
            id: 3,
            name: "Planned",
            icon: "far fa-calendar",
            tasks: []
        },
        {
            id: 4,
            name: "Assigned to you",
            icon: "fas fa-user-alt",
            tasks: []
        },
        {
            id: 5,
            name: "Tasks",
            icon: "fas fa-home",
            tasks: []
        }
    ];
    let taskId;
    let categoryId = 5;

    /**
     * Function to render left navigation bar for tasks category
     */
    function init() {
        const unOrderedList = document.getElementById("left-navigation");
        for (const feature in categories) {
            const list = document.createElement("li");
            const span = document.createElement("span");
            const icon = document.createElement("i");
            icon.className = categories[feature].icon;
            span.id = categories[feature].id;
            span.appendChild(document.createTextNode(categories[feature].name));
            list.appendChild(icon);
            list.appendChild(span);
            unOrderedList.appendChild(list);
        }

        document.getElementById("input-new-task-category").
            addEventListener("keypress", addNewTaskCategory);

        document.getElementById("new-task-input").
            addEventListener("keypress", addNewTask);

        document.getElementById("add-step-input").
            addEventListener("keypress", addNewSubTask);

        document.getElementById("existing-task-list").addEventListener("click", renderSubTask);

        document.getElementById("left-navigation").addEventListener("click", renderTask);
    }

    /**
     * Function to add new tasks category to left navigation bar
     */
    function addNewTaskCategory(event) {
        if ("Enter" == event.key && document.getElementById("input-new-task-category").value != "") {
            const newTaskCategory = document.getElementById("input-new-task-category").value;
            document.getElementById("input-new-task-category").value = "";
            const newTask = {
                id: categories.length + 1,
                icon: "fas fa-list-ul",
                name: newTaskCategory,
                tasks: []
            }
            categories.push(newTask);
            const unOrderedList = document.getElementById("left-navigation");
            const list = document.createElement("li");
            const icon = document.createElement("i");
            const span = document.createElement("span");
            icon.className = newTask.icon;
            span.id = newTask.id;
            list.append(icon, span, newTask.name);
            unOrderedList.appendChild(list);
        }
    }

    /**
     * Function to add new tasks center part
     */
    function addNewTask(event) {
        if ("Enter" == event.key && document.getElementById("new-task-input").value != "") {
            const newTask = document.getElementById("new-task-input").value;
            document.getElementById("new-task-input").value = "";
            const task = {
                id: (categories[categoryId - 1].tasks.length + 1),
                name: newTask,
                checked: false,
                important:false,
                subTasks: []
            }
            taskId = task.id;
            categories[categoryId - 1].tasks.push(task);
            const unOrderedList = document.getElementById("existing-task-list");
            const list = getTask(task);
            unOrderedList.appendChild(list);

        }
    }

     /**
     * Function to add new sub tasks to right side
     */
      function addNewSubTask(event) {
        if ("Enter" == event.key && document.getElementsByClassName("add-step-input")[0].value != "") {
            const newSubTask = document.getElementById("add-step-input").value;
            document.getElementById("add-step-input").value = "";
            const subTask = {
                id: categories[categoryId - 1].tasks[taskId - 1].subTasks + 1,
                name: newSubTask
            }
            categories[categoryId - 1].tasks[taskId - 1].subTasks.push(subTask);
            const unOrderedList = document.getElementsByClassName("sub-task")[0];
            const list = getSubTask(subTask);
            unOrderedList.appendChild(list);
        }
    }

    /**
     * Function to get one subtask element
     */
    function getSubTask(subTask) {
        const list = document.createElement("li");
        const input = document.createElement("input");
        const span = document.createElement("span");
        span.appendChild(document.createTextNode(subTask.name));
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "check");
        list.append(input, span);
        return list;
    }

    /**
     * Function to render list of tasks of a category in middle part
     */
    function renderTask(event) {
        if ("SPAN" == event.target.tagName && event.target.parentNode.parentNode.id == "left-navigation") {
            categoryId = event.target.id;

            categoryId = event.target.id;
            document.getElementsByClassName("center-title")[0].firstChild.nextSibling.innerHTML =
                event.target.textContent;
            document.getElementsByClassName("center-title")[0].firstChild.nextSibling.id =
                event.target.id;
            const tasks = categories[event.target.id - 1].tasks;
            taskId = event.target.id;
            const unOrderedList = document.getElementById("existing-task-list");
            unOrderedList.innerHTML = "";
            for (const task in tasks) {
                const list = getTask(tasks[task]);
                unOrderedList.appendChild(list);
            }
        }
    }

    /**
     * Function to render list of sub tasks of a category in right side
     */
    function renderSubTask(event) {
        if ("SPAN" === event.target.tagName && "existing-task-list" === event.target.parentNode.parentNode.id) {
            taskId = event.target.id;
            document.getElementsByClassName("set-sub-task-name")[0].textContent = event.target.textContent;
            document.getElementById("set-sub-task-icon").className = event.target.nextSibling.className;
            document.getElementById("set-sub-task-icon").style.color = event.target.nextSibling.style.color;
            document.getElementsByClassName("checkbox-input-right")[0].checked = event.target.previousSibling.checked;
            document.getElementsByClassName("center-container")[0].style.width = "50%";
           document.getElementsByClassName("center-container")[0].className = "center-container center-container-shrunk";
           document.getElementsByClassName("right-container-hidden")[0].className = "right-container";
        } else if("INPUT" === event.target.tagName) {
            taskId = event.target.nextSibling.id;
            reflectCheckedOption(event);
        } else if("I" === event.target.tagName){
            taskId = event.target.previousSibling.id;
            reflectImportantOption(event);
        }
    }

    /**
     * Reflects important option from task in center to right side
     */
    function reflectImportantOption(event) {
        if("fas fa-star" === event.target.className) {   
            event.target.style.color = "grey";
            event.target.className = "far fa-star";
            const task = categories[categoryId - 1].tasks[taskId - 1];
            categories[categoryId - 1].tasks[taskId - 1].important = false;
            if(categories[1].tasks.includes(task)) {
                categories[1].tasks.splice(taskId - 1, 1);                               
            }  
            if(event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
            document.getElementById("set-sub-task-icon").style.color = "grey";
            document.getElementById("set-sub-task-icon").className = "far fa-star";
            }
        } else { 
            event.target.style.color = "#0078D7";
            event.target.className = "fas fa-star";
            const task = categories[categoryId - 1].tasks[taskId - 1];
            categories[1].tasks.push(task);          
            categories[categoryId - 1].tasks[taskId - 1].important = true;
            if(event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
            document.getElementById("set-sub-task-icon").style.color = "blue";
            document.getElementById("set-sub-task-icon").className = "fas fa-star";
            }
        } 
    }

    /**
     * Reflects checked option from task in center to right side
     */
    function reflectCheckedOption(event) {
        if(true === event.target.checked) {
            categories[categoryId - 1].tasks[taskId - 1].checked = true;
           if(event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
                 document.getElementsByClassName("checkbox-input-right")[0].checked = true;   
           }
        } else if (false === event.target.checked) {
            categories[categoryId - 1].tasks[taskId - 1].checked = false;
                if(event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {   
                    document.getElementsByClassName("checkbox-input-right")[0].checked = false;
                }
            }   
    }

    /**
     * Function to return one row of a task
     */
    function getTask(task) {
        const list = document.createElement("li");
        const input = document.createElement("input");
        const icon = document.createElement("i");
        const span = document.createElement("span");
        input.id = task.id;
        if(true == task.important) {
            icon.className = "fas fa-star";
            icon.style.color = "#0078D7";
        } else {
            icon.className = "far fa-star";
        }
        span.appendChild(document.createTextNode(task.name));
        span.id = task.id;
        input.setAttribute("type", "checkbox");
        if(true == task.checked) {
            input.checked = true;
        } 
        list.append(input, span, icon);
        return list;
    }
    init();
}())