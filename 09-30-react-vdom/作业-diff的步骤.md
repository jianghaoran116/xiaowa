# react的diff策略  
- 同层比较
- 不同类型的组件生成不通的树形结构
- 同层级的子节点通过唯一ID区分  
![update1](./dom-diff-update1.png)  
**有个lastIndex概念：表示访问过的节点在旧集合中最右的位置**  
更新步骤：
1. 新的列表中取出B，B在旧集合的位置1，此时lastindex为0，**大于lastindex**，所以B不移动，更新lastindex: lastindex=Match.max(prechild._mountIndex(此时为1), lastindex(此时为0))，所以lastIndex为1。
2. 新列表里取出E，此时lastIndex为1，E**不在旧列表里**，创建新节点，更新lastindex为1。  
3. 新的列表里取出C，此时lastIndex为1，C的index为2，**大于lastindex**,C不移动，更新lastindex为2。  
4. 新的列表取出A，此时lastIndex为2，A的index为1，**小于lastindex**, A移动, 更新lastindex为2。  
5. 新的列表更新完，发现D没有出现在新列表里，删除D。  
![update2](./dom-diff-update2.png)
更新步骤：
1. 新的列表里取出D，D在旧集合的位置为3，此时lastindex为0，**大于lastindex**,所以D不移动，更新lastindex为3。  
2. 新的列表取出A，A在旧列表的位置为0，lastindex为3，**小于lastindex**，移动A，更新lastindex为3。  
3. 新的列表取出B，B在旧列表的位置为1，lastindex为3，**小于lastindex**，移动B，更新lastindex为3。  
4. 新的列表取出C，C在旧列表的位置为2，lastindex为3，**小于lastindex**，移动C，更新lastindex为3。  
5. 最后遍历下旧列表，发现都在。
