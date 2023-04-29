export const signup = "user/signUp";
export const login = "user/login";
export const personalinfoUpdate = "user/updatePersonalInfo";
export const educationalinfoUpdate = "user/createEducationalInfoByUserId";
export const custodialUpdate = "user/createCustodialDetail";
export const email_Verfied = (token) => `user/verifyEmail/${token}`;
export const forget_Password = `user/forget-password`;
export const set_new_password = `user/set-password`;
export const upload_image = `user/uploadImage`;
export const work_details = `user/createWorkDetail`;
export const contact_Form = `user/contact-us`;
export const socialAccount = `user/updateAccountDetail`;
export const getWebSiteContent = (page) =>
  `admin/getWebSiteContent?title=${page}`;
