const Connection =require('../dbconfig/dbconnect');
const { DataTypes }=require('sequelize');

const dbConnection=Connection.connect;

const Tasks=dbConnection.define('task',{
    task:{
        type:DataTypes.STRING,
        allowNull:false
    },
    uid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created:{
        type:DataTypes.TIME,
        allowNull:false
    },
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
)
module.exports.TasksTable=Tasks;