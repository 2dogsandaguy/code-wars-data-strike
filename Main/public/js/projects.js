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
      var newColumnId = ui.item.closest(".droppable").attr("id");

      // You can update task status or perform other actions here
      console.log("Task ID:", taskId);
      console.log("New Column ID:", newColumnId);
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
  
  $("#createTask").on("click", function() {
    var newTaskName = $("#newTask").val().trim();
    var newTaskDescription = $("#newTaskDescription").val().trim();

    if (newTaskName !== "") {
      var newTaskId = "task" + ($(".draggable").length + 1);

      // Create a new task element with Bootstrap card styling and description
      var newTaskElement = $("<div>")
        .addClass("draggable card mb-3")
        .attr("id", newTaskId)
        .html(
          '<div class="card-body">' +
            '<h5 class="card-title">' + newTaskName + ' <a href="#" class="toggle-description">+</a></h5>' +
            '<p class="card-description d-none">' + newTaskDescription + '</p>' +
          '</div>'
        );
 
      // Add drag-and-drop functionality to the new task
      addDragAndDrop(newTaskElement);

      // Append the new task to the "To Do" column by default
      $("#todo-column").append(newTaskElement);

      // Clear the input fields
      $("#newTask").val("");
      $("#newTaskDescription").val("");
    }
  });
});