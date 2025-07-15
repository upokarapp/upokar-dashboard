import Notification from "../models/notifications.js";
import { getAllToken, deleteTokens,sendNotifications } from "./token.controller.js";


// const filterTokens = (tokens) => {
//   const validTokens = [];
//   const invalidTokens = [];

//   for (const tokenObj of tokens) {
//     // Check if the token is a valid Expo push token
//     if (Expo.isExpoPushToken(tokenObj.token)) {
//       validTokens.push(tokenObj.token);
//     } else {
//       invalidTokens.push(tokenObj.token);
//     }
//   }

//   return { validTokens, invalidTokens };
// };

// const sendNotifications = async (tokens, title, body) => {
//   if (tokens.length === 0) {
//     return;
//   }

//   const messages = tokens.map((pushToken) => ({
//     to: pushToken,
//     sound: "default",
//     title: title,
//     body: body,
//     data: { withSome: "data" },
//   }));

//   // The Expo push service can only handle chunks of notifications at a time.
//   const chunks = expo.chunkPushNotifications(messages);
//   const tickets = [];

//   for (const chunk of chunks) {
//     try {
//       const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       tickets.push(...ticketChunk);
//       console.log("Notification tickets sent:", ticketChunk);
//     } catch (error) {
//       console.error("Error sending push notifications:", error);
//     }
//   }
//   // Later, you can use the tickets to check for errors from Apple or Google.
//   // For this example, we are not checking receipts.
// };

export const createNotification = async (req, res) => {
  const { title, discription } = req.body;

  if (!title || !discription) {
    return res
      .status(400)
      .json({ message: "Title and discription are required." });
  }
  
  try {
    // Save the notification to the database first
    const newNotification = new Notification({ title, discription }); // Changed 'description' to 'discription'
    await newNotification.save();

  //   let page = 1;
  //   const limit = 100;
  //   let allInvalidTokens = [];

  //   // Process all tokens in a loop
  //   while (true) {
  //     console.log(`Fetching page ${page} of tokens...`);
  //     const tokensFromDB = await getAllToken(page, limit);

  //     // If no more tokens are returned, break the loop
  //     if (tokensFromDB.length === 0) {
  //       console.log("All tokens have been processed.");
  //       break;
  //     }

  //     // Filter the fetched tokens
  //     const { validTokens, invalidTokens } = filterTokens(tokensFromDB);

  //     // Accumulate invalid tokens
  //     if (invalidTokens.length > 0) {
  //       allInvalidTokens.push(...invalidTokens);
  //       console.log(
  //         `Found ${invalidTokens.length} invalid tokens on page ${page}.`
  //       );
  //     }

  //     // Send notifications to the batch of valid tokens
  //     if (validTokens.length > 0) {
  //       console.log(
  //         `Sending notifications to ${validTokens.length} valid tokens.`
  //       );
  //       await sendNotifications(validTokens, title, discription); // Changed 'description' to 'discription'
  //     }

  //     page++;
  //   }

  //   // After processing all tokens, delete all accumulated invalid tokens
  //   if (allInvalidTokens.length > 0) {
  //     console.log(
  //       `Starting deletion of ${allInvalidTokens.length} invalid tokens.`
  //     );
  //     await deleteToken(allInvalidTokens);
  //   }


  res
    .status(201)
    .json({
      message: "Notification created and sent successfully!",
      notification: newNotification,
    });

    const tokensFromDB = await getAllToken();
    const tokens = tokensFromDB.map((token) => token.token);
    console.log(tokens);
    
    const { successCount, failureCount, invalidTokens } = await sendNotifications(tokens, {
      title: title,
      body: discription,
      data: { some: "data",route:"/notifications" },
      channelId: "default",
    });
    
    await deleteTokens(invalidTokens);
    
  } catch (error) {
    console.error("Error in createNotification controller:", error);
    res.status(500).json({ message: "Failed to send notification." });
  }
};

export const getAllNotification = async (req, res) => {

  try {
    const notifications = await Notification.find().sort({ _id: -1 })

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteNotification = async (req, res) => {
  try {
    const response = await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Notification deleted successfully!",
      notification: response,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
