'use strict';
import { Model } from 'sequelize';

interface FriendAttributes {
    friendSeq: number;
    userSeq: number;
    otherSeq: number;
    status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Friend extends Model<FriendAttributes> implements FriendAttributes {
        friendSeq!: number;
        userSeq!: number;
        otherSeq!: number;
        status!: string;

        // static associate(models: any) {
        //     Friend.belongsTo(models.User, {
        //         foreignKey:'userSeq'
        //     })
        // }
    };
    Friend.init({
        friendSeq: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userSeq: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userSeq',
            }
        },
        otherSeq: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userSeq'
            }
        },
        // 요청함, 친구상태, 차단함, 거절함
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['requested', 'friend', 'blocked', 'rejected']
        }
    }, {
        sequelize,
        modelName: 'Friend',
    });
    return Friend;
};