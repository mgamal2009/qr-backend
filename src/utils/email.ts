export async function sendResetEmail(email: string, resetLink: string) {
  console.log(`Sending reset email to ${email}: ${resetLink}`);
  return true;
}