
$('.menu_dropdown dl').click(function() {
    var ele = $(this).find('dd');
    if (ele) {
        if (ele.css('display') == 'none') {
            ele.show();
        } else {
            ele.hide();
        }
    }
    var _href = $(this).find('a').attr('_href');
    if (!_href) return;
    $('#iframe_box').find('iframe').attr('src', _href);
});


$.ajax({
    type: 'post',
    url: '/api/ensurelogin',
    dataType: 'json',
    data: {
        username: Cookies.get('username')
    }
}).done(function(data) {
    console.log(Cookies.get('skey'))
    if (data.erron != 0) window.location.href = './login';
});