export function getCurrentDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const day = String(today.getDate()).padStart(2, '0');

  let hours = String(today.getHours()).padStart(2, '0');
  let minutes = String(today.getMinutes()).padStart(2, '0');
  let seconds = String(today.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
