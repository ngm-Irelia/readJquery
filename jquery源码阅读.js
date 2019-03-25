//jQuery为开发者开发插件提供了两个方法，分别是：

jquery.extend(object);为扩展jquery类本身.为类添加新的方法

jquery.fn.extend(object);给jquery对象添加方法


/**
 * ngm 10341
 * 释放 jQuery 对 $ 变量的控制。
 * @parmas deep 布尔值。指示是否允许彻底将 jQuery 变量还原。
 * @return jquery
 */
jQuery.noConflict() 

/**
 * ngm 10277
 * 暂停jQuery入口函数ready的执行
 * @params hold  = true 暂停jQuery入口函数ready的执行 ;  false 解除暂停
 */
jQuery.holdReady

/**
 * ngm 10284
 * 哦吼,直接调用的 Array的isArray方法
 */
jQuery.isArray = Array.isArray;
var slice = arr.slice;
var concat = arr.concat;
var push = arr.push;
var indexOf = arr.indexOf;

/**
 * ngm 10255
 * 改变上下文的指向， 内部使用的apply~
 * @parmas context 函数|对象
 * @parmas name 对象|字符串（函数名string）
 * @return jquery
 */
jQuery.proxy( context, name )

proxy = function() {
    return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
};

args = slice.call( arguments, 2 );  ///学习这种截取参数的方式


//
/**
 * ngm 10294
 * 判断指定参数是否是一个数字值
 * @parmas obj number|string  传入 数字 或 字符串
 * @return boolean 
 */
jQuery.isNumeric = function( obj ){}

/**
 * ngm 79
 * 判断是不是一个函数
 * @param {*} obj 
 * @returns boolean
 * 
 */
var isFunction = function isFunction( obj ) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";  ///这里多加一个判断是 因为旧版浏览器的问题

    // 附 网上的讲解文章 http://www.bubuko.com/infodetail-2564471.html
    //1. typeof document.body.childNodes         // function   这在古老的 safari 3 中会出现
    //2.typeof document.createElement("object")  // function 同理还有 ‘embed‘  ‘applet‘ ,  在古老的firefox中会出现,目前新版本不会存在
    //3.typeof /s/                               // function  这种情况会在古老浏览器中出现，目前都会被判定为 object
};


/**
 * ngm 79
 * 判断对象是否为类数组
 * @param {*} obj 
 * @returns boolean
 * 
 */
function isArrayLike( obj ) { 
    //如果obj里面有length键，则length等于obj.lenght;否则等于false
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

         //如果obj是function类型 或者是window对象 则返回false;
	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

/**
 * ngm 482
 * class2type 是什么
 * Boolean Number String Function Array Date RegExp Object Error Symbol 存放这些类型的一个map
 * 通过jQuery.each 添加
 * Object
    [object Array]: "array"
    [object Boolean]: "boolean"
    [object Date]: "date"
    [object Error]: "error"
    [object Function]: "function"
    [object Number]: "number"
    [object Object]: "object"
    [object RegExp]: "regexp"
    [object String]: "string"
    [object Symbol]: "symbol"
    __proto__: Object
 */

jQuery.each(
     "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
    function( i, name ) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    } 
);

/** 
 * ngm 
 * 所有 jQuery.fn 方法汇总
 */

jQuery.fn = jQuery.prototype = {
    /**
     * ngm 193
     * jQuery.each
     * 通过 jQuery.fn 调用了jQuery上面的each方法
     * 然后 jQuery上面的each方法 是 通过 jQuery.extend() 扩展到jquery上面的。
     */
    each: function( callback ) {
        return jQuery.each( this, callback );
    },

    /**
     * ngm 156
     * 用例：$("li").toArray()
     * 可把类数组 转换为 数组， 内部使用的 slice ---- 也就是 数组本身的 slice
     */
    toArray: function() {
		return slice.call( this );
    },

    /**
     * ngm 162
     * 获得 数组中 指定位置的数据
     * @param {*} num 数组下标  若为负数，则逆向查找
     */
    get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
    },
    
    /**
     * ngm 400
     * 合并两个数组 ， 会把数组2 中的值 合并到 数组1中， 使用的for循环~~
     * @param {*} first 数组1
     * @param {*} second 数组2
     */
    merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},
    
}

jQuery.extend( {
    each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},
})

/**
 * ngm 120
 * toType
 * 判断参数obj的类型
 */

function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

/**
 * ngm 10287
 * 调用的isFunction
 */
jQuery.isFunction = isFunction;

/**
 * ngm 10288
 * 调用的isWindow
 */
jQuery.isWindow = isWindow;

/**
 * ngm 10290
 * 调用的toType
 */
jQuery.type = toType; 


var isWindow = function isWindow( obj ) {
    return obj != null && obj === obj.window; /// 都有一个window属性！！
};