#################     jQuery的遍历     #######################

操作Dom元素 http://www.w3school.com.cn/jquery/jquery_ref_traversing.asp
#列出jQuery的遍历函数，若忘记，自查
.add()

.addSelf()
#
.children()

.closest()

.each()

.end()

.eq()
#
.filter()

.find()

.first()

.has()
#
.is()

.last()

.map()
#
.next()
#
.nextAll()
#
.nextUntil()
#
.not()

.offsetParent()
#
.parent()
#
.parents()
#
.parentsUntil()
#
.prev()
#
.prevAll()
#
.prevUntil()
#
.siblings()

.slice()   #和字符串的slice用法相同 slice(0, 2)
#
.contents() 获得其所有子元素（一层）

# ok~这些函数都是通过 jQuery.each(对象，func) 添加到jQuery.fn上面的

源码阅读：

##############    2776 根据传递的元素与词素的位置关系，查找指定的元素    ##############
var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;
#elem[ dir ] 其实就是 例如cur.nextSibling 使用的html元素原生的属性！，然后是通过循环，获得所有元素
	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) { //ok~这里实现功能的时候，调用了其定义好的各种api
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};

# 使用dir函数的 方法有：parents  parentsUntil nextAll prevAll nextUntil prevUntil

##############   3114 获得他下面一个兄弟元素    #################
function sibling( cur, dir ) {
#cur[ dir ] 其实就是 cur.nextSibling html元素原生的属性！
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}
#### 使用sibling函数的 方法有：next prev

#############    2793  ##############
var siblings = function( n, elem ) {
	var matched = [];
#for循环 元素的nextSibling，并且不是elem， 就是它的所有兄弟元素
	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};
#### 使用siblingsg函数的 方法有：siblings children 

jQuery.each( {
#    看， parent是获取的元素elem身上的parentNode
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null; 
	},
#    看， parents是调用的dir函数
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
#    看， parentsUntil是调用的dir函数    
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
#    看， next 是调用的sibling函数， 参数"nextSibling" 才是重点  
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
#    看， prev 是调用的sibling函数， 参数"previousSibling" 才是重点，是html元素原生的属性      
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
#    看， nextAll 是调用的 dir 函数， 参数"nextSibling" 才是重点，是html元素原生的属性    
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
#    看， prevAll 是调用的 dir 函数， 参数"previousSibling" 才是重点，是html元素原生的属性    
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
#    看， nextUntil 是调用的 dir 函数， 参数"nextSibling" 才是重点，是html元素原生的属性    
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
#    看， prevUntil 是调用的 dir 函数， 参数"previousSibling" 才是重点，是html元素原生的属性     
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
#    看， siblings 是调用的 siblings 函数， 原理是把父元素的第一个子元素传给siblings函数
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
#    看， children 是调用的 siblings 函数， 原理是把其第一个子元素传给siblings函数，返回的是第一个子元素+它的所有兄弟元素
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
#获得匹配元素集合中每个元素的子节点，包括文本和注释节点  最后的 elem.childNodes
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );




jQuery.fn.extend( {
#查找后代所有元素符合要求的	
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );
		//在这循环了下一层
		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
# 涉及到	pushStack()  winnow()  grep() 的用法
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
# 涉及到	pushStack()  winnow()  grep() 的用法	
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
# 也是使用的winnow() grep() 返回的是数组长度的 ！！状态	（负负得正~）
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );



jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );