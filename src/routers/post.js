const { v1: uuidv1 } = require('uuid');
const express = require('express');
const { getPostsCollection } = require('../mongo');
const { redirectWithMsg } = require('../utill');

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.user) {
    res.status(403).end();
    return;
  }
  const posts = await getPostsCollection();
  const { content } = req.body;
  await posts.insertOne({
    id: uuidv1(),
    userId: req.user.id,
    content,
    createAt: new Date(),
  });
  redirectWithMsg({
    dest: '/',
    res,
    info: '포스트가 작성되었습니다.',
  });
});

router.post('/:postId/delete', async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const posts = await getPostsCollection();
  const existingPost = await posts.findOne({
    id: postId,
  });

  if (existingPost.userId !== req.user.id) {
    res.status(403).end();
    return;
  }

  posts.deleteOne({
    id: postId,
  });

  redirectWithMsg({
    dest: '/',
    res,
    info: '포스트가 삭제되었습니다.',
  });
});

router.post('/:postId/update', async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  console.log(postId);
  const posts = await getPostsCollection();
  const existingPost = await posts.findOne({
    id: postId,
  });

  if (existingPost.userId !== req.user.id) {
    res.status(403).end();
    return;
  }

  posts.updateOne(
    {
      id: postId,
    },
    {
      $set: {
        content,
      },
    }
  );

  redirectWithMsg({
    dest: '/',
    res,
    info: '포스트가 삭제되었습니다.',
  });
});

module.exports = router;
