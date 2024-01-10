document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleClassChange");

  // Загружаем текущее состояние переключателя
  chrome.storage.local.get(["classModifierEnabled"], function (result) {
    toggle.checked = result.classModifierEnabled || false;
  });

  toggle.addEventListener("change", function () {
    chrome.storage.local.set({ classModifierEnabled: this.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: modifyPageClasses,
        args: [toggle.checked],
      });
    });
  });
});

function modifyPageClasses(enableModification) {
  if (!enableModification) return;

  const allClasses = document.querySelectorAll('*[class^="col-lg-"]');
  allClasses.forEach((el) => {
    el.className = el.className.replace(/col-lg-\d+/g, "col-lg-12");
  });
}
