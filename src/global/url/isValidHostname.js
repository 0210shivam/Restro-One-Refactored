export default function isValidHostname(hostname) {
   // Regular expression to validate a hostname
   const hostnameRegex = /^(?=.{1,253}$)(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;
   return hostnameRegex.test(hostname);
}
