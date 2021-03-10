import { notification, message as antd_message } from "antd";

const show_notification = (message, title = 'KOI', type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-notification-' + type
  notification.open({
    placement: 'topRight',
    top: 90,
    duration: 4,
    message: title,
    className: custom_class,
    description: message,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    onClose: actionClose
  });
}

const show_message = (message, type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-message-' + type
  antd_message.error({
    top: 90,
    duration: 3,
    content: message,
    className: custom_class,
    onClose: actionClose
  });
}
export {
  show_notification,
  show_message
}