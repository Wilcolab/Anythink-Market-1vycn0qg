const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const auth = require("../auth");

/**
 * GET /api/comments
 * Returns a list of comments. Query params supported:
 *  - limit (number)  default 100
 *  - offset (number) default 0
 * Auth is optional; when provided the returned comments include
 * seller information tailored for the authenticated user.
 */
router.get("/", auth.optional, async function(req, res, next) {
	try {
		const limit = typeof req.query.limit !== "undefined" ? Number(req.query.limit) : 100;
		const offset = typeof req.query.offset !== "undefined" ? Number(req.query.offset) : 0;

		const user = req.payload ? await User.findById(req.payload.id) : null;

		const comments = await Comment.find({})
			.populate("seller")
			.populate("item")
			.limit(limit)
			.skip(offset)
			.sort({ createdAt: "desc" })
			.exec();

		return res.json({ comments: comments.map(function(c) {
			return c.toJSONFor(user);
		}) });
	} catch (err) {
		return next(err);
	}
});

/**
 * Preload comment object on routes with ':id'
 */
router.param("id", async function(req, res, next, id) {
	try {
		const comment = await Comment.findById(id).populate("seller").populate("item").exec();
		if (!comment) {
			return res.sendStatus(404);
		}

		req.comment = comment;
		return next();
	} catch (err) {
		return next(err);
	}
});

/**
 * DELETE /api/comments/:id
 * Deletes a comment if the authenticated user is its seller.
 */
router.delete("/:id", auth.required, async function(req, res, next) {
	try {
		const user = await User.findById(req.payload.id);
		if (!user) {
			return res.sendStatus(401);
		}

		if (req.comment.seller._id.toString() === req.payload.id.toString()) {
			await req.comment.remove();
			return res.sendStatus(204);
		} else {
			return res.sendStatus(403);
		}
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
