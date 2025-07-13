import Token from "../models/token.js";

export const getAllToken = async () => {
  try {
    const tokens = await Token.find({}).sort({ _id: -1 })
    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    // Return an empty array on error to prevent process from crashing
    return [];
  }
};
export const deleteTokens = async (tokens) => {
  try {
    if (!tokens || !Array.isArray(tokens)) {
      return { message: "Invalid tokens array" };
    }
    const result = await Token.deleteMany({ token: { $in: tokens } });
    console.log(`${result.deletedCount} tokens deleted successfully.`);
    return { message: "Tokens deleted successfully" };
  } catch (error) {
    console.error("Error deleting tokens:", error);
    return { message: "Failed to delete tokens" };
  }
};

import { Expo } from "expo-server-sdk";

// Initialize a single Expo client for your whole backend
const expo = new Expo();
export async function sendNotifications(tokens, options = {}) {
  if (!tokens || tokens.length === 0) {
    console.log("No valid tokens to send notifications.");
    return { successCount: 0, failureCount: 0, invalidTokens: [] };
  }

  const messages = tokens.map((token) => ({
    to: token,
    sound: "default",
    title: options.title || "Notification",
    body: options.body || "You have a new message.",
    data: options.data || {},
    channelId: options.channelId,
  }));

  // Split messages into chunks of max 100
  const chunks = expo.chunkPushNotifications(messages);

  // Store ticket IDs to receipt mapping
  const ticketMap = {};
  const invalidTokens = [];
  let successCount = 0;
  let failureCount = 0;

  // Send chunks
  for (const chunk of chunks) {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      tickets.forEach((ticket, index) => {
        if (ticket.status === 'ok') {
          // Store valid ticket for later receipt check
          if (ticket.id) {
            ticketMap[ticket.id] = chunk[index].to;
          }
          successCount++;
        } else {
          // Immediate error: remove token
          const token = chunk[index].to;
          console.error(`Push error for token ${token}:`, ticket.message, ticket.details);
          invalidTokens.push(token);
          failureCount++;
        }
      });
    } catch (err) {
      console.error("Error sending notification chunk:", err);
      // If the entire chunk fails, mark all in chunk as failures
      chunk.forEach((msg) => {
        invalidTokens.push(msg.to);
        failureCount++;
      });
    }
  }

  // Check receipts for tickets
  const receiptIds = Object.keys(ticketMap);
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

  for (const idChunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(idChunk);
      for (const [id, receipt] of Object.entries(receipts)) {
        const token = ticketMap[id];
        if (receipt.status === 'ok') {
          // all good
          continue;
        } else if (receipt.status === 'error') {
          console.error(`Receipt error for token ${token}:`, receipt.message, receipt.details);
          const error = receipt.details && receipt.details.error;
          // Determine if error is unregistered or expired
          if (error === 'DeviceNotRegistered' || error === 'PushTokenExpired') {
            invalidTokens.push(token);
          }
          failureCount++;
        }
      }
    } catch (err) {
      console.error("Error retrieving receipts:", err);
    }
  }

  // Remove duplicates
  const uniqueInvalid = [...new Set(invalidTokens)];

  console.log(`Notifications sent: ${successCount}, failures: ${failureCount}. Invalid tokens:`, uniqueInvalid);

  return { successCount, failureCount, invalidTokens: uniqueInvalid };
}