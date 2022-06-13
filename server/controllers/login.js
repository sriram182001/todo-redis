const Connection=require('../dbconfig/dbconnect')
const userInfo=require('../models/userinfo')
const session=require('../models/session')

module.exports.LogIn=async(request,reply)=>{
    try
    {
    //const dbConnection=await Connection.connect;
    //const [results,metadata]= await dbConnection.query(`select * from userinfo where uid='${request.payload.state.uid}';`);
    //console.log(results);
    const results= await userInfo.UserTable.findAll({where:{uid:request.payload.state.uid}})
    if(results.length===0)
    {
        reply('invalid user');
    }
    else{
        if(request.payload.state.passcode===results[0].passcode)
        {
            var currentdate = new Date(); 
            var time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+"."
                + currentdate.getMilliseconds();
            //await dbConnection.query(`insert into session(uid,initial,latest) values('${results[0].uid}',now(),now());`);
            await session.STable.create({uid:results[0].uid,initial:time,latest:time})
            //const [r1,m1]=await dbConnection.query('select id from session order by id desc limit 1;')
            //console.log(r1)
            const r1=await session.STable.findAll({attributes:['id'],order:[['id','DESC']],limit:1})
            request.cookieAuth.set({id:r1[0].id,uid:results[0].uid});
            reply('ok');
            

        }
        else{
            reply('wrong password')
        }
    }
    }
    catch(err){
        console.log(err);
    }

}
