const sequelize = require('sequelize');

module.exports = (db) => {
    const Message = db.define('message',{
        content: {type: sequelize.STRING}
    });

    Message.associate = (({ User }) => {
        Message.belongsTo(User);
    });

    return Message;
};
