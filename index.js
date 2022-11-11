const http = require('http');
const fs = require('fs');
const url = require('url');

const indexTemplate = fs.readFileSync(`${__dirname}/project1/index.html`, 'utf-8');

const server = http.createServer((req,res)=>{
    // const pathname = req.url;
    // console.log(pathname);
    const {pathname, query} = url.parse(req.url, true);
    console.log(query);
    console.log(pathname);
    if (pathname === '/'|| pathname ==='/home'){
        
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(indexTemplate);
    }
    else if(pathname==='/index.js?fname=&profession=student'){

        res.writeHead(200, {
            'Content-type':'text/html'
        });
        res.end('<h1>Thanks for registering..!!</h1>\nCheers:)');
    }
})

server.listen('8000', '127.0.0.1', ()=>{
    console.log('listening on port 8000');
})