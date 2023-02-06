import { useEffect, useState } from "react";

const useNotification = () => {
  const [notificationMsg, setNotificationMsg] = useState(null);

  function sendNotification() {
    if (!("Notification" in window)) {
      return;
    } else if (Notification.permission === "granted") {
        console.log('in noti')
      const notification = new Notification(notificationMsg);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(notificationMsg);
        }
      });
    }
  }

  useEffect(() => {
    if (!notificationMsg) {
      return;
    }
    sendNotification();
  }, [notificationMsg]);

  return [notificationMsg, setNotificationMsg];
};

export default useNotification;
