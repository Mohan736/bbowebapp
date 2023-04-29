export function setOnLocalStorage(index, data) {
  data = JSON.stringify(data);
  return localStorage.setItem(index, data);
}

export function removeFromLocalStorage(index, data) {
  data = JSON.stringify(data);
  return localStorage.removeItem(index, data);
}

export function getFromLocalStorage(index) {
  const token = localStorage.getItem(index);
  return JSON.parse(localStorage.getItem(index));
}
