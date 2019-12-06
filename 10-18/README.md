# 如何守护进程
通过主从模式，主进程管理子进程，主进程监听子进程的exit事件获取退出信息，然后重新启动一个子进程来继续服务。  
通过child_process或者cluster来实现多进程。  
通过onMessage和postMessage进行通信。  
通过建立IPC，发送句柄，把socket发给子进程，监听同一个端口。  

> 参考深入浅出node.js