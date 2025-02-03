const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  serverId: { type: Schema.Types.ObjectId, ref: "Server", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  groupId: { type: Schema.Types.ObjectId, ref: "ChatGroup", required: false },
  type: { type: String, enum: ["global", "local", "clan", "private"], required: true },
  position: { x: Number, y: Number, z: Number },
  rotation: { x: Number, y: Number, z: Number, w: Number },
  tickSent: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);
