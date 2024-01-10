document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("changeClassButton")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.runtime.sendMessage({
          action: "changeClasses",
          tabId: tabs[0].id,
        });
      });
    });
});
