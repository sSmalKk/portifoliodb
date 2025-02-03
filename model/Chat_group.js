const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatGroupSchema = new Schema(
  {
    type: { 
      type: String, 
      enum: ["global", "local", "clan", "private"], 
      required: true 
    }, // Tipo do grupo
    
    name: { type: String, required: true }, // Nome do grupo (apenas para Clã)
    
    code: { type: String, unique: true, sparse: true }, // Código de convite (apenas para Clã)
    
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Admin do grupo (somente Clã)
    
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // Lista de membros (exceto Global)
    
    maxSlots: { type: Number, default: 10 }, // Máximo de membros (apenas Clã)
    
    tickCreated: { type: Number, required: true }, // Tick em que o grupo foi criado
    
    isDeleted: { type: Boolean, default: false },
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ChatGroup || mongoose.model("ChatGroup", chatGroupSchema);
