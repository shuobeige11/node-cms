'use strict';

function helper(hbs){
	require('dashbars').help(hbs);
	hbs.registerHelper('divide',function(left,right,precision,keepZero){
		var value=left/right;
		if(typeof precision==='number'){
			value=value.toFixed(precision);
		}
		if(!keepZero){
			value=+value;
		}
		return value;
	});
}

module.exports=helper;