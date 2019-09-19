# 源码理解 文件夹中js，阅读时加入注释
# 源码理解备份 文件夹中js是原版
# jquery源码阅读.js 记录学习的内容

## 65集 - 71集，事件的执行队列 顺序问题等： 未看完

jquery-2.0.3版本

（21，94） 定义了一些变量和函数 jQuery = function(){};

（96，283）给JQ对象，添加一些方法和属性

（285，347）extend: JQ的继承方法

（349，817）extend()扩展的一些工具方法

（877，2856）Sizzle 复杂选择器的实现

（2880，3042）Callbacks 回调对象：对函数的统一管理

（3043，3183）Deferred 延迟对象：对异步的统一管理

（3184，3295）support: 功能检测

（3308，3652）data() 数据缓存

（3653, 3797） queue() 队列方法：执行顺序的管理

（3803，4299）attr() prop() val() addClass() 等对元素属性的操作

（4300，5128）on() trigger() 事件操作的相关方法

（5140，6057）DOM操作：添加 删除 获取 包装 DOM筛选

（6058，6620）css() : 样式的操作

（6621，7854）提交的数据和ajax()   ajax()  load()  getJSON()

（7855，8584）animate()   运动的方法

（8585，8792）offset()  :  位置和尺寸的方法





jQuery.fn.extend({
	find: 
	has: 
	not: 
  filter：
	is: 
	closest: 
	index: 
	add: 
	addBack: 
});

function sibling( cur, dir ) {}

jQuery.each({
	parent: 
	parents: 
	parentsUntil: 
	next: 
	prev: 
	nextAll: 
	prevAll: 
	nextUntil: 
	prevUntil: 
	siblings: 
	children: 
	contents: 
}, 
});

jQuery.extend({
	filter: 
	dir: 
	sibling: 
});