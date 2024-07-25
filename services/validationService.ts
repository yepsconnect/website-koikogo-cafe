export const normalizePhone = (phone: string) => {
  return "+" + phone.replace(/\D/g, "");
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
  return phoneRegex.test(phone);
};
export const formatPhoneNumber = (input: string): string => {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  } else if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }

  let formatted = "+7 ";

  if (digits.length > 1) {
    formatted += "(" + digits.substring(1, 4);
  }

  if (digits.length >= 4) {
    formatted += ") " + digits.substring(4, 7);
  }

  if (digits.length >= 7) {
    formatted += " " + digits.substring(7, 9);
  }

  if (digits.length >= 9) {
    formatted += " " + digits.substring(9, 11);
  }

  return formatted;
};
