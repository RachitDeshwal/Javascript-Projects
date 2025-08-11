addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("todo-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });
  addButton.addEventListener("click", function () {
    const text = todoInput.value.trim();
    if (text === "") return;
    const newItem = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    tasks.push(newItem);

    saveTask();
    renderTask(newItem);

    todoInput.value = "";
    console.log(tasks);
  });
  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `<span> ${task.text}</span>
    <button >Delete</button>`;
    taskList.appendChild(li);

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
  }
});
