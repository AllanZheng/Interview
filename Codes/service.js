class task{
  id;
  name;
  constructor(id,name) {
    this.id = id;
    this.name=name;
  }

}
tasks=[];
const requestBody = require('./main.js');

// 创建任务
function createTask(requestBody) {
    if (requestBody.name!=null){
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    let name =requestBody.name
    const newTask = { id, name };
    tasks.push(newTask);
    return newTask;
    }
    return null;
  }

  // 读取所有任务
  function getAllTasks() {
    
    return tasks;
  }

  // 通过ID读取任务
  function getTaskById(requestBody) {
    if (requestBody.id!=null){
      return tasks.find(task => task.id === requestBody.id);
    }else{
      return null
    }
 
  }
  
  // 更新任务
  function updateTask(requestBody) {
    if (requestBody.id==null){
      return null
    }
    const index = tasks.findIndex(task => task.id === requestBody.task.id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return tasks[index];
    }
    return null;
  }

  // 删除任务
  function deleteTask(requestBody) {
    const index = tasks.findIndex(task => task.id === requestBody.id);
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1);
      return deletedTask[0];
    } 
    return null;
  }
  module.exports={
    createTask,
    getAllTasks,
    getTaskById,
    deleteTask,
    updateTask
  };
