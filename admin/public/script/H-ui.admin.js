/* -----------H-ui前端框架-------------
 * H-ui.admin.js v2.3.1
 * http://www.h-ui.net/
 * Created & Modified by weichangbin
 * http://opensource.org/licenses/MIT
 *
 */


$.ajax({
    type: 'get',
    url: '/api/menuctrlapi',
    dataType: 'json'
}).done(function(data) {
    var arr=data.obj,htmls='';
    arr.forEach(function(data){
        if(data.name!='首页'){
            $('#menusection').append('<option value='+data._id+'>'+data.name+'</option>');
        }
    });
    for(var i=0;i<arr.length;i++){
        if(arr[i].name!='首页') {
            htmls=htmls+'<dl class="menuctrl-list"><dt class="menuctrl-menu">'+
                '<div class="ly">'+arr[i].name+'</div><div class="lr">'+
                    '<a href="javascript:void(0)">修改</a>&nbsp;&nbsp;'+
                    '<a href="javascript:void(0)">删除</a>'+
                '</div></dt><dd><ul class="menuctrl-submenu">';
            for(j=0;j<arr.length;j++){
                if(arr[j].uid==arr[i].uid && arr[j].sid!='0'){
                    htmls=htmls+'<li><div class="ly">'+arr[j].name+'</div>'+
                    '<div class="lr">'+
                        '<a href="javascript:void(0)">修改</a>'+
                        '&nbsp;&nbsp;<a href="javascript:void(0)">删除</a>'+
                    '</div></li>';
                }
            }
          htmls=htmls+'</ul></dd></dl>';
        }
        $('.menuctrlBody').html(htmls);
    }
});

$('.btn-menu').click(function() {
    var m_value = $('#menuName').val();
    var m_uid = $('#menusection').val();
    $.ajax({
        type: 'post',
        url: '/api/menuInsert',
        data:{
        	name:m_value,
        	uid:m_uid
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(1)
    });
})