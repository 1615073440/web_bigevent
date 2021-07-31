$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    $('#btn').click(function () {
        let text = $('#ipt').val().trim();//获取用户输入的内容
        if (text.length <= 0) {//判断输入的内容是否为空
            return $('#ipt').val('');//点击发送后，清空输入框内容

        }
        //讲输入的内容追加到聊天窗口中
        $('.talk_list').append(` <li class="right_word">
       <img src="img/person02.png" /> <span>${text}</span>
     </li>`);

        $('#ipt').val('');
        resetui();//重置滚动条位置
        getMsg(text);//发起请求,获取聊天内容
    })

    //发起请求获取聊天消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message === 'success') {
                    let msg = res.data.info.text;//得到发送给服务器的消息,然后将得到的消息追加到聊天窗口中
                    $('.talk_list').append(` <li class="left_word">
                    <img src="img/person01.png" />
                     <span>${msg}</span>
                  </li>`);
                    resetui();//重置滚动条位置 
                    //调用语音播报
                    getVoice(msg);
                }
            }
        })
    }
    //将机器人的聊天内容转为语音播报
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {//
                if (res.status === 200) {
                    $('#voice').attr('scr', res.voiceUrl);
                }
            }
        })
    }
    //绑定点击事件
    $('#ipt').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#btn').click();
        }
    })


})