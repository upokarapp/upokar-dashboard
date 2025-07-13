import Notification from "../models/notifications.js";


export const getAllNotification = async (req, res) => {

  try {
    const notifications = await Notification.find({}).sort({ _id: -1 })

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

