const http = require("http");
const port = 3333;
const fs = require("fs");

function requestHandler(req,res){
    console.log(req.url);
    res.writeHead(200, {'content-type':'text/html'});

    fs.readFile('./resume.html', function(err, htmldata){
        if(err){
            console.log("error");
            res.end('<h1>Error!</h1>');
            return;
        }
        
    fs.readFile('./resume.css', function(err, cssdata){
        if(err){
            console.log("error in css reading");
            res.end('<h1>OOPS! something went wrong in css file reading</h1>');
            return;
        }

        const combinedContent = `
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