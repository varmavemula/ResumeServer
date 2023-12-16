const http = require("http");
const port = 3333;
const fs = require("fs");
const path = require('path');

function requestHandler(req,res){
    console.log(req.url);
    if(req.url.startsWith("/images/")){
        const imgPath = path.join(__dirname,req.url);
        fs.readFile(imgPath,function(err,data){
            console.log("imageData: ",data);
            console.log(imgPath);
            let contentType = '';
            if(req.url.endsWith(".png")){
                contentType = 'image/png';
            }
            else if(req.url.endsWith(".JPG")){
                contentType='image/JPG';
            }
            else{
                contentType = 'image/jpg';
            }
            res.writeHead(200, {
                "Content-Type": contentType
            });
            res.end(data);

        });
    }
    res.writeHead(200, {'Content-Type':'text/html'});

    fs.readFile('./resume.html', function(err, htmldata){
        if(err){
            console.log("error");
            res.end('<h1>Error!</h1>');
            return;
        }
        
    fs.readFile('./resume.css', function(err, cssdata){
        if(err){
            res.end('<h1>OOPS! something went wrong in css file reading</h1>');
            return;
        }

        
        // console.log(cssdata);
        const combinedContent = 
            `
                <html>
                <head>
                    <style>${cssdata}</style>
                </head>
                <body>
                    ${htmldata}
                </body>
                </html>
            `;

        // Send combined content in the response
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(combinedContent);
    });
    

    });
    
}
const server = http.createServer(requestHandler);

server.listen(port, function(err){
    if(err){
        console.log("error");
        return;
    }
    console.log("server is up and running in the port: ", port);
})