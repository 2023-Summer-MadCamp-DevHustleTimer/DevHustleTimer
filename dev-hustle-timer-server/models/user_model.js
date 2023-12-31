const Sequelize = require('sequelize');
class User extends Sequelize.Model {
    static initiate(sequelize) {
        const str0 = "0".repeat(336);
        User.init({
            deviceId: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(1000),
                allowNull: true,
            },
            possibleTime: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                defaultValue: str0,
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: true,
            paranoid: true,
        });
    }
    static associate(db) {
        db.User.belongsTo(db.Event, { foreignKey: 'eventId', targetKey: 'id' });
        db.User.hasMany(db.Notification, { foreignKey: 'writerId', sourceKey: 'id' });
        db.User.hasMany(db.Message, { foreignKey: 'writerId', sourceKey: 'id' });
        db.User.hasOne(db.Event, { foreignKey: 'hostId', sourceKey: 'id' });
    }
}
module.exports = User;