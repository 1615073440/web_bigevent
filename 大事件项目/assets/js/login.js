$(function () {
    //点击注册账号的连接
    $('#linkreg').click(function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击登录账号的连接
    $('#linklogin').click(function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //layui中获取对象
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('#repassword').val();
            if (pwd !== value) {
                return '密码不一致！'
            }
        }
    })

    //监听注册表单
    // $('#regform').on('submit', function (e) {
    //     e.preventDefault();
    //     $.post('http://api-breakingnews-web.itheima.net/api/reguser', { username: $('#regform [name=username]').val(), password: $('#regform [name=password]').val()},
    //         function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('注册失败')
    //             }
    //             layer.msg('注册成功');
    //         }
    //     )
    // })
    $('#regform').on('submit', function (e) {
        e.preventDefault();
        let data = {
            username: $('#regform [name=username]').val(),
             password: $('#regform [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data,
            function (res) {
                if (res.status == 0) {//有问题
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功');
                //模拟人的点击行为
                $('#linklogin').click();
            }
        )
    })

    //监听表单提交事件
    $('#loginform').submit(function(e){
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:'http://api-breakingnews-web.itheima.net/api/login',
            method:'POST',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res === 0){//有问题
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                //将登录成功的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                //
                location.href = '/index.html'
            },
        })
    })

})