const Hapi=require('hapi');
const server=new Hapi.Server();
const userInfo=require('./models/userinfo')
const sessionM=require('./models/session')
const Routes=require('./routes/app.js')
const Connection=require('./dbconfig/dbconnect');
const { now } = require('moment');



server.connection({
    port:3000,
    host:'localhost',
    routes:{cors:true}
});

server.register([require('vision'),require('hapi-auth-cookie')]);
server.views({
        engines:{'html':require('handlebars')} ,
        relativeTo: __dirname,
        path: 'views'
    });


/* server.state('session',{
    ttl:1000 * 60,
    encoding:'base64json',
}); */

server.auth.strategy('session', 'cookie', true, {
    password: 'password-should-be-32-characters',
    cookie: 'session',
    ttl:1000*60*60,
    isSecure: false,
    keepAlive:true,
    validateFunc: async function (request, session, callback) {
        try{
        console.log(session);
        //const dbconnection=await Connection.connect;
        
        //const [results,metadata]=await dbconnection.query(`select id from session where uid='${session.uid}';`)
        const r=await sessionM.STable.findAll({attributes:['id'],where:{uid:session.uid}})
        const rstr=JSON.stringify(r);
        const results=JSON.parse(rstr);
        console.log(results[0].id)

        for(let i=0;i<results.length;i++)
        {
            if(session.id===results[i].id)
            {
                //request.session = session.uid;
                //await dbconnection.query(`update session set loggedin=true,latest=now() where id=${results[i].id};`);
                var currentdate = new Date(); 
                var time = currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds()+"."
                            +currentdate.getMilliseconds();
                await sessionM.STable.update({loggedin:true,latest:time},{where:{id:results[i].id}})
                return callback(null,true,null);
            }
        }
            return callback(null,false,null)
          
        }
        catch(err){
           console.log(err);
        }
    }
} 
);

server.route([...Routes]);

server.start((err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server running @ ${server.info.uri}`)
})