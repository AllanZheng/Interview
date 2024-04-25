// 创建任务
function createTask(title) {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, title, completed: false };
    tasks.push(newTask);
    return newTask;
  }
  
  // 读取所有任务
  function getAllTasks() {
    return tasks;
  }
  
  // 通过ID读取任务
  function getTaskById(id) {
    return tasks.find(task => task.id === id);
  }
  
  // 更新任务
  function updateTask(id, updatedTask) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return tasks[index];
    }
    return null;
  }
  
  // 删除任务
  function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1);
      return deletedTask[0];
    }
    return null;
  }