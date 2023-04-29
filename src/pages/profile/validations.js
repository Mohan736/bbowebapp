const validations = (values) => {
  let errors = {};

  //company
  if (!values.title) {
    errors.title = "This Field is required";
  }

  //role

  if (!values.role) {
    errors.role = "This Field is required";
  }
  //location
  if (!values.location) {
    errors.location = "This Field is required";
  }

  return errors;
};

export default validations;
