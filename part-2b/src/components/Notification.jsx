import "../style/notification.css";

const Notification = ({ notificationType }) => {
  if (notificationType === null) {
    return null;
  }

  return (
    <div
      className={`error ${
        notificationType.type !== null ? notificationType.type : "succesful"
      }`}
    >
      {notificationType.message}
    </div>
  );
};

export default Notification;
