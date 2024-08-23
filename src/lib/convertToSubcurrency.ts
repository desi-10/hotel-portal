function convertToSubcurrency(amount: number, factor = 100) {
  // Assuming amount is in dollars and needs to be converted to cents
  const amountInCents = Math.round(amount * 100);
  if (amountInCents < 50) {
    // Minimum amount is usually 50 cents
    throw new Error("Amount must be at least 50 cents");
  }
  return amountInCents;
}

export default convertToSubcurrency;
