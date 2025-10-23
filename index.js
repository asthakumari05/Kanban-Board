<script>
    function allowDrop(event) {
      event.preventDefault();
    }

    function drag(event) {
      event.dataTransfer.setData("text", event.target.outerHTML);
      event.target.remove();
    }

    function drop(event, columnId) {
      event.preventDefault();
      const data = event.dataTransfer.getData("text");
      const container = document.querySelector(`#${columnId} .task-container`);
      container.insertAdjacentHTML("beforeend", data);
      const newTask = container.lastElementChild;
      newTask.ondragstart = drag;
      // Re-attach delete handler
      newTask.querySelector('.delete-btn').onclick = function() {
        this.parentElement.remove();
      };
    }

    function addTask(columnId) {
      const input = document.querySelector(`#${columnId}-input`);
      const value = input.value.trim();
      if (value === "") return;
      const container = document.querySelector(`#${columnId} .task-container`);

      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.ondragstart = drag;
      task.textContent = value;

      // Create delete button
      const deleteBtn = document.createElement("span");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "delete";
      deleteBtn.onclick = function() {
        task.remove();
      };

      task.appendChild(deleteBtn);
      container.appendChild(task);
      input.value = "";
    }
</script>
