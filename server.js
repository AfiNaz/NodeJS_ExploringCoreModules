var http= require('http');
var fs= require('fs');
var path= require('path');

mimeTypes = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg"
};

function requestHandler(req, res) {
    var fileName = path.basename(req.url) || 'home.html',
    var ext = path.extname(fileName);
    console.log("Ext: ", ext);
    var staticFiles = __dirname + '/views/',
    var localPic = __dirname + '/Images/',
    var NotFoundPage = staticFiles + 'NotFoundPage.html';

    if(!mimeTypes[ext]){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("No Such File Found.");
    };

    console.log((staticFiles + fileName));
    if(mimeTypes[ext] === "image/jpeg" || mimeTypes[ext] === "image/png" ){
        renderFile((localPic + fileName),res,NotFoundPage,mimeTypes[ext]);
    }
    else{
        if(req.url === "/home.html"){
            renderFile((staticFiles + "home.html"),res,NotFoundPage,mimeTypes[ext]);
        }
        else if(req.url === "/model.html"){
            renderFile((staticFiles + "model.html"),res,NotFoundPage,mimeTypes[ext]);
        }
    }
};

function renderFile(filePath,res,NotFoundPage,mimeType){
    fs.exists(filePath,function(exists){
        if(exists){
            fs.readFile(filePath,function(err,data){
                if(!err){
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : data.length
                    });
                    console.log("Content: ",data);
                    res.end(data);
                } else {
                    console.dir(err);
                };
            });
        } else {
            fs.readFile(NotFoundPage,function(err,data){
                if(!err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(data);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};

http.createServer(requestHandler).listen(3000,function(req,res){
    console.log("Server has started!");
});



// http.createServer(function(req,res){

//     // var ext=req.url.split(".");
//     // console.log(ext[ext.length -1]);
//     // if(req.url === "/"){
//     //     res.writeHead(200, {'Content-Type': 'text/html'});
//     //     res.write('<html><body><img src="data:lg/jpg;base64,')
//     //     // res.write(new Buffer(data).toString('base64'));
//     //     res.end('"/></body></html>');
//     // }
//     // if(ext[ext.length -1] === "png" || ext[ext.length -1] === "jpg"){
//     //     ext = "image/"+ext[ext.length -1];
//     //     console.log("Extension: ", ext);
//     //     res.writeHead(200, { 'Content-Type': ext });         
//     //     var fileName = req.url.split("/");
//     //     var file = 'Images/'+fileName[fileName.length -1];
//     //     fs.stat(file, function (err, stat) {
//     //         var img = fs.readFileSync(file);
//     //         // res.contentType = ext;
//     //         res.end(img, 'binary');
//     //     });
//     // }
//     staticFiles = __dirname + '/views/';
//     fileName = staticFiles+'home.html';
//     if(req.url === "/"){
//            fs.readFile(fileName,function(err,data){
//                 if(!err){
//                     //if there was no error
//                     //send the data with the default 200/ok header
//                     res.writeHead(200,{
//                         "Content-type" : "text/html",
//                         "Content-Length" : data.length
//                     });
//                     res.end(data);
//                 } else {
//                     //for our own troubleshooting
//                     console.dir(err);
//                 };
//            });      
//         // fs.readFile(fileName, function (err, data) {
//         //     res.writeHead(200, { 'Content-Type': 'text/html' });
//         //     if (err) throw err;
//         //     res.write(data);
//         //     res.end();
//         // });
//         // var file = 'Images/lg.jpg';
//         //     fs.stat(file, function (err, stat) {
//         //         var img = fs.readFileSync(file);
//         //         res.contentType = 'image/jpg';
//         //         res.end(img, 'binary');
//         //     });
//     }
//     // if(req.url === "/model"){
//     //     res.writeHead(200, { 'Content-Type': 'text/html' });         
//     //     fs.readFile('./views/model.html', function (err, data) {
//     //         if (err) throw err;
//     //         res.write(data);
//     //         res.end();
//     //     });
//     // }
// }).listen(3000, function(req,res){
//     console.log("Server has started!");
// });


//////////////////////////////////////////////////////////////////////////////////////////////


// // //include http, fs and url module
// // var http = require('http'),
// //     fs = require('fs'),
// //     path = require('path'),
// //     url = require('url');
// //     imageDir = 'Images/';
 
// // //create http server listening on port 3333
// // http.createServer(function (req, res) {
// //     //use the url to parse the requested url and get the image name
// //     var query = url.parse(req.url,true).query;
// //         pic = query.image;
 
// //     if (typeof pic === 'undefined') {
// //         getImages(imageDir, function (err, files) {
// //             var imageLists = '<ul>';
// //             for (var i=0; i<files.length; i++) {
// //                 imageLists += '<li><a href="/?image=' + files[i] + '">' + files[i] + '</li>';
// //             }
// //             imageLists += '</ul>';
// //             res.writeHead(200, {'Content-type':'text/html'});
// //             res.end(imageLists);
// //         });
// //     } else {
// //         //read the image using fs and send the image content back in the response
// //         fs.readFile(imageDir + pic, function (err, content) {
// //             if (err) {
// //                 res.writeHead(400, {'Content-type':'text/html'})
// //                 console.log(err);
// //                 res.end("No such image");    
// //             } else {
// //                 //specify the content type in the response will be an image
// //                 res.writeHead(200,{'Content-type':'image/jpg'});
// //                 res.end(content);
// //             }
// //         });
// //     }
 
// // }).listen(3333);
// // console.log("Server running at http://localhost:3333/");
 
// // //get the list of jpg files in the image dir
// // function getImages(imageDir, callback) {
// //     var fileType = '.jpg',
// //         files = [], i;
// //     fs.readdir(imageDir, function (err, list) {
// //         for(i=0; i<list.length; i++) {
// //             if(path.extname(list[i]) === fileType) {
// //                 files.push(list[i]); //store the file name into the array files
// //             }
// //         }
// //         callback(err, files);
// //     });
// // }