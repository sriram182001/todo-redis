const tasks=require('../models/Tasks');
const getter=require('../redis/getter')
const setter=require('../redis/setter')


module.exports.GetTask=async(request,reply)=>{
    try {
        const val=await getter.Getter(`user_${request.auth.credentials.uid}`);
        if(val!=null){
        console.log('from redis')
        reply(JSON.parse(val))
        }
        else{
        const r=await tasks.TasksTable.findAll({attributes:['task','id'],where:{uid:request.auth.credentials.uid}});
        const rstr=JSON.stringify(r);
        console.log(rstr);
        console.log('from db');
        await setter.Set(`user_${request.auth.credentials.uid}`,3600,rstr);
        reply(JSON.parse(rstr));
        }
                
            
            
    
        
        //const results=JSON.parse(rstr);
        //console.log(results);
        //reply(results);
    } catch (error) {
        console.log(error);
        reply('error').code(500);
    }
}