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
    let init = () => {
        const unOrderedList = document.getElementById("left-navigation");
        for (const feature in categories) {
            const list = $('<li>');
             $('<i>').
            addClass(categories[feature].icon).
            appendTo(list);
            $('<span>').attr("id", categories[feature].id).
            text(categories[feature].name).
            appendTo(list);
            list.appendTo(unOrderedList);
        }

        $("#input-new-task-category").keypress(addNewTaskCategory);
        $("#new-task-input").keypress(addNewTask);
        $("#add-step-input").keypress(addNewSubTask);
        $("#existing-task-list").click(renderSubTask);
        $("#left-navigation").click(renderTask);

    }

    /**
     * Function to add new tasks category to left navigation bar
     */
    let addNewTaskCategory = (event) => {
        if ("Enter" == event.key && $("#input-new-task-category").val() != "") {
            const newTaskCategory = $("#input-new-task-category").val();
            $("#input-new-task-category").val('');
            const newTask = {
                id: categories.length + 1,
                icon: "fas fa-list-ul",
                name: newTaskCategory,
                tasks: []
            }
            categories.push(newTask);
            const unOrderedList = $("#left-navigation");
            const list = $("<li>");
            const icon = $("<i>").addClass(newTask.icon);
            const span = $("<span>").attr("id", newTask.id);
            list.append(icon, span, newTask.name);
            unOrderedList.append(list);
        }
    }

    /**
     * Function to add new tasks center part
     */
    let addNewTask = (event) => {
        if ("Enter" == event.key && $("#new-task-input").val() != "") {
            const newTask = $("#new-task-input").val();
            $("#new-task-input").val("");
            const task = {
                id: (categories[categoryId - 1].tasks.length + 1),
                name: newTask,
                checked: false,
                important: false,
                subTasks: []
            }
            taskId = task.id;
            categories[categoryId - 1].tasks.push(task);
            const unOrderedList = document.getElementById("existing-task-list");
            const list = getTask(task);
            unOrderedList.append(list);

        }
    }

    /**
    * Function to add new sub tasks to right side
    */
    let addNewSubTask = (event) => {
        if ("Enter" == event.key && $(".add-step-input").val() != "") {
            const newSubTask = $("#add-step-input").val();
            $("#add-step-input").val("");
            const subTask = {
                id: categories[categoryId - 1].tasks[taskId - 1].subTasks + 1,
                name: newSubTask
            }
            categories[categoryId - 1].tasks[taskId - 1].subTasks.push(subTask);
            const unOrderedList = $(".sub-task");
            const list = getSubTask(subTask);
            unOrderedList.append(list);
        }
    }

    /**
     * Function to get one subtask element
     */
    let getSubTask = (subTask) => {
        const list = $("<li>");
        const input = $("<input>").attr("type", "checkbox").attr("name", "check");
        const span = $("<span>").text(subTask.name);
        list.append(input, span);
        return list;
    }

    /**
     * Function to render list of tasks of a category in middle part
     */
    let renderTask = (event) => {
        if ("SPAN" == $(event.target).prop("tagName") && $(event.target).parent().parent().prop("id") == "left-navigation") {
            categoryId = $(event.target).prop("id");
           $(".center-title:first-child").text("\n" + $(event.target).text() + "\n\n");
            $(".center-title").prop("id", $(event.target).prop("id"));
            const tasks = categories[event.target.id - 1].tasks;
            taskId = $(event.target).prop("id");
            const unOrderedList = $("#existing-task-list");
            unOrderedList.html("");
            for (const task in tasks) {
                const list = getTask(tasks[task]);
                unOrderedList.append(list);
            }
        }
    }

    /**
     * Function to render list of sub tasks of a category in right side
     */
    let renderSubTask = (event) => {
        if ("SPAN" === event.target.tagName && "existing-task-list" === event.target.parentNode.parentNode.id) {
            taskId = $(event.target).attr("id");
            $(".set-sub-task-name").text($(event.target).text());
            $("#set-sub-task-icon").addClass($(event.target).next().className)
            .attr("color", event.target.nextSibling.style.color);
            $(".checkbox-input-right").attr("checked" , $(event.target).prev().checked);
            $(".center-container").addClass("center-container-shrunk");
            $(".right-container-hidden").addClass("right-container");
        } else if ("INPUT" === $(event.target).prop("tagName")) {
            taskId = $(event.target).next().attr("id");
            reflectCheckedOption(event);
        } else if ("I" === $(event.target).prop("tagName")) {
            taskId = $(event.target).prev().attr("id");
            reflectImportantOption(event);
        }
    }

    /**
     * Reflects important option from task in center to right side
     */
    let reflectImportantOption = (event) => {
        if ("fas fa-star icon-important-before" == event.target.className) {
            event.target.className = "far fa-star icon-important-after";
            const task = categories[categoryId - 1].tasks[taskId - 1];
            categories[categoryId - 1].tasks[taskId - 1].important = false;
            if (categories[1].tasks.includes(task)) {
                categories[1].tasks.splice(taskId - 1, 1);
            }
            if (event.target.previousSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
                document.getElementById("set-sub-task-icon").className = "far fa-star icon-important-after";
            }
        } else {
            event.target.className = "fas fa-star icon-important-before";
         //   event.target.style.color = "blue";
            const task = categories[categoryId - 1].tasks[taskId - 1];
            categories[1].tasks.push(task);
            categories[categoryId - 1].tasks[taskId - 1].important = true;
            if (event.target.previousSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
                document.getElementById("set-sub-task-icon").className = "fas fa-star icon-important-before";
            }
        }
    }

    /**
     * Reflects checked option from task in center to right side
     */
    let reflectCheckedOption = (event) => {
        if (true === event.target.checked) {
            categories[categoryId - 1].tasks[taskId - 1].checked = true;
            if (event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
                document.getElementsByClassName("checkbox-input-right")[0].checked = true;
            }
        } else if (false === event.target.checked) {
            categories[categoryId - 1].tasks[taskId - 1].checked = false;
            if (event.target.nextSibling.textContent === document.getElementsByClassName("set-sub-task-name")[0].textContent) {
                document.getElementsByClassName("checkbox-input-right")[0].checked = false;
            }
        }
    }

    /**
     * Function to return one row of a task
     */
    let getTask = (task) => {
        const list = document.createElement("li");
        const input = document.createElement("input");
        const icon = document.createElement("i");
        const span = document.createElement("span");
        input.id = task.id;
        if (true == task.important) {
            icon.className = "fas fa-star icon-important-before";
        } else {
            icon.className = "far fa-star icon-important-after";
        }
        span.appendChild(document.createTextNode(task.name));
        span.id = task.id;
        input.setAttribute("type", "checkbox");
        if (true == task.checked) {
            input.checked = true;
        }
        list.append(input, span, icon);
        return list;
    }
    init();
}())