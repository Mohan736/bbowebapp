import validator from "validator";

const validations = (values) => {
  let errors = {};
  const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/;
  const regExpassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  //email

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!regEx.test(values.email)) {
    errors.email = "Please Enter Valid Email";
  }
  //password
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (!regExpassword.test(values.password)) {
    errors.password = "Please enter valid Password";
  }
  return errors;
};

export default validations;
