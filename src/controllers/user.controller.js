import { asyncHandler } from "../utils/asyncHandler.js";
import {Apierrors} from "../utils/Apierrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

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
  [fullName, username, email, password].some((field)=>
  field?.trim()==="")
 ){
    throw new Apierrors(400,"allfields are required")
 }
 const existedUser = User.findOne({
 $or:[{email},{username}]
 })
 if(existedUser){
  throw newApierrors(409,"user already esists")
 }

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;


 if(!avatarLocalPath){
   throw new Apierrors(400,"avatar is required")
 }

 if(!coverImageLocalPath){
   throw new Apierrors(400,"cover image is required")
 }
 const avatar = await uploadOnCloudinary(avatarLocalPath, "avatars");
 const coverImage = await uploadOnCloudinary(coverImageLocalPath, "coverImages");


 if(!avatar){
   throw new Apierrors(500,"failed to upload avatar")
 }
const user = await User.create({
   fullName,
   avatar:avatar.url,
   coverImage:coverImage?.url||" ",
   email,
   password,
   username:username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
)
if(!createdUser){
   throw new Apierrors(500,"failed to create user")
}

return res.status(201).json(
   new ApiResponse(201, createdUser, "User created successfully")
)
})


export { registerUser };