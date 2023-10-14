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
router.post('/:id/tasks', async (req, res) => {
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



router.post('/:id/tasks/update/:taskId', async (req, res) => {
  try {
    /* console.log("Task update",req.params.id) */
    console.log("TaskId",req.params.taskId)
    console.log("project Id",req.params.id)
    console.log("",req.body)


  }catch{
    (err) 
      res.status(500).json(err);
  }
})




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
