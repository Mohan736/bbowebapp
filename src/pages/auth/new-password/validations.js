const validations = (values) => {
  let errors = {};
  const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/;
  const regExpassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  //password
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (!regExpassword.test(values.password)) {
    errors.password = "Please enter valid Password";
  }

  //confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  } 
  return errors;
};

export default validations;
