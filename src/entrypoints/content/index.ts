export default defineContentScript({
  matches: ["http://*/*", "https://*/*"],
  main() {
    const nonsense = "Currently not in use :)";
  },
});
