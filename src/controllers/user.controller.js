import { asyncHandler } from "../utils/asyncHandler.js";
import {Apierrors} from "../utils/Apierrors.js"

const registerUser = asyncHandler(async (req, res) => {
  //get user data from frontend 
  //validation - not empty 
  //check if user already exists:usrname, email
  //check for images, check for avatar
  //upload them to cloudinary,avatar
  //create user object - create entry in db 
  // remove password and refresh toke field from response 
  // check if user created succesfullu
  //return response


  const { username, email, password, fullName } = req.body;

  console.log("email",email);

 if(
  [fullName, username, email, password].some((field)=>)
 ){

 }

})


export { registerUser };