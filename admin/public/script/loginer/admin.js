//验证码接口请求
function insureImg(){
	passport.insure().done(function(){
		var uri='/api/insure?rand=v-'+Math.ceil((Math.random()*10000+9999));
		$('#identifyImg').attr('src',uri);
	}).fail(function(){
		$('.tiperror').html('服务异常!').show();
	});
}

//判断是否已登录
$.ajax({
	 type: 'post',
     url: '/api/ensurelogin',
     dataType: 'json',
     data: {
        username: Cookies.get('username')
     }
}).done(function(data){
	if(data.erron==0) window.location.href='./index';
});

//验证码载入
insureImg();
$('#kanbuq').on('click',function(){
	insureImg();
});


//用户登录入口
$('.btn-success').on('click',function(){
	var logName=$('#username').val(),
	pwdNum=$('#password').val(),
	identify=$('#identify').val();
	if(!logName || !pwdNum || !identify){
		$('.tiperror').show().html('用户名、密码、验证码不能为空！');
		return false
	}
	if(!passport.validate().username(logName)){
		$('.tiperror').show().html('您输入的用户名不合法！');
		return false
	}
	if(!passport.validate().password(pwdNum)){
		$('.tiperror').show().html('您输入的密码不合法！');
		return false
	}
	if(!passport.validate().isVerifyCode(identify)){
		$('.tiperror').show().html('您输入的验证码不合法！');
		return false
	}
	passport.login({
		username:logName,
		password:pwdNum,
		identify:identify
	}).done(function(data){
		location.href='./index';
	}).fail(function(data){
		if(!data.erron){
			$('.tiperror').show().html('服务异常！');
			return 
		}
		$('.tiperror').show().html(data.message);
	});
});	
