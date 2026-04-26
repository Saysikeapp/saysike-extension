export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],
  main() {
    // Leaving this as a placeholder for when content scripts are needed in future
    const nonsense = "Currently not in use :)";
  },
});
