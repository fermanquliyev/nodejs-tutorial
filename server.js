import http from 'http';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './postController.js';
import url from 'url';

const server = http.createServer((req, res) =>
{
    const parsedUrl = url.parse(req.url);
    const method = req.method;
    const path = parsedUrl.pathname;

    if (path === '/posts' && method === 'GET')
    {
        getAllPosts(req, res);
    }
    else if (path.match(/^\/posts\/\d+$/) && method === 'GET')
    {
        req.params = { id: path.split('/')[2] };
        getPostById(req, res);
    }
    else if (path === '/posts' && method === 'POST')
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
    else if (path.match(/^\/posts\/\d+$/) && method === 'PUT')
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
    else if (path.match(/^\/posts\/\d+$/) && method === 'DELETE')
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