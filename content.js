// function modifyPageElements() {
//   console.log("modifyPageElements function called");
//   const targetElement = document.querySelector("lesson-challenge");

//   if (targetElement) {
//     console.log("Found targetElement", targetElement);
//     const elementsToModify = targetElement.querySelectorAll(".row");

//     elementsToModify.forEach((element) => {
//       const currentClass = element.className;
//       const newClass = currentClass.replace(/col-lg-\d+/, "col-lg-12");
//       element.className = newClass;
//     });
//   } else {
//     console.log("targetElement not found");
//   }
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.type === "modifyPage") {
//     modifyPageElements();
//   }
// });
