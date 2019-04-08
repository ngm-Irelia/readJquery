#################     jQuery的遍历     #######################

操作Dom元素 http://www.w3school.com.cn/jquery/jquery_ref_traversing.asp
#列出jQuery的遍历函数，若忘记，自查
.add()

.addSelf()

.children()

.closest()

.each()

.end()

.eq()

.filter()

.find()

.first()

.has()

.is()

.last()

.map()

.next()

.nextAll()

.nextUntil()

.not()

.offsetParent()

.parent()

.parents()

.parentsUntil()

.prev()

.prevAll()

.prevUntil()

.siblings()

.slice()   #和字符串的slice用法相同 slice(0, 2)

# ok~这些函数都是通过 jQuery.each(对象，func) 添加到jQuery.fn上面的

******************  jquery-遍历.md 中展示上面所有函数的源码阅读情况  **********************


########################    节点操作 文档操作    #########################
 
#.domManip()是jQuery DOM操作的核心函数。dom即Dom元素，Manip是Manipulate的缩写，连在一起就是Dom操作的意思。

