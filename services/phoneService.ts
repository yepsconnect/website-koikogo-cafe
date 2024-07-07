export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) {
    return "";
  }
  const match = phoneNumber.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    const [, areaCode, firstPart, secondPart, thirdPart] = match;
    return `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  } else {
    throw new Error("Invalid phone number format");
  }
}
