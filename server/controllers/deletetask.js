const tasks=require('../models/Tasks');
const del=require('../redis/del');

module.exports.DeleteTask=async(request,reply)=>{
    try {
        
        await tasks.TasksTable.destroy({where:{id:request.payload.id}});
        await del.Del(`user_${request.auth.credentials.uid}`);
        reply('deleted');

    } catch (error) {
        
        console.log(error);
        reply('error').code(500)
    }
}