import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import Player from "../../../schema/Player";

export default async function handler(request, response) {
  console.log("query", request.query);
  const { playerId } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const getPlayer = await Player.findById(playerId).exec();
        response.status(200).json(getPlayer);
        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;

      case "PATCH":
        const player = await Player.findById(playerId).exec();
        const modifyPoints = await Player.findByIdAndUpdate(
          playerId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        if (modifyPoints) {
          respond.status(200).json({ success: true, data: modifyPoints });
        } else {
          respond.status(404).json({ success: false, data: modifyPoints });
        }
        break;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
}
