import bcrypt from "bcrypt";
import { User } from "~/server/models/index.schema";
import { generateToken } from "~/utils/tokenUtils";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.REGISTER_ACCESS !== "1") {
    return {
      ok: false,
      message: "Регистрация недоступна.",
    };
  }

  const { email, password } = await readBody(event);

  const candidate = await User.findOne({ email });
  if (candidate) {
    return {
      ok: false,
      message: "Пользователь с таким email уже существует.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const token = generateToken(newUser._id, newUser.role);

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
