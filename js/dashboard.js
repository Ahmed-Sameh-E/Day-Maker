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

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date()
setInterval(() => {
  document.getElementById("live-clock").innerText = months[data.getMonth()];
}, 1000);

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
