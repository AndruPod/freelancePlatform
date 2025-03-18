import {DataTypes} from "sequelize";
import sequelize from '../db.js'

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
})

const Offer = sequelize.define('Offer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false},
})

const UserOffer = sequelize.define('UserOffer', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true},
    offer_id: {type: DataTypes.INTEGER, primaryKey: true},
})

User.hasMany(UserOffer, {foreignKey: 'user_id'})
UserOffer.belongsTo(User, {foreignKey: 'user_id', as: 'user'})

Offer.hasMany(UserOffer, {foreignKey: 'offer_id'})
UserOffer.belongsTo(Offer, {foreignKey: 'offer_id', as: 'offer'})

User.belongsToMany(Offer, { through: UserOffer, foreignKey: 'user_id' })
Offer.belongsToMany(User, { through: UserOffer, foreignKey: 'offer_id' })

export {
    User,
    Offer,
    UserOffer,
}

export default{
    User,
    Offer,
    UserOffer,
}