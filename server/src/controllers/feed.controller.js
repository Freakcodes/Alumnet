import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feed } from "../models/feed.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const uploadPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  // console.log(content);

  let imageLocalPath;

  if (req.file) {
    imageLocalPath = req.file.path;
  }
  // console.log(imageLocalPath);

  const imageFile = await uploadOnCloudinary(imageLocalPath);
  // console.log(imageFile);

  const uploadedPost = await Feed.create({
    content: content || "",
    image: {
      url: imageFile?.url || "",
      public_id: imageFile?.public_id || "",
    },
    owner: req.user?._id,
  });

  if (!uploadedPost) {
    throw new ApiError(500, "Server error while uploading post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, uploadedPost, "Post uploaded successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!isValidObjectId(postId)) {
    throw new ApiError(400, "Invalid Post id");
  }

  const post = await Feed.findById(postId);
  if (!post) {
    throw new ApiError(400, "Post not found");
  }

  await deleteFromCloudinary(post.image?.public_id);

  const deletedPost = await Feed.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Post deleted successfully"));
});

const getFeed = asyncHandler(async (req, res) => {});

export { uploadPost, deletePost, getFeed };
