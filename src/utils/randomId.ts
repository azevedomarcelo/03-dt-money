export function generateTransactionId(): number {
  const timestamp = Date.now();
  return timestamp;
}