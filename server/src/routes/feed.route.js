import { Router } from "express";
import {
  uploadPost,
  deletePost,
  getFeed,
} from "../controllers/feed.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/post").get(getFeed).post(upload.single("image"), uploadPost);
router.route("/post/:postId").delete(deletePost);

export default router;
