

## 配置文件参数说明

    "url": string，keepie地址，系统默认为"http://0.0.0.0:8000/sendSecretToMe",
    "receive_url": string，task地址, 系统默认为 "http://localhost:3000",
    "maxRetries" : int，最大重试次数，系统默认为100
    "delay":  int，重试间隔时间（毫秒），系统默认为1000
    "port":int,系统启动接口，默认为3000