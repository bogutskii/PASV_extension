chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeClasses") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      function: changeClassesOnPage,
    });
  }
});

function changeClassesOnPage() {
  const elements = document.querySelectorAll(".col-lg-4");
  elements.forEach((element) => {
    element.classList.remove("col-lg-4");
    element.classList.add("col-lg-12");
  });
}
