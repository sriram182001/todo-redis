const tasks=require('../models/Tasks');
const del=require('../redis/del')

module.exports.AddTask=async(request,reply)=>{
    try {
        var currentdate = new Date(); 
        var time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()+"."
                +currentdate.getMilliseconds();
        
        await tasks.TasksTable.create({task:request.payload.state.task,uid:request.auth.credentials.uid,created:time});
        await del.Del(`user_${request.auth.credentials.uid}`);
        reply('added');
    } catch (error) {
        
        console.log(error);
        reply('error')
    }
}