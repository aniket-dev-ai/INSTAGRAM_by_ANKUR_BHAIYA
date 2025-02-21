import UserModel from "../modal/user.js";

export const createUser = async ({ username, email, password, p }) => {
  if (!username || !email || !password) {
    return { error: "All fields are required" };
  }
  const AlreadyExists = await UserModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (AlreadyExists) {
    throw new error("User already exists");
  }
  const hashPassword = await UserModel.hashPassword(password);

  const user = new UserModel({
    username,
    email,
    password: hashPassword,
  });

  await user.save();

  delete user._doc.password;

  return user;
};
