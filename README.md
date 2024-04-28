# 项目文档 Project Document

该项目是基于javascript语言的node.js开发的todolist-application，按一定间隔向keepie服务器重复请求直到获得用户名和密码后停止请求并开始提供task增加，更新，删除，查询等服务。

This project is a to-do list application developed in Node.js based on the JavaScript language. It repeatedly makes requests to the Keepie server at regular intervals until it obtains the username and password, at which point it stops the requests and begins providing services including  adding, updating, deleting, and querying tasks.


## 1 使用说明 Usage

- 安装node.js 

- 从git@github.com:AllanZheng/Interview.git下载项目 

- 打开下载项目位置

- 编译并运行指令:node src/main.js 

同时该项目提供三个系统（windows,linux,macos）可执行文件压缩在execut_file.zip

- Install node.js
- Dowload project from the address:git@github.com:AllanZheng/Interview.git
- Open the downloaded project location
- build and run this command: node src/main.js

 The project also provide executables for three systems (Windows, Linux, MacOS) compressed in execut_file.zip.
## 2 配置文件config.json参数说明 <br />2 The parameters usage of configuration file(config.json)

参数名称 Parameters						|类型 Type		|描述 Description
:----						|:---		|:---
url| string|keepie地址，系统默认为"http://127.0.0.1:8000/sendSecretToMe"<br /> The address of keepie, default address:http://127.0.0.1:8000/sendSecretToMe
receive_url| string|task地址, 系统默认为 "http://127.0.0.1:3000"  <br /> The address of task, default address:http://127.0.0.1:3000
maxRetries | int | 最大重试次数，系统默认为100 <br />  Maximum number of retries,the default is 100
delay|  int|重试间隔时间（毫秒），系统默认为100 <br /> Time intervals(ms),the default is 100
port|int|系统启动接口，默认为3000	<br /> Port numbers,the deafult is 3000

默认参数示例 Example：

```
{
    "url":"http://127.0.0.1:8000/sendSecretToMe",
    "receive_url": "http://127.0.0.1:3000",
    "maxRetries" : 100, 
    "delay": 1000,
    "port":3000, 
   
}
```

## 3. 接口定义 Interfaces

### 3.1 Task创建 CreateTask

- **接口地址 Interface address ：** /create
- **接口类型 Interface type  ：** POST
#### 3.1.1 请求参数 Request Parameters
  
参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
Header						|&nbsp;		|Required			|请求报文头 Request-header
&emsp;Content-Type				|string		|Required			|文本类型 Content-Type
Body						|&nbsp;		|Required			|&nbsp;参数主体 Parameters Body 
&emsp;name				|string		|Required			|task名称 task name


请求示例 Example：

```
{
    "Header":{
        "Token":"application/json"
    },
    "Body":{
        "name":"1test"
    }
}

```


#### 3.1.2 返回结果 Result 

参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
code						|int		|			| 响应码 Response Code
msg							|string		|			|&nbsp;
data						|object		|			|&nbsp;
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

示例 Example：

```
{
    "code":200,
    "msg":"",
    "data":{
        "id":1,
        "name":"1test",
        "deleted":""
    }
}
```

### 3.2 Task更新 UpdateTask

- **接口地址 Interface address：** /update
- **接口类型 Interface type  ：** POST
#### 3.2.1 请求参数 Request Parameters
  
参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
Header						|&nbsp;		|Required			|请求报文头 Request-header
&emsp;Content-Type				|string		|Required			|文本类型 Content-Type
Body						|&nbsp;		|Required			|&nbsp;参数主体 Parameters Body 
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

请求示例 Example：

```
{
    "Header":{
        "Token":"application/json"
    },
    "Body":{
        "id":1,
        "name":"1test",
        "deleted":""
    }
}

```


#### 3.2.2 返回结果 Result

参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
code						|int		|			| 响应码 Response Code
msg							|string		|			|&nbsp;
data						|object		|			|&nbsp;
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

示例 Example：

```
{
    "code":200,
    "msg":"",
     "data":{
        "id":1,
        "name":"1test",
        "deleted":""
    }
}
```

### 3.3 Task删除 DeleteTask

- **接口地址 Interface address：** /delete
- **接口类型 Interface type  ：** POST
#### 3.3.1 请求参数 Request Parameters
  
参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
Header						|&nbsp;		|Required			|请求报文头 Request-header
&emsp;Content-Type				|string		|Required			|文本类型 Content-Type
Body						|&nbsp;		|Required			|&nbsp;参数主体 Parameters Body 
&emsp;UserId				|string		|Required|唯一Id Unique Id


请求示例 Example：

```
{
    "Header":{
        "Token":"application/json"
    },
    "Body":{
        "id":1,
    }
}

```


#### 3.3.2 返回结果 Result

参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
code						|int		|			| 响应码 Response Code
msg							|string		|			|&nbsp;
data						|object		|			|&nbsp;
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

示例 Example：

```
{
    "code":200,
    "msg":"",
     "data":{
        "id":1,
        "name":"1test",
        "deleted":""
    }
}
```

### 3.4 Task单个查询 GetTask

- **接口地址 Interface address：** /get
- **接口类型 Interface type  ：** POST
#### 3.4.1 请求参数 Request Parameters
  
参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
Header						|&nbsp;		|Required			|请求报文头 Request-header
&emsp;Content-Type				|string		|Required			|文本类型 Content-Type
Body						|&nbsp;		|Required			|&nbsp;参数主体 Parameters Body 
&emsp;UserId				|string		|Required|唯一Id Unique Id


请求示例 Example：

```
{
    "Header":{
        "Token":"application/json"
    },
    "Body":{
        "id":1,
    }
}

```


#### 3.4.2 返回结果 Result

参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
code						|int		|			| 响应码 Response Code
msg							|string		|			|&nbsp;
data						|object		|			|&nbsp;
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

示例 Example：

```
{
    "code":200,
    "msg":"",
     "data":{
        "id":1,
        "name":"1test",
        "deleted":""
    }
}
```

### 3.5 Task全量查询 GetAllTasks

- **接口地址 Interface address：** /all
- **接口类型 Interface type  ：** POST
#### 3.4.1 请求参数 Request Parameters
  
参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
Header						|&nbsp;		|Required			|请求报文头 Request-header
&emsp;Content-Type				|string		|Required			|文本类型 Content-Type



请求示例 Example：

```
{
    "Header":{
        "Token":"application/json"
    }
}

```


#### 3.4.2 返回结果 Result

参数名称 Parameters						|类型 Type		|是否必填 If Required|描述 Description
:----						|:---		|:------	|:---	
code						|int		|			| 响应码 Response Code
msg							|string		|			|&nbsp;
data						|object		|			|&nbsp; 数组 
&emsp;UserId				|string		|			|唯一Id Unique Id
&emsp;name				|string		|			    |task Name  Task Name
&emsp;deleted				|string		|			|是否已删 If the data is deleted

示例 Example：

```
{
    "code":200,
    "msg":"",
     "data":[{
        "id":1,
        "name":"1test",
        "deleted":""
    },{
        "id":2,
        "name":"2test",
        "deleted":""
    }]
}
```



## 4 附录 响应码说明 
## 4 Appendix Response  Code Description
响应码 Response  Code	|说明   Description
:----	|:---
200		|处理成功 Successful 
400		|处理失败 Failed
300		|参数不正确 Parameters failed
404		|未找到对应的函数 Not found
