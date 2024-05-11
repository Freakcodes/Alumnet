import mongoose, { Schema } from "mongoose";

const feedSchema = new Schema(
  {
    content: {
      type: String,
    },
    image: {
      url: {
        type: String, // cloudinary url
      },
      public_id: {
        type: String, // cloudinary public_id
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Feed = mongoose.model("Feed", feedSchema);
