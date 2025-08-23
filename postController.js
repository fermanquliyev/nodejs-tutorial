const posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' },
];


const getAllPosts = (req, res) =>
{
    res.write(JSON.stringify(posts));
}

const getPostById = (req, res) =>
{
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
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
    posts.push(newPost);
    res.status(201).write(JSON.stringify(newPost));
}

const updatePost = (req, res) =>
{
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const post = posts.find(p => p.id === postId);
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
    if (postIndex !== -1)
    {
        posts.splice(postIndex, 1);
        res.status(204).end();
    } else
    {
        res.status(404).write(JSON.stringify({ message: 'Post not found' }));
    }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };