const User = require('./User');
const Project = require('./Project');
const Comments = require('./Comments');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Comments.hasMany(User, {
  foreignKey: 'user_id'
})

Comments.belongsTo(Project, {
  foreignKey: 'project_id'
})

module.exports = { User, Project, Comments };
