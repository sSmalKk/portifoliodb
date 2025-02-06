const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entitySchema = new Schema(
  {

    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },

    name: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Novo campo de dono
    pack: {
      ref: 'Pack',
      type: Schema.Types.ObjectId
    },

    image: { type: String },

    description: { type: String },
     position: { type: [Number], default: [0, 0, 0] },
    rotation: { type: [Number], default: [0, 0, 0] },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entity", entitySchema);
