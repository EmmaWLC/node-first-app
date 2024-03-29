const fs = require('fs');

const requestHandler = (req, res)=> {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<!DOCTYPE html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('<html>');
        return res.end();
    }
    
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data',(chunk)=>{
            console.log('chunk', chunk);
            body.push(chunk);
            console.log('body',body);
        });
        
        return req.on('end',()=>{
            console.log('Buffer',Buffer);
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody', parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=> {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        })
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from node.js Server</h1></body>');
    res.write('<html>');
    return res.end();

};

// module.exports = {
//     handler: requestHandler,
//     someText: 'this is hard coded text',
// };

module.exports.handler = requestHandler;
module.exports.someText = 'this is hard coded text';

// exports.handler = requestHandler;
// exports.someText = 'this is hard coded text';
