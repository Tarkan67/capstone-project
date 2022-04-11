import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import Player from "../../../schema/Player";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          let players = await Player.find()
            .sort({ createdAt: -1 })
            .limit(100)
            .where({ userId: session.user.id });

          response.status(200).json(players);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "POST":
        if (session) {
          const createdPlayer = await Player.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdPlayer });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "PATCH":
        const updatedPlayer = await Player.findByIdAndUpdate(
          playerId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        ).where({ userId: session.user.id });

        if (updatedPlayer) {
          response.status(200).json({
            success: true,
            data: updatedPlayer,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }

        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
