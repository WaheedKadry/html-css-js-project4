//==================
// Start Setting Box
//==================

// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option");
// console.log(mainColors);
if (mainColors !== null) {
  console.log("Local Stoeage Is Not Empty");
  console.log(mainColors);

  document.documentElement.style.setProperty("--main-color", mainColors);
  // Remove active Class From All ColorsList Item

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}
// Variable To Control The Background Interval
let backgroundInterval;

// Random Background Option
let backgroundOption = true;

// change bg
let changer;

// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");
// check Background Img In Local Storage Is Not Empty
if (localStorage.getItem("background-im") !== null) {
  document.querySelector(".landing-page").style.backgroundImage =
    localStorage.getItem("background-im");
}
// Check If Random Background Is Not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  //  Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  // Add active Class In Span Clicked
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
//  Toggle Spin Class Icon
document.querySelector(".toggle-setting .icon-setting").onclick = function () {
  // Toggle Class fa-spin For Rotation On Self
  this.classList.toggle("fa-spin");
  // Toggle Class Open In Main Setting Box
  document.querySelector(".setting-box").classList.toggle("open");
};
//  Switch Color
const colorsLi = document.querySelectorAll(".setting-box .colors-list li");

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click on Every List Items
  li.addEventListener("click", (e) => {
    // Set Color In :Root For Css
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color For :Root In Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
    // // Remove active Class From All Childeren
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // //  Add Active Class In li  Clicked
    // e.target.classList.add("active");
    handleActive(e);
  });
});

//  Switch Random Backgrounds option
const randomBackEl = document.querySelectorAll(".random-background span");

// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click on Every spans
  span.addEventListener("click", (e) => {
    // Remove active Class From All Spans
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // //  Add Active Class In span  Clicked
    // e.target.classList.add("active");
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeimgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
      // Add Background Img To Local Storage
      localStorage.setItem("background-im", changer);
    }
  });
});
// Bollets Option
let bulletsSpan = document.querySelectorAll(
  ".settings-container .bullets-option span"
);
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    // Reamove Class Active From All Span
    span.classList.remove("active");
  });
  //  Add Class Active To This Clicked
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});
// Reset Button

document.querySelector(".settings-container .reset-option").onclick = () => {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("background-im");
  localStorage.removeItem("bullets-option");

  window.location.reload();
};
//================
// End Setting Box
//================

// @ media query

let toggleBtn = document.querySelector(
  ".landing-page .header-area .toggle-menu"
);
let tLinks = document.querySelector(".landing-page .header-area .links");

toggleBtn.onclick = function (e) {
  this.style.transform
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class Menu Active On Button
  this.classList.toggle("menu-active");
  // Toggle Class Open On Links
  tLinks.classList.toggle("open");
};
// Click AnywhereOut Side Menu And Toggle Button
document.addEventListener("click", (e) => {
if (e.target !== toggleBtn && e.target !== tLinks) {
  if (tLinks.classList.contains("open")) {
 
      // Toggle Class Menu Active On Button
      toggleBtn.classList.toggle("menu-active");
  // Toggle Class Open On Links
  tLinks.classList.toggle("open");
}
}
})
// Stop Propagation On Menu
tLinks.onclick = (e) => {
  e.stopPropagation();
  
} 
// Select Landing Page Element
let landing = document.querySelector(".landing-page");

let imgsArray = ["1.jfif", "2.jfif", "3.jfif", "4.jfif", "5.jfif", "6.jpg"];

function randomizeimgs() {
  if (backgroundOption === true) {
    // Get Random Number
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Page
      changer = landing.style.backgroundImage =
        "url('Images/" + imgsArray[randomNumber] + "')";
    }, 1000);
  }
}
randomizeimgs();
// Select Skills Selector

let ourSkills = document.querySelector(".skills");

document.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY >= ourSkills.offsetTop - 200) {
    let allSkills = document.querySelectorAll(".skills .skill-progress span");
    allSkills.forEach((skills) => {
      skills.style.width = skills.dataset.progress;
    });
  }
});

// create PopUp With Imagss
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Overlay To Body
    document.body.appendChild(overlay);
    // create Popup Box
    let popupBox = document.createElement("div");
    // Add Class Name To Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // Create Heading For Image
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }
    // create the Image
    let popupImage = document.createElement("img");
    console.log(img.src);
    // set Image Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeButton = document.createElement("span");
    // create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = "close-button";
    // Add clos e Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});
// Close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Current popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bollets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// });
// Select All Links
let allLinks = document.querySelectorAll(".landing-page .links li a");
// allLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     // Prevent Default The < A > Tag
//     e.preventDefault();
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// });
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // Prevent Default The < A > Tag
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// Handle Active Class
function handleActive(ev) {
  // Remove active Class From All Childeren
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //  Add Active Class In Element  Clicked
  ev.target.classList.add("active");
}
