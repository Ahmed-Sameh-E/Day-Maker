if (!localStorage.getItem("dashboardUsername")) {
  window.location.replace("/");
}

const mobHomBtn = document.getElementById("mobile-home-btn");
const mobStatsBtn = document.getElementById("mobile-stats-btn");
const mobCalendarBtn = document.getElementById("mobile-calendar-btn");
const mobProfileBtn = document.getElementById("mobile-profile-btn");
const containerElement = document.getElementById("container");
const tasksList = document.getElementById("tasks-list");

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

function initializeDashboard() {
  const storedName = localStorage.getItem("dashboardUsername") || "Guest";
  const greetingEl = document.getElementById("user-name");
  if (greetingEl) {
    greetingEl.innerText = `Welcome back, ${storedName}`;
  }

  const avatarEl = document.getElementById("avatar");
  if (avatarEl) {
    const initials = storedName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
    avatarEl.innerText = initials || "GU";
    avatarEl.title = storedName;
  }
  const quotes = [
    "Make today worth remembering.",
    "Your future is created by what you do today, not tomorrow.",
    "Small steps in the right direction can turn out to be the biggest steps of your life.",
    "Focus on progress, not perfection.",
    "Believe you can and you're halfway there.",
    "Today is another chance to get better.",
    "Productivity is being able to do things that you were never able to do before.",
  ];
  const quoteEl = document.querySelector(".greeting.section span");
  if (quoteEl) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteEl.innerText = quotes[randomIndex];
  }
}

function manageStudyStreak() {
  const streakCountEl = document.getElementById("streak-count");
  const logBtn = document.getElementById("complete-study-btn");

  if (!streakCountEl || !logBtn) return;

  let currentStreak = parseInt(localStorage.getItem("studyStreak")) || 0;
  const lastStudyDate = localStorage.getItem("lastStudyDate");
  const todayStr = new Date().toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (lastStudyDate && lastStudyDate !== todayStr && lastStudyDate !== yesterdayStr) {
    currentStreak = 0;
    localStorage.setItem("studyStreak", 0);
  }

  streakCountEl.innerText = `${currentStreak} ${currentStreak === 1 ? "Day" : "Days"}`;

  if (lastStudyDate && lastStudyDate === todayStr) {
    logBtn.innerText = "Studied Today ✓";
    logBtn.disabled = true;
  } else {
    logBtn.innerText = "Log Today's Study";
    logBtn.disabled = false;
  }

  const newLogBtn = logBtn.cloneNode(true);
  logBtn.parentNode.replaceChild(newLogBtn, logBtn);

  newLogBtn.addEventListener("click", () => {
    let streak = parseInt(localStorage.getItem("studyStreak")) || 0;
    const lastDate = localStorage.getItem("lastStudyDate");
    const currentToday = new Date().toISOString().split("T")[0];

    if (lastDate === currentToday) return;

    if (lastDate === yesterdayStr) {
      streak += 1;
    } else {
      streak = 1;
    }

    localStorage.setItem("studyStreak", streak);
    localStorage.setItem("lastStudyDate", currentToday);

    streakCountEl.innerText = `${streak} ${streak === 1 ? "Day" : "Days"}`;
    newLogBtn.innerText = "Studied Today ✓";
    newLogBtn.disabled = true;

    Swal.fire({
      icon: "success",
      title: "Streak Updated!",
      text: `You are on a ${streak}-day study streak! Keep it up.`,
      timer: 2000,
      showConfirmButton: false,
      heightAuto: false,
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();
  manageStudyStreak();
  
  const dateObj = new Date();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const clockEl = document.getElementById("live-clock");
  if(clockEl) {
    clockEl.innerText = `${day}/${month}/${year}`;
  }
});

function openModal() {
  document.getElementById("task-modal").classList.add("show");
  document.getElementById("modal-task-name").value = "";
  document.getElementById("modal-task-time").value = "";
  document.getElementById("no-time-checkbox").checked = false;
  document.getElementById("modal-task-time").style.display = "block";
  document.getElementById("modal-task-name").focus();
}

function closeModal() {
  document.getElementById("task-modal").classList.remove("show");
}

document
  .getElementById("no-time-checkbox")
  .addEventListener("change", function () {
    const timeInput = document.getElementById("modal-task-time");
    if (this.checked) {
      timeInput.style.display = "none";
    } else {
      timeInput.style.display = "block";
    }
  });

function saveModalTask() {
  const taskName = document.getElementById("modal-task-name").value.trim();
  let taskTime = document.getElementById("modal-task-time").value.trim();
  const noTimeChecked = document.getElementById("no-time-checkbox").checked;

  if (taskName === "") {
    alert("Please enter a task name!");
    return;
  }

  if (noTimeChecked || taskTime === "") {
    taskTime = "";
  }

  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  taskItem.innerHTML = `
    <div class="task-left">
      <span class="check-circle"></span>
      <input type="text" class="task-input-name" value="${taskName}" placeholder="New Task...">
    </div>
    <input type="text" class="task-input-time" value="${taskTime}" placeholder="Time..." ${taskTime === "" ? 'style="display:none;"' : ""}>
  `;

  tasksList.appendChild(taskItem);
  closeModal();

  const nameInput = taskItem.querySelector(".task-input-name");
  const timeInput = taskItem.querySelector(".task-input-time");
  const circle = taskItem.querySelector(".check-circle");

  nameInput.addEventListener("blur", () => {
    if (nameInput.value.trim() === "") nameInput.value = "Untitled Task";
  });

  timeInput.addEventListener("blur", () => {
    if (timeInput.value.trim() === "") timeInput.value = "12:00 PM";
  });

  circle.addEventListener("click", () => {
    taskItem.classList.toggle("checked");
  });
}

function logoutUser() {
  localStorage.removeItem("dashboardUsername");
  window.location.replace("/logout");
}