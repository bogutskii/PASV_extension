chrome.storage.local.get(["classModifierEnabled"], function (result) {
  if (result.classModifierEnabled) {
    // Добавляем задержку перед выполнением функции modifyPageClasses
    setTimeout(modifyPageClasses, 2000); // 2000 миллисекунд = 2 секунды
  }
});

function modifyPageClasses() {
  const allClasses = document.querySelectorAll('*[class^="col-lg-"]');
  allClasses.forEach((el) => {
    el.className = el.className.replace(/col-lg-\d+/g, "col-lg-12");
  });
}

// Слушаем изменения в chrome.storage
chrome.storage.onChanged.addListener(function (changes, area) {
  if (area == "local" && "classModifierEnabled" in changes) {
    if (changes.classModifierEnabled.newValue) {
      setTimeout(modifyPageClasses, 2000); // Добавляем задержку
    } 
    // else {
    //   window.location.reload(); // Перезагружаем страницу, если функционал отключен
    // }
  }
});
