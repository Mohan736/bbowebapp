const validations = (values) => {
    let errors = {};
    const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/;
  
    //email
  
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regEx.test(values.email)) {
      errors.email = "Please Enter Valid Email";
    }
    return errors;
  };
  
  export default validations;
  