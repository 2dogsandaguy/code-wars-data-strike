const router = require('express').Router();
const { Project , Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
//rf  
router.post('/:id/tasks', withAuth ,async (req, res) => {
  try {
    console.log(req.params.id ,"tasks posted");
    const newTask = await Task.create({
      name: req.body.name,
      description: req.body.description,
      project_id: req.params.id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:projectId/tasks/:taskId', withAuth, async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Check if the task belongs to the project and the user
    const task = await Task.findOne({
      where: { id: taskId, project_id: projectId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/:id/tasks/update/:taskId', async (req, res) => {
  try {
    const projectId = req.params.id;
    const taskId = req.params.taskId;
    const newColumnId = req.body.newColumnId;
    
    
    // Assuming you have a "status" column in your Task model to represent the column/status
    const updatedTask = await Task.update(
      { status: newColumnId }, // Use newColumnId as a string here
      {
        where: { id: taskId, project_id: projectId },
      }
    );
    console.log(updatedTask);

    if (updatedTask[1] === 0) {
      // If no rows were updated, it means the task doesn't exist or the status didn't change.
      return res.status(400).json({ message: 'Task not found or status did not change.' });
    }
    if (!newColumnId) {
      return res.status(400).json({ error: 'New column ID is missing.' });
    }

    // Task status was updated successfully
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { project_id: req.params.id },
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router ;
