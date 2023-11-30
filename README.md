## 前言
最近在写一个后台管理系统，大概的技术栈是react18+ts+v6+antd。  
运用到的更多技术的看我下面的详细介绍，此项目是由B站千锋教育kerwin老师的产品，接口用的也是他们的。  
但是本项目与kerwin老师写的版本和技术都不同，只是基于接口与功能来实现。  
大家看看项目源码就一目了然了，如果完全不知道该如何下手建议可以去B站看看原版视频哦。

## 项目展示


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4376f41bbb1440ba84836cb94f33315d~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0389fa8f207f45ccb2401d4b1c515ec2~tplv-k3u1fbpfcp-watermark.image?)

码云项目地址：[码云项目地址](https://gitee.com/kang0916/react18-v6-cms)  
**觉得不错的话，帮忙点个star!万分感谢！**  
具体效果下载项目后浏览

## 技术分布
- react18
- typescript 
- react-router-dom v6  --路由
- react-particles   -- 粒子效果
- react-redux redux --状态管理
- redux-persist --redux状态持久化
- redux-thunk --处理redux异步
- antd -- 组件库
- axios --网络请求封装
- draft-js -- 富文本编辑器
- echarts --可视化图表
- immutable -- 状态储存优化
- nprogress -- 页头加载进度效果
- styled-components -- css in js
- moment --时间处理工具库

## 项目运行
 项目需要配合本地服务器json-server来使用  
 **db.json 在项目的public文件夹内！**  
 下载json-server
>  npm install -g json-serve  
>  注意下面指令运行的路径！当前db.json目录下运行！  
> json-server --watch .\db.json --port 5000
> 登录账户admin 123456


下载运行项目
> git clone 项目地址  
> yarn   
> yarn start

## 学习收获
学习此项目你将收获
- react 熟练使用hook useImperativeHandle，useMemo等使用场景
- react-router v6 动态生成路由 路由懒加载 
- redux 状态持久化与状态储存优化结合使用
- 辅助库的使用 粒子效果，可视化图表，富文本编辑器，页头动态加载等
- 了解并掌握后台管理开发流程及权限管理设置与实现
- react和ts 的项目综合使用等...

## 注意事项
当我们需要通过接口执行删除操作来调试的时候，会删除本地的json数据，这时候的正确做法是: 先打开db.json然后再通过接口发送，确认删除成功后回到db.json 执行撤销操作ctrl+z 数据就不会丢失了。
另外需要注意的是把db.json移出来，不要和项目放一起，因为更新或者删除操作改变了文件内容会引起webpack重新打包导致项目重新运行！！！

## End
**觉得不错的话，帮忙给项目点个star!万分感谢！** 
# react18Ts
"# react18Ts" 
# react18Ts
