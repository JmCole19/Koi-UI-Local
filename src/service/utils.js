import { notification, message } from "antd";

const show_notification = (msg, title = 'KOI', type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-notification-' + type
  notification.open({
    placement: 'topRight',
    top: 90,
    duration: 4,
    message: title,
    className: custom_class,
    description: msg,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    onClose: actionClose
  });
}

const show_message = (msg, type = 'error', actionClose = () => {}) => {
  // type : success || error || info || warning
  let custom_class = 'custom-message-' + type
  message.error({
    top: 90,
    duration: 3,
    content: msg,
    className: custom_class,
    onClose: actionClose
  });
}

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const show_fixed_number = (val, fixed = 0) => {
  return val.toFixed(fixed)
}

const show_digit_number = (val, digit = 0) => {
  if(typeof val !== 'number'){
    return ''
  }
  return val.toLocaleString('en-US', {
    // minimumIntegerDigits: digit,
    // useGrouping: false
  })
}

const convertArBalance = (str_number) => {
  let balance = Number(str_number)
  return balance / 1000000000000

}

export {
  show_notification,
  show_message,
  show_digit_number,
  show_fixed_number,
  getBase64,
  convertArBalance,
}