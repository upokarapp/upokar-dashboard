import Token from "../models/token.js";

export const createToken = async (req, res) => {
  const { token } = req.body; //ExponentPushToken[utPmZqJjINuWyV76u5is9m]
  console.log(req.body);
  try {
    const newToken = new Token({ token });
    await newToken.save();
    console.log("Token created successfully", newToken);
    res.status(200).json({ message: "Token created successfully", newToken });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ message: "Error creating token", error });
  }
};
