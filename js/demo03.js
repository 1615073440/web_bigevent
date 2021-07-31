function getCommentList() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {

        },
        success: function (res) {
            if (res.status !== 200) return alert('获取评论失败')
            let rows = [];
            $.each(res.data, function (i, item) { // 循环拼接字符串
                rows.push(`<li class="list-group-item">${item.content}
                <span class="badge" style="background:rgb(92, 129, 230);">评论时间：${item.time}</span>
                <span class="badge" style="background:rgb(218, 99, 99)">评论人：${item.username}</span>   
            </li>`)
            })
            $('#cmt-list').empty().append(rows.join(''));
        },
    })
}
getCommentList();

$(function () {
    $('#formAdd').submit(function (e) {
        e.preventDefault();//阻止表单的提交和页面的跳转
        let data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
            if (res.status !== 201) return alert('发布评论失败')
            //刷新评论列表
            getCommentList();

            $('#formAdd')[0].reset();//[0]将jquery对象转换为原生dom对象
        })
    })
}) 