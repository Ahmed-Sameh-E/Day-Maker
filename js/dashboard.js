const mobHomBtn = document.getElementById("mobile-home-btn");
const mobStatsBtn = document.getElementById("mobile-stats-btn");
const mobCalendarBtn = document.getElementById("mobile-calendar-btn");
const mobProfileBtn = document.getElementById("mobile-profile-btn");
const containerElement = document.getElementById("container");

const buttons = [mobHomBtn, mobStatsBtn, mobCalendarBtn, mobProfileBtn];

function setActiveButton(activeBtn, activeClass) {
  containerElement.classList.remove("active1", "active2", "active3");

  if (activeClass) {
    containerElement.classList.add(activeClass);
  }

  buttons.forEach((btn) => {
    if (btn === activeBtn) {
      btn.classList.add("active-mob");
    } else {
      btn.classList.remove("active-mob");
    }
  });
}

if (
  mobHomBtn &&
  mobStatsBtn &&
  mobCalendarBtn &&
  mobProfileBtn &&
  containerElement
) {
  mobHomBtn.addEventListener("click", () => {
    setActiveButton(mobHomBtn, null);
  });

  mobStatsBtn.addEventListener("click", () => {
    setActiveButton(mobStatsBtn, "active1");
  });

  mobCalendarBtn.addEventListener("click", () => {
    setActiveButton(mobCalendarBtn, "active2");
  });

  mobProfileBtn.addEventListener("click", () => {
    setActiveButton(mobProfileBtn, "active3");
  });
}

function switchPage(pageId) {
  const allPages = document.querySelectorAll(".page-content");
  allPages.forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}
