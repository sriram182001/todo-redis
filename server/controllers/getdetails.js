const Connection=require('../dbconfig/dbconnect')
const userInfo=require('../models/userinfo')

module.exports.GetDetails=async(request,reply)=>{
    try{
    const uid=request.auth.credentials.uid;
    //console.log(uid)
    //const dbConnection=await Connection.connect;
    //const [results,metadata]=await dbConnection.query(`select * from userinfo where uid='${uid}';`);
    const results=await userInfo.UserTable.findAll({where:{uid:uid}})
    //console.log(results,'im inside getdetails')
    reply(results[0]);
    }
    catch(err)
    {
        console.log(err)
    }
}