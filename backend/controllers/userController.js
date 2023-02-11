import User from "../models/userModel.js";

// Register a new user
export const registerUser = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.create({
    email: email,
    password: password,
  });
  res.json({
    message: "Registered Successfully.",
    user,
  });
};
