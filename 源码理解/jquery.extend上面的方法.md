#################     jQuery.extend 上面的方法      #######################

#列出 jQuery.extend 上扩展的函数，若忘记，自查
.grep()
 


 #源码写法


jQuery.extend( {

# grep 作用是：筛选符合要求的元素，返回值为数组	
  grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},


} )

