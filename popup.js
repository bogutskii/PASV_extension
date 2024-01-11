document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleClassChange");
  const updateButton = document.getElementById("updateButton");

  chrome.storage.local.get(["classModifierEnabled"], function (result) {
    toggle.checked = result.classModifierEnabled !== false;
  });

  toggle.addEventListener("change", function () {
    chrome.storage.local.set({ classModifierEnabled: this.checked });
    updateClassesIfNeeded(this.checked);
  });

  updateButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: modifyPageClasses,
      });
    });
  });
});

function modifyPageClasses() {
  const allClasses = document.querySelectorAll('*[class^="col-lg-"]');
  allClasses.forEach((el) => {
    el.className = el.className.replace(/col-lg-\d+/g, "col-lg-12");
  });
  function removeSpecificStyleFromDeepDiv() {
    console.log("removeSpecificStyleFromDeepDiv");
    var divs = document.querySelectorAll("div[style]");

    divs.forEach(function (div) {
      var style = div.getAttribute("style");
      if (style.includes("height: 1184.4px;")) {
        var updatedStyle = style.replace("height: 1184.4px;", "").trim();
        div.setAttribute("style", updatedStyle);
      }
    });
  }
  removeSpecificStyleFromDeepDiv();
}

function updateClassesIfNeeded(isEnabled) {
  if (isEnabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: modifyPageClasses,
      });
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
}
