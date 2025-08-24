const posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' },
];


const getAllPosts = (req, res) =>
{
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(posts));
}

const getPostById = (req, res) =>
{
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    res.setHeader('Content-Type', 'application/json');
    if (post)
    {
        res.write(JSON.stringify(post));
    } else
    {
        res.status(404).write(JSON.stringify({ message: 'Post not found' }));
    }
};

const createPost = (req, res) =>
{
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };
    res.setHeader('Content-Type', 'application/json');
    posts.push(newPost);
    res.status(201).write(JSON.stringify(newPost));
}

const updatePost = (req, res) =>
{
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const post = posts.find(p => p.id === postId);
    res.setHeader('Content-Type', 'application/json');
    if (post)
    {
        post.title = title || post.title;
        post.content = content || post.content;
        res.json(post);
    } else
    {
        res.status(404).write(JSON.stringify({ message: 'Post not found' }));
    }
};


const deletePost = (req, res) =>
{
    const postId = parseInt(req.params.id, 10);
    const postIndex = posts.findIndex(p => p.id === postId);
    res.setHeader('Content-Type', 'application/json');
    if (postIndex !== -1)
    {
        posts.splice(postIndex, 1);
        res.status(204).end();
    } else
    {
        res.status(404).write(JSON.stringify({ message: 'Post not found' }));
    }
};

const getPostsAsTable = (req, res) =>
{
    res.setHeader('Content-Type', 'text/html');
    let table = '<table border="1"><tr><th>ID</th><th>Title</th><th>Content</th></tr>';
    posts.forEach(post =>
    {
        table += `<tr><td>${post.id}</td><td>${post.title}</td><td>${post.content}</td></tr>`;
    });
    table += '</table>';
    res.write(table);
}

export { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostsAsTable };