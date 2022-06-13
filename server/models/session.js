const Connection=require('../dbconfig/dbconnect');
const {DataTypes}=require('sequelize');
//const userinfo=require('./userinfo');

const dbConnection=Connection.connect;
const SessionTable=dbConnection.define('session',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    uid:{
        type:DataTypes.STRING,
    },
    loggedin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    initial:{
        type:DataTypes.TIME
    },
    latest:{
        type:DataTypes.TIME
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports.STable=SessionTable;

/* module.exports.SessionTable=async function(uid){
    await userInfo.create({uid}).then((data)=>{
        console.log(data.toJSON(),"added");
    });
} */
//dbConnection.sync();