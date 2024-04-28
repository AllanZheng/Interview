class task {
  id;
  name;
  deleted;
  constructor(id, name, deleted) {
    this.id = id;
    this.name = name;
    this.deleted = deleted
  }

}
tasks = [];
const requestBody = require('./main.js');

// 创建任务
function createTask(requestBody) {
  if (requestBody.name != null) {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    let name = requestBody.name
    const newTask = new task(id, name, false);
    tasks.push(newTask);
    return newTask;
  }
  return null;
}

// 读取所有任务
function getAllTasks() {
  let res = []
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].deleted == false) {
      res.push(tasks[i])
    }
  }
  return res;
}

// 通过ID读取任务
function getTaskById(requestBody) {
  if (requestBody.id == null) {
    return null
  }
  data = tasks.find(task => task.id === requestBody.id);
  if (data == null){
    return null
  }
  if (data.deleted == false) {
    return data
  }


}

// 更新任务
function updateTask(requestBody) {
  if (requestBody.id == null) {
    return null
  }
  const index = tasks.findIndex(task => task.id === requestBody.id);
  if (index !== -1) {
    let updatedata = new task(requestBody.id, requestBody.name, requestBody.deleted)
    if (updatedata.deleted == null) {
      updatedata.deleted = false
    }
    if (updatedata.name == null) {
      updatedata.name = tasks[index].name
    }
    tasks[index] = { ...tasks[index], ...updatedata };
    return tasks[index];
  }
  return null;
}

// 删除任务
function deleteTask(requestBody) {
  const index = tasks.findIndex(task => task.id === requestBody.id);
  if (index !== -1) {
    data = tasks.find(task => task.id === requestBody.id);
    if (data != null) {
      data.deleted = true
      return data;
    }
  }
  return null;
}
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTask,
  updateTask
};
