var db = idb.open("TodoDB", 1, (upgradeDB) => {
  if (!upgradeDB.objectStoreNames.contains("Tasks")) {
    var store = upgradeDB.createObjectStore("Tasks", {
      keyPath: "id",
      autoIncrement: true,
    });
    store.createIndex("title", "title", { unique: false });
    store.createIndex("dueDate", "dueDate", { unique: false });
    store.createIndex("completed", "completed", { unique: false });
  }
});

window.addEventListener("load", (event) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        console.log("Service Worker registered successfully:", reg);
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  }

  setupNotificationButton();
});

function setupNotificationButton() {
  const notificationBtn = document.getElementById("enableNotificationsBtn");
  const testBtn = document.getElementById("testNotificationBtn");

  if (!notificationBtn) {
    console.error("Notification button not found!");
    return;
  }

  checkNotificationPermission();

  notificationBtn.onclick = function () {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification Permission:", permission);
        checkNotificationPermission();

        if (permission === "granted") {
          alert(
            "Notifications enabled! You'll receive reminders for your tasks.",
          );
        } else if (permission === "denied") {
          alert(
            "Notifications were blocked. Please enable them in your browser settings.",
          );
        }
      });
    }
  };

  if (testBtn) {
    testBtn.onclick = function () {
      console.log("Test notification button clicked");
      showNotification(
        "Test Notification",
        "This is a test! If you see this, notifications are working!",
      );
    };
  }
}

function checkNotificationPermission() {
  const notificationBtn = document.getElementById("enableNotificationsBtn");
  const testBtn = document.getElementById("testNotificationBtn");

  if (!notificationBtn) return;

  if ("Notification" in window) {
    console.log("Current notification permission:", Notification.permission);

    if (Notification.permission === "default") {
      notificationBtn.style.display = "block";
      notificationBtn.textContent = "Enable Notifications";
      notificationBtn.disabled = false;
      if (testBtn) testBtn.style.display = "none";
    } else if (Notification.permission === "granted") {
      notificationBtn.style.display = "none";
      if (testBtn) testBtn.style.display = "block";
    } else {
      notificationBtn.style.display = "block";
      notificationBtn.textContent =
        "Notifications Blocked (Check Browser Settings)";
      notificationBtn.disabled = true;
      notificationBtn.style.cursor = "not-allowed";
      notificationBtn.style.opacity = "0.6";
      if (testBtn) testBtn.style.display = "none";
    }
  }
}

const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i.toString().padStart(2, "0");
  daySelect.appendChild(option);
}

const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
for (let i = currentYear; i <= currentYear + 5; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

const now = new Date();
daySelect.value = now.getDate();
document.getElementById("month").value = now.getMonth();
yearSelect.value = now.getFullYear();

document.getElementById("addTaskBtn").onclick = function () {
  const title = document.getElementById("taskTitle").value.trim();
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  if (!title) {
    alert("Please enter a task title!");
    return;
  }

  const dueDate = new Date(year, month, day, hours, minutes);

  const task = {
    title: title,
    dueDate: dueDate.toISOString(),
    dueDateFormatted: formatDate(dueDate),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readwrite");
    const store = tx.objectStore("Tasks");
    return store.add(task);
  })
    .then((id) => {
      console.log("Task added successfully with ID:", id);

      if (Notification.permission === "granted") {
        scheduleNotification(title, dueDate, id);
      }

      document.getElementById("taskTitle").value = "";
      document.getElementById("hours").value = "";
      document.getElementById("minutes").value = "";

      loadTasks();
    })
    .catch((err) => {
      console.error("Error adding task:", err);
      alert("Failed to add task. Please try again.");
    });
};

function loadTasks() {
  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readonly");
    const store = tx.objectStore("Tasks");
    return store.getAll();
  })
    .then((tasks) => {
      displayTasks(tasks);
    })
    .catch((err) => {
      console.error("Error loading tasks:", err);
    });
}

function displayTasks(tasks) {
  const tasksList = document.getElementById("tasksList");
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML =
      '<div class="empty-message">No tasks yet. Add your first task above!</div>';
    return;
  }

  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "task-item" + (task.completed ? " task-completed" : "");

    taskElement.innerHTML = `
            <div class="task-info">
                <h3>${escapeHtml(task.title)}</h3>
                <p>Due: ${task.dueDateFormatted}</p>
                <p>Status: ${task.completed ? "Completed" : "Pending"}</p>
            </div>
            <div class="task-actions">
                ${!task.completed ? `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` : ""}
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

    tasksList.appendChild(taskElement);
  });
}

function completeTask(taskId) {
  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readwrite");
    const store = tx.objectStore("Tasks");

    return store.get(taskId).then((task) => {
      task.completed = true;
      task.completedAt = new Date().toISOString();
      return store.put(task);
    });
  })
    .then(() => {
      console.log("Task completed successfully");
      loadTasks();
    })
    .catch((err) => {
      console.error("Error completing task:", err);
    });
}

function deleteTask(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readwrite");
    const store = tx.objectStore("Tasks");
    return store.delete(taskId);
  })
    .then(() => {
      console.log("Task deleted successfully");
      loadTasks();
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
    });
}

function scheduleNotification(title, dueDate, taskId) {
  const now = new Date();
  const timeDiff = dueDate - now;

  if (timeDiff > 0) {
    setTimeout(() => {
      showNotification("Task Due", `"${title}" time is up!`);
      autoCompleteTask(taskId);
    }, timeDiff);
  }
}

function autoCompleteTask(taskId) {
  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readwrite");
    const store = tx.objectStore("Tasks");

    return store.get(taskId).then((task) => {
      if (task && !task.completed) {
        task.completed = true;
        task.completedAt = new Date().toISOString();
        task.autoCompleted = true;
        return store.put(task);
      }
    });
  })
    .then(() => {
      console.log("Task auto-completed successfully");
      loadTasks();
    })
    .catch((err) => {
      console.error("Error auto-completing task:", err);
    });
}

function showNotification(title, body) {
  console.log("Attempting to show notification:", title, body);
  console.log("Notification permission:", Notification.permission);

  if (!("Notification" in window)) {
    console.error("This browser does not support notifications");
    return;
  }

  if (Notification.permission === "granted") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => {
          if (reg) {
            const options = {
              body: body,
              icon: "notification-flat.png",
              badge: "checkmark.png",
              vibrate: [200, 100, 200],
              tag: "todo-notification-" + Date.now(),
              requireInteraction: true,
              actions: [
                { action: "view", title: "View Tasks" },
                { action: "close", title: "Dismiss" },
              ],
            };
            return reg.showNotification(title, options);
          } else {
            new Notification(title, { body: body });
          }
        })
        .catch((err) => {
          console.error("Error showing service worker notification:", err);
          try {
            new Notification(title, { body: body });
          } catch (e) {
            console.error("Error showing regular notification:", e);
          }
        });
    } else {
      try {
        new Notification(title, { body: body });
      } catch (err) {
        console.error("Error creating notification:", err);
      }
    }
  } else {
    console.warn(
      "Notification permission not granted:",
      Notification.permission,
    );
    alert(`${title}\n${body}`);
  }
}

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} at ${hours}:${minutes}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

loadTasks();

setInterval(() => {
  db.then((mydb) => {
    const tx = mydb.transaction("Tasks", "readonly");
    const store = tx.objectStore("Tasks");
    return store.getAll();
  }).then((tasks) => {
    const now = new Date();
    tasks.forEach((task) => {
      if (!task.completed && new Date(task.dueDate) < now) {
        autoCompleteTask(task.id);
      }
    });
  });
}, 1000);
