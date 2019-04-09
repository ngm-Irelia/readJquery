#################     jQuery的遍历     #######################

#列出 jQuery.extend 上扩展的函数，若忘记，自查
function winnow()
 


 #源码写法

#对于filter和not都去调用了grep去过滤
#对过滤器和非过滤器实现相同的功能
 // Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

###############   3114 获得他的一个兄弟元素    #################
function sibling( cur, dir ) {    // 例子 dir = "nextSibling"
#cur[ dir ] 其实就是例子 cur.nextSibling html元素原生的属性！
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}















































#身份
function Identity( v ) {
	return v;
}

# 抛出
function Thrower( ex ) {
	throw ex;
}