 // Get all elements with the class "draggable"
 var draggableElements = document.querySelectorAll(".draggable");

 // Add drag-and-drop functionality to each draggable element
 draggableElements.forEach(function(element) {
   element.draggable = true;

   element.addEventListener("dragstart", function(event) {
     // Store the dragged element's ID in the dataTransfer object
     event.dataTransfer.setData("text/plain", event.target.id);
   });
 });

 // Add a dragover event listener to the droppable containers
 var droppableContainers = document.querySelectorAll(".droppable");
 droppableContainers.forEach(function(container) {
   container.addEventListener("dragover", function(event) {
     event.preventDefault(); // Prevent the default behavior of the dragged element
   });

   container.addEventListener("drop", function(event) {
     event.preventDefault(); // Prevent the default behavior of the dragged element

     // Get the dragged element's ID from the dataTransfer object
     var draggedElementId = event.dataTransfer.getData("text/plain");

     // Append the dragged element to the droppable container
     var draggedElement = document.getElementById(draggedElementId);
     container.appendChild(draggedElement);
   });
 });
