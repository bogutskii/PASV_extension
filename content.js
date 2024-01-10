chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "classModifierEnabled" && newValue === true) {
      modifyPageClasses();
    }
  }
});

function modifyPageClasses() {
  const allClasses = document.querySelectorAll('*[class^="col-lg-"]');
  allClasses.forEach((el) => {
    el.className = el.className.replace(/col-lg-\d+/g, "col-lg-12");
  });
}
