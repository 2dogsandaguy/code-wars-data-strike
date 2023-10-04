const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allComments = await Comments.findAll({})
        res.json(allComments);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
    const commentsData = await Comments.findAll({
        where: {
            id: req.params.id
        }
    })
    res.json(commentsData);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})


router.post('/:id', async (req, res) => {
    try {
        const userComment = await Comments.create({
            where: [
                {
                    id: params.req.id,
                    user_id: req.session.user_id,
                }
            ]
        })
        res.json(userComment);
    } catch {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const userComment = await Comments.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!userComment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(userComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;