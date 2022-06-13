const Connection =require('../dbconfig/dbconnect');
const { DataTypes }=require('sequelize');
const session=require('./session');
const tasks=require('./Tasks');

const dbConnection=Connection.connect;

const userInfo=dbConnection.define('userinfo',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    passcode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mailid:{
        type:DataTypes.STRING,
    },
    uid:{
        type:DataTypes.STRING,
        primaryKey:true
    },
},
    {
        freezeTableName: true,
        timestamps: false
    }
)
userInfo.hasMany(session.STable,{foreignKey:'uid'})
userInfo.hasMany(tasks.TasksTable,{foreignKey:'uid'})
dbConnection.sync();
module.exports.UserTable=userInfo;