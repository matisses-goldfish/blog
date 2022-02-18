const User = require('./User');
const BlogPost = require('./BlogPost');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

// topic has many discussions
// dicussion has one topic

module.exports = { User, BlogPost };