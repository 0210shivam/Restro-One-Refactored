export function encrypt(number) {
   number = Number(number);
   return number.toString(36).padStart(4, '0');
}

export function decrypt(base36) {
   return parseInt(base36, 36);
}
