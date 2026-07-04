export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("chesen:toast", { detail: message }));
}
