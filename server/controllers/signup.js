const Connection=require('../dbconfig/dbconnect')
const userinfo=require('../models/userinfo')
const session=require('../models/session')

module.exports.SignUp=async (request,reply)=>{
    //const dbConnection=await Connection.connect;
    //const [results,metadata]= await dbConnection.query(`select name from userinfo where uid='${request.payload.state.uid}';`);
    //console.log(results);
  
    const results=await userinfo.UserTable.findAll({attributes:['name'],where:{uid:request.payload.state.uid}})
    console.log(results)

    if(results.length>0){
        console.log('in');
        reply('already exists');
    }
    else{
        await userinfo.UserTable.create({name:request.payload.state.name,passcode:request.payload.state.passcode,mailid:request.payload.state.mailid,uid:request.payload.state.uid});
        reply('added');
    }
    }