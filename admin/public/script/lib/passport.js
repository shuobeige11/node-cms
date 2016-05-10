/*
	登录前端接口部分；
	autor:weichangbin
*/
passport = {
    /*后端用户接口*/
    userInterface: {
        loginInter: '/api/login',
        isVerifyInter: '/api/insure',
        updatePassword:'/api/update'
    },

    /*校验输入内容是否合法*/
    validate: function() {
        return {
            username: function(num) {
                return /^[a-zA-Z0-9]\w{1,10}$/.test(num);
            },
            password: function(num) {
                return /^[a-zA-Z0-9][\w\d\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\.\?\\\/\,]{4,15}$/.test(num);
            },
            isVerifyCode: function(num) {
                return /[a-zA-Z0-9]{6}$/.test(num);
            }
        }
    },

    /*
    	用户登录
    	option 请求参数
    	function success 成功回调
    	function fail 失败回调
    */
    login: function(option) {
        var deferred = $.Deferred();
        $.ajax({
            type: 'post',
            url: this.userInterface.loginInter,
            dataType: 'json',
            data: {
                username: option.username,
                password: option.password,
                identify: option.identify
            }
        }).done(function(data) {
            data.erron == 0 ? deferred.resolve(data) : deferred.reject({
                erron: data.erron,
                message: data.message
            })
        }).fail(function(data) {
            deferred.reject({
                erron: data.erron,
                message: data.message
            })
        });
        return deferred;
    },

    /*验证码接口*/

    insure: function() {
        var deferred = $.Deferred();
        $.ajax({
            type: 'get',
            url: this.userInterface.isVerifyInter
        }).done(function(data) {
            data ? deferred.resolve(data) : deferred.reject({
                erron: data.erron,
                message: data.message
            })
        }).fail(function(data) {
            deferred.reject({
                erron: data.erron,
                message: data.message
            })
        });
        return deferred;
    },

    update:function(option){
        var deferred = $.Deferred();
        $.ajax({
            type: 'post',
            url: this.userInterface.updatePassword,
            dataType: 'json',
            data: {
                oldpwd: option.oldpwd,
                newpwd: option.newpwd,
                identify: option.identify
            }
        }).done(function(data) {
            data.erron == 0 ? deferred.resolve(data) : deferred.reject({
                erron: data.erron,
                message: data.message
            })
        }).fail(function(data) {
            deferred.reject({
                erron: data.erron,
                message: data.message
            })
        });
        return deferred;
    }

}