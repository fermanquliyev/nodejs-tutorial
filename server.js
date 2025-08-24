import http from 'http';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostsAsTable } from './postController.js';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

const server = http.createServer(async (req, res) =>
{
    const parsedUrl = url.parse(req.url);
    const method = req.method;
    const parsedUrlPath = parsedUrl.pathname;

    console.log(`Received ${method} request for ${parsedUrlPath}`);

    if (parsedUrlPath === '/postsAsTable' && method === 'GET')
    {
        getPostsAsTable(req, res);
    }
    else if (parsedUrlPath === '/home' && method === 'GET')
    {
        var filePathHtml = path.join(__dirname, 'public', 'index.html');
        var data = await fs.readFile(filePathHtml)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    }
    else if (parsedUrlPath === '/posts' && method === 'GET')
    {
        getAllPosts(req, res);
    }
    else if (parsedUrlPath.match(/^\/posts\/\d+$/) && method === 'GET')
    {
        req.params = { id: path.split('/')[2] };
        getPostById(req, res);
    }
    else if (parsedUrlPath === '/posts' && method === 'POST')
    {
        let body = '';
        req.on('data', chunk =>
        {
            body += chunk.toString();
        });
        req.on('end', () =>
        {
            req.body = JSON.parse(body);
            createPost(req, res);
        });
    }
    else if (parsedUrlPath.match(/^\/posts\/\d+$/) && method === 'PUT')
    {
        let body = '';
        req.on('data', chunk =>
        {
            body += chunk.toString();
        });
        req.on('end', () =>
        {
            req.body = JSON.parse(body);
            updatePost(req, res);
        });
    }
    else if (parsedUrlPath.match(/^\/posts\/\d+$/) && method === 'DELETE')
    {
        deletePost(req, res);
    }
    else
    {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'Route not found' }));
    }
    res.end();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});