const Post = require("../models/Posts");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};
exports.newPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select("-password");

    const post = new Post({
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    });

    if (!post) return res.send({ msg: "please try that again" });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "server error" });
  }
};
exports.editPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erors: errors.array() });

  
  const { text } = req.body;
  
  try {
    const user = await User.findById(req.user.id).select("-password");

    const post = await Post.findByIdAndUpdate(req.params.postId, {text: text})

    if (!post) return res.send({ msg: "please try that again" });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "server error" });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "authorization denied" });

    await Post.findByIdAndRemove(req.params.post_id);

    res.json({ msg: "post deleted" });
  } catch (err) {
    console.log(err);
    if (err.kind == "ObjectId")
      return res.status(404).send({ msg: "post not found" });
    res.status(500).send({ msg: "server error" });
  }
};
exports.addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return res.status(400).json({ msg: "post already liked" });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "invalid Object_id" });
    res.status(500).json({ msg: "server error" });
  }
};
exports.unLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(400).json({ msg: "post has not been liked" });

    likeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(likeIndex, 1);

    await post.save();

    res.json({ msg: "post unliked", likes: post.likes });
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "invalid Object_id" });
    res.status(500).json({ msg: "server error" });
  }
};
exports.newComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const post = await Post.findById(req.params.post_id);
    const user = await User.findById(req.user.id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    post.comments.unshift(comment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "invalid Object_id" });
    res.status(500).json({ msg: "server error" });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "post not found" });

    if (
      post.comments.filter((comment) => comment.user.toString() === req.user.id)
        .length === 0
    )
      return res.status(401).json({ msg: "authorization denied" });

    const commentIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    if (commentIndex === -1)
      return res.status(404).json({ msg: "comment not found" });

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.json({ msg: "comment deleted", comments: post.comments });
  } catch (err) {
    console.log(err);
    if (err.kind == "ObjectId")
      return res.status(404).json({ msg: "invalid Object_id" });
    res.status(500).json({ msg: "server error" });
  }
};
