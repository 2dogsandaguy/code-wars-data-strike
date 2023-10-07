$(document).ready(function() {
    // Make tasks draggable
    $('.draggable').draggable({
      helper: 'clone', // Creates a clone of the task during drag
    });
  
    // Make columns droppable
    $('.droppable').droppable({
      accept: '.draggable', // Allow only draggable elements to be dropped
      drop: function(event, ui) {
        // Handle the drop event here
        const taskId = ui.helper.attr('id');
        const columnId = $(this).attr('id');
  
        // You can update the task status or perform other actions here
        console.log('Dropped task', taskId, 'into column', columnId);
      },
    });
  
    // Make the project details container draggable
    $('.project-details-container').draggable();
  });
