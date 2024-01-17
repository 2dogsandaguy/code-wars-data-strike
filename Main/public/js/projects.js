$(document).ready(function () {
  // Function to add drag-and-drop functionality to a given element
  function addDragAndDrop(element) {
    element.attr("draggable", true);

    element.on("dragstart", function (event) {
      event.originalEvent.dataTransfer.setData("text/plain", this.id);
    });
  }

  // Fetch tasks for the project on page load
  const projectId = localStorage.getItem("projectID");

  $.ajax({
    url: `/api/projects/${projectId}/tasks`,
    method: "GET",
    success: function (tasks) {
      tasks.forEach(function (task) {
        const columnId = task.status; // Adjust this based on your task status structure

        // Create the HTML for the task
        const taskHtml = `
          <div class="card draggable mb-3" id="task${task.id}" data-task-id="${task.id}">
            <div class="card-body">
              <h5 class="card-title">${task.name}</h5>
              <p class="card-text">${task.description}</p>
            </div>
          </div>
        `;

        // Append the task to the corresponding column
        $("#" + columnId).append(taskHtml);

        // Make the task draggable
        addDragAndDrop($("#task" + task.id));
      });
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error(error);
    }
  });

  // Initialize sortable for each column
  $(".droppable").sortable({
    connectWith: ".droppable",
    update: function (event, ui) {
      const taskId = ui.item.attr("id");
      const newColumnId = ui.item.parent().attr("id"); // Extract newColumnId from the parent element's id
      const projectId = localStorage.getItem("projectID");
      const taskDataId = ui.item.attr("data-task-id");

      if (taskDataId && !isNaN(taskDataId)) {
        // Make an AJAX request to update the task status in the database
        $.ajax({
          url: `/api/projects/${projectId}/tasks/update/${taskDataId}`,
          method: "POST",
          data: {
            projectId: projectId,
            newColumnId: newColumnId
          },
          success: function (data) {
            console.log("Task item updated", taskDataId, newColumnId);
          },
          /* error: function (xhr, status, error) {
            // Handle errors here
            console.error(error);
          } */
        });
      } else {
        // Handle the case where the task ID is not a valid integer
        console.error("Invalid task ID: " + taskDataId);
      }
    }
  });

  // Add a dragover event listener to the droppable containers
  $(".droppable").on("dragover", function (event) {
    event.preventDefault();
  });

  // Add a drop event listener for handling the drop event
  $(".droppable").on("drop", function (event) {
    event.preventDefault();
    const draggedElementId = event.originalEvent.dataTransfer.getData("text/plain");
    $("#" + draggedElementId).appendTo(this);
  });

  // Add a click event handler to toggle description visibility
  $(".card-body").on("click", ".toggle-description", function () {
    const $description = $(this).closest(".card").find(".card-description");
    $description.toggleClass("d-none");
    $(this).text(function (i, text) {
      return text === "+" ? "-" : "+";
    });
  });

  $("#createTask").on("click", function () {
    console.log("Create button clicked");
    const projectId = localStorage.getItem("projectID");
    const newTaskName = $("#newTask").val().trim();
    const newTaskDescription = $("#newTaskDescription").val().trim();

    if (newTaskName) {
      $.ajax({
        url: `/api/projects/${projectId}/tasks`,
        method: "POST",
        data: {
          name: newTaskName,
          description: newTaskDescription
        },
        success: function (data) {
          console.log("AJAX Success Function Executed");
          $("#newTask").val("");
          $("#newTaskDescription").val("");

          const newTask = {
            id: data.id,
            task_name: data.name,
            task_description: data.description
          };

          const taskHtml = `
            <div class="card draggable mb-3" id="task${newTask.id}" data-task-id="${newTask.id}">
              <div class="card-body">
                <h5 class="card-title">${newTask.task_name}</h5>
                <p class "card-text">${newTask.task_description}</p>
              </div>
            </div>
          `;

          $("#todo-column").append(taskHtml);
          addDragAndDrop($("#task" + newTask.id));
        }
      });
    }
  });
  $(".delete-task").on("click", function () {
    const taskId = $(this).data("task-id");
    const projectId = localStorage.getItem("projectID");
  
    $.ajax({
      url: `/api/projects/${projectId}/tasks/${taskId}`,
      method: "DELETE",
      success: function () {
        // Remove the task from the DOM
        $(`#task${taskId}`).remove();
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });

});
