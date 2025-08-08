/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieves all comments, sorted by creation date (descending).
    * @route GET /api/comments/
    * @returns {Array<Object>} 200 - An array of comment objects
    * @returns {Object} 500 - Error message if fetching comments fails
    */

 /**
    * GET /:postId
    * @summary Retrieves comments for a specific post, sorted by creation date (descending).
    * @route GET /api/comments/:postId
    * @param {string} postId.path.required - The ID of the post to fetch comments for
    * @returns {Array<Object>} 200 - An array of comment objects for the specified post
    * @returns {Object} 500 - Error message if fetching comments fails
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => { 
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
    })

//add another endpoint to get comments by postId
router.get("/:postId", async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments for the specified post" });
    }
});