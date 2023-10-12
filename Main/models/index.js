const User = require('./User');
const Project = require('./Project');
const Comments = require('./Comments');
const Task = require('./Task'); // Import the Task model

// rf

Project.hasMany(Task, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE',
});

Task.belongsTo(Project, {
  foreignKey: 'project_id',
});

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
 
Comments.belongsTo(User, {
  foreignKey: "user_id",
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

Project.hasMany(Comments, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE'
});

// Comments.belongsTo(User, {
//   foreignKey: 'user_id'
// })

Comments.belongsTo(Project, {
  foreignKey: 'project_id'
});

module.exports = { User, Project, Comments, Task };
