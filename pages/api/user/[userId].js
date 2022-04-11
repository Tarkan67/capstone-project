import { connectDb } from "../../../utils/db";
import User from "../../../schema/User";

export default async function handler(request, response) {
  console.log("query", request.query);
  const { userId } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const getPlayer = await User.findById(userId).exec();
        response.status(200).json(getPlayer);
        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;

      case "PATCH":
        const updatedUser = await User.findByIdAndUpdate(userId, request.body, {
          returnDocument: "after",
          runValidators: true,
        });
        if (updatedUser) {
          respond.status(200).json({ success: true, data: updatedUser });
        } else {
          respond.status(404).json({ success: false, data: updatedUser });
        }
        break;
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
}
