//验证码接口请求
function insureImg(){
	passport.insure().done(function(){
		var uri='/api/insure?rand=v-'+Math.ceil((Math.random()*10000+9999));
		$('#identifyImg').attr('src',uri);
	}).fail(function(){
		$('.tiperror').html('服务异常!').show();
	});
}


//验证码载入
insureImg();
$('#kanbuq').on('click',function(){
	insureImg();
});


//用户登录入口
$('.btn-success').on('click',function(){
	var oldpwd=$('#oldpwd').val(),
	newpwd=$('#newpwd').val(),
	identify=$('#identify').val();
	if(!oldpwd || !oldpwd || !identify){
		$('.tiperror').show().html('旧密码、新密码、验证码不能为空！');
		return false
	}
	if(!passport.validate().password(oldpwd)){
		$('.tiperror').show().html('您输入的旧密码不合法！');
		return false
	}
	if(!passport.validate().password(newpwd)){
		$('.tiperror').show().html('您输入的密码不合法！');
		return false
	}
	if(!passport.validate().isVerifyCode(identify)){
		$('.tiperror').show().html('您输入的验证码不合法！');
		return false
	}
	passport.update({
		oldpwd:oldpwd,
		newpwd:newpwd,
		identify:identify
	}).done(function(data){
		location.href='./login';
	}).fail(function(data){
		if(!data.erron){
			$('.tiperror').show().html('服务异常！');
			return 
		}
		$('.tiperror').show().html(data.message);
	});
});	
