$(document).ready(function() {
  // Function to add drag-and-drop functionality to a given element
  function addDragAndDrop(element) {
    element.attr("draggable", true);

    element.on("dragstart", function(event) {
      event.originalEvent.dataTransfer.setData("text/plain", this.id);
    });
  }

  // Add drag-and-drop functionality to each existing draggable element
  $(".draggable").each(function() {
    addDragAndDrop($(this));
  });

  // Initialize sortable for each column
  $(".droppable").sortable({
    connectWith: ".droppable",
    update: function(event, ui) {
      // Handle task reordering or moving between columns here
      var taskId = ui.item.attr("id");
      // GET project id for local storage  to var 
      var newColumnId = ui.item.closest(".droppable").attr("id");
      const projectId = localStorage.getItem("projectID");
      // You can update task status or perform other actions here
      console.log("Task ID:", taskId);
      console.log("New Column ID:", newColumnId);
      $.ajax({
        url: `/api/projects/${projectId}/tasks/update/${taskId}`,
        method: "POST",
        data: {
              projectId: projectId,
              newColumnId: newColumnId,
        },
        
        success: function (data) {
          console.log("task item updated" , taskId,newColumnId);          
        },
      });
    },
  });

  // Add a dragover event listener to the droppable containers
  $(".droppable").on("dragover", function(event) {
    event.preventDefault();
  });

  // Add a drop event listener for handling the drop event
  $(".droppable").on("drop", function(event) {
    event.preventDefault();
    var draggedElementId = event.originalEvent.dataTransfer.getData("text/plain");
    $("#" + draggedElementId).appendTo(this);
  });

  // Add a click event handler to toggle description visibility
  $(".card-body").on("click", ".toggle-description", function() {
    var $description = $(this).closest(".card").find(".card-description");
    $description.toggleClass("d-none");
    $(this).text(function(i, text) {
      return text === "+" ? "-" : "+";
    });
  });
  
  $("#createTask").on("click", function () {
    console.log("Create button clicked"); // Debugging line
    const projectId = $(this).data("project");
    console.log("project id", projectId);
    const newTaskName = $("#newTask").val().trim();
    const newTaskDescription = $("#newTaskDescription").val().trim();
    console.log("Task name:", newTaskName); // Debugging line
    console.log("Task description:", newTaskDescription); // Debugging line
  
    if (newTaskName !== "") {
      $.ajax({
        url: `/api/projects/${projectId}/tasks`,
        method: "POST",
        data: {
          name: newTaskName,
          description: newTaskDescription,
        },
        
        success: function (data) {
          console.log("AJAX Success Function Executed");
          // Clear input fields
          $("#newTask").val("");
          $("#newTaskDescription").val("");
        
          var newTask = {
            id: data.id,
            task_name: data.name,
            task_description: data.description
          };
          console.log(newTask)
        
          // Create the HTML for the new task
          var taskHtml = `
            <div class="card draggable mb-3" id="task${newTask.id}">
              <div class="card-body">
                <h5 class="card-title">${newTask.task_name}</h5>
                <p class="card-text">${newTask.task_description}</p>
              </div>
            </div>
          `;
        
          // Append the new task to the "To Do" column
          $("#todo-column").append(taskHtml);
        
          // Make the new task draggable
          addDragAndDrop($("#task" + newTask.id));
        },
      });
    }
  });
});