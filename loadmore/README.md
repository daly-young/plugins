# loadmore 分页加载
指令`v-loadmore`  
  
参数：  
* callback: 回调函数
* finish: 是否获取全部数据
* delay: 延迟执行，默认为0
* interval: 执行间隔事件，默认100ms

em:
```
<div v-loadmore="{callback:fn,finish: false}"></div>
```

