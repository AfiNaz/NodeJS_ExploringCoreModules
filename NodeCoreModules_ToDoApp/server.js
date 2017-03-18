var http= require('http');
var fs= require('fs');   
var querystring = require('querystring');
var tf = require('./Controller/taskFunctions.js');

http.createServer(function(req,res){
    console.log(req.url);
    console.log(req.body);
    if(req.url.split("?")[0] == '/t'){
        console.log("im in");
        fs.readFile('./views/todos.html', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });         
            res.write(data);
            console.log("Request: ",req.body,"URL: ", req.url);
            var qs = querystring.parse(req.url.split("?")[1]);
            console.log("URLs: ", req.url.split("?")[0]);
            console.log("qs: ", qs);
            console.log(qs.task);
            if(qs.task !== undefined){
                tf.addTask(qs.task);
                console.log("All Tasks are: ", tf.getTasks());
                res.write("<div id='add1'><table>");
                tf.getTasks().forEach(task =>{
                    res.write("<tr><td><form><h3>"+task+"<input type='hidden' value='"+task+"' name='del'></td><td><input type='submit' value='Delete' /></h3></form></td></tr>");
                });
                res.write("</table></div>");
            }  
            if(qs.del !== undefined){
                res.write("<div id='add1'><table>");
                tf.del(qs.del).forEach(task =>{
                    res.write("<tr><td><form><h3>"+task+"<input type='hidden' value='"+task+"' name='del'></td><td><input type='submit' value='Delete' /></h3></form></td></tr>");
                });
                res.write("</table></div>");
            }
            res.end();
        });        
    }
     else if(req.url.split("?")[0] == '/task'){
         console.log("Deleting the Task");
         res.end();
     }
}).listen(3000,function(req,res){
    console.log("Server has started!");
});



///how to view server.js file's array in html.
