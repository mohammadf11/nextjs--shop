
export const valid= (name:string, email:string, password:string, confirmPassword:string) => {
  if (!name || !email || !password) return "Please add all fields";

  if (!isEmail(email)) return "Invalid emails.";

  if (password.length < 6) return "password must be at leatest 6 characters.";

  if(password !== confirmPassword) return 'Confirm password did not match'
};

function isEmail(emailAdress:string) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regex)) return true;
  else return false;
}
