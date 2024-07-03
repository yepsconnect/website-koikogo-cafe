import bcrypt from "bcrypt";
import { User } from "~/server/models/user.schema";
import { generateToken } from "~/utils/tokenUtils";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await User.findOne({ email });
  if (!user) {
    return {
      ok: false,
      message: "Неверный логин или пароль",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      ok: false,
      message: "Неверный логин или пароль",
    };
  }

  try {
    const token = await generateToken(user._id, user.role);

    return {
      ok: true,
      token,
    };
  } catch (e) {
    return {
      ok: false,
      message: "Ошибка при создании пользователя.",
    };
  }
});
