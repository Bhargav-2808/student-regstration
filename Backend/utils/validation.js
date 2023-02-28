let message;

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  }
};

const isValidPwd = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*?~()-]{8,}$/;
  if (re.test(password)) {
    return true;
  }
};

const validation = (body) => {
  const { fname, lname, mobile, email, add1, pincode } = body;
  console.log(isNaN(mobile));

  if (!fname || !lname || !mobile || !email || !add1 || !pincode) {
    message = "All Field are Required";
  } else if (mobile.length !== 10 || isNaN(mobile)) {
    message = "Enter Valid Mobile";
  } else if (!isValidEmail(email)) {
    message = "Enter Valid Email";
  } else if (pincode.length !== 6 || isNaN(pincode)) {
    message = "Enter Valid Pincode";
  } else {
    message = "";
  }
  return message;
};

export { validation, isValidPwd };
