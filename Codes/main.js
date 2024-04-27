const service = require('./service.js');
const fs = require('fs');

//var url = 'http://107.173.104.196:8000/sendSecretToMe';
var url = 'http://0.0.0.0:8000/sendSecretToMe';
var data = {
  receive_url: 'http://localhost:3000',

};
var status = true
var count = 0
var port = 3000;
var maxRetries = 100; // 最大重试次数
var delay = 1000; // 重试间隔时间（毫秒）
// 获取参数文件
function getConfig(){
  fs.readFile('config.json', 'utf8', (err, filedata) => {
    if (err) {
      console.error(err);
      return;
    }
    const config = JSON.parse(filedata);
    if (config.url!=null&&config.url!=""){
      url=config.url
    }
    if (config.maxRetries!=null){
      maxRetries=config.maxRetries
    }
    if (config.delay!=null){
      delay=config.delay
    }
    if (config.receive_url!=null&&config.receive_url!=""){
      data.receive_url=config.receive_url
    }
    if (config.port!=null){
      port=config.port
    }
    console.log(config);
  });
}
//参数查询 
function checkParams(body) {
  // 检查是否包含名为 'password' 和'username'的参数
  if (body==null){
    return false
  }
  if (Object.keys(body).includes('password') && Object.keys(body).includes('username')) {
    return true
  } else {
    return false
  }
}

//发送请求
function fetchKeepie(){
  console.log("send")
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function (response) {
      if (!response.ok) {
        throw new Error('Request failed: ' + response.status);
      }
      return response.text();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error(error);
  });
}


//服务启动
function serverStart() {
    const http = require('http');
    const server = http.createServer((req, res) => {
      // 获取请求方法
      const method = req.method;

      // 获取请求URL
      const url = req.url;

      // 获取请求头
      const headers = req.headers;

      // 声明变量存储请求体数据
      let body = '';

      // 监听请求体数据流
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        // 解析请求体数据，如果是JSON格式的数据，则解析为对象
        let requestBody;
        module.exports.requestBody=requestBody;  
        if (body!=null&&body!=""){
        try {
          requestBody = JSON.parse(body);
        } catch (error) {
          console.log(error)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Parse Error');
        }
      }
        console.log(body);
        console.log('Parsed Body:', requestBody);

        // 检查是否包含特定参数
        if (!status) {
          status = checkParams(requestBody);
          if (status) {
            console.log("Service Start\n")
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Service Start\n');
          } else { 
            console.log("Service Not Start\n")
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Service Not Start\n');
          }
        } else {
          switch (url) {
            case '/':
              // 处理根路径请求
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end('Home Page');
              break;
            case '/create':
              // 创建task请求
              if (service.createTask(requestBody)!=null){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end('create successful');
              }else{
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('create failed');
              }
              break;
            case '/update':
              // 更新task请求
              if (service.updateTask(requestBody)!=null){
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('update successful');
              }else{
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('update failed');
              }
              break;
            case '/delete':
                // 删除task请求
                if (service.deleteTask(requestBody)!=null){
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('delete successful');
                }else{
                  res.writeHead(400, { 'Content-Type': 'text/plain' });
                  res.end('delete failed');
                }
                break;
            case '/all':
              result=service.getAllTasks(requestBody)
              if (result!=null){
                console.log(result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
              }else{
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('delete failed');
              }
              break;
              case '/get':
                if (service.getTaskById(requestBody)!=null){
                  res.writeHead(200, { 'Content-Type': 'text/plain' });
                  res.end('delete successful');
                }else{
                  res.writeHead(400, { 'Content-Type': 'text/plain' });
                  res.end('delete failed');
                }
                  break;
            default:
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
          }
        }

      });
    });

   
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });

  }



// 异步函数，模拟需要重请求
async function retryOperation(maxRetries, delay) {
  try {
    // 执行异步操作，这里假设是一个可能会失败的异步任务
    const result = await retryRequest();
    // 检查异步操作的结果是否满足条件，如果满足则返回结果
    if (status) {
      return status;
    } else {
      // 如果服务器状态为false，则抛出一个错误，触发重试
      throw new Error('Condition not met, retrying...');
    }
  } catch (error) {
    if (maxRetries === 0) {
      // 如果达到最大重试次数仍然失败，则抛出错误
      throw new Error('Max retries exceeded');
    }
    // 输出重试信息
    console.log(`Retrying... (${maxRetries} retries left)`);
    // 等待一段时间后继续重试
    await wait(delay);
    // 递归调用 retryOperation 函数，减少重试次数
    return retryOperation(maxRetries - 1, delay);
  }
}
// 等待一段时间的函数
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//异步执行重启尝试
async function retryRequest(){

  // while(!status){
  //   setTimeout(fetchKeepie,1000)
  // }
  return new Promise(resolve => {
    // 模拟异步操作，例如数据库查询或其他耗时任务
    setTimeout(() => {
      console.log("start")
     if(!status){
      fetchKeepie()
     }
      resolve();
    }, 1000); // 假设耗时 2 秒
  });
} 

getConfig()
serverStart()
// 调用异步函数进行重试
retryOperation(maxRetries, delay)
  .then(result => {
    console.log('Operation completed successfully:', result);
  })
  .catch(error => {
    console.error('Operation failed:', error.message);
  });