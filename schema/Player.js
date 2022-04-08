import { Schema, model } from "mongoose";
import "./User";

const PlayerSchema = new Schema(
  {
    playerId: { type: Schema.Types.ObjectId, ref: "User" },
    points: { type: Number },
  },
  { timestamps: true }
);

export default model("Player", PlayerSchema, "players", {
  overwriteModels: true,
});
