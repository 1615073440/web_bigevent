function reloveDate(data){
    let arr = [];
    for(let k in data){
        let str = k+'='+data[k];
        arr.push(str);
    }
    return arr.join('&');
}

// let res = reloveDate({name:'zxy',age:18,});
// console.log(res);

//封装函数
function itheima(options){
    let xhr = new XMLHttpRequest();

    //把外界传过来的参数转换为查询字符串
    var qs = reloveDate(options.data);

    //判断函数发起什么请求 get 还是post
    if(options.method.toUpperCase() === 'GET'){
        //发起get请求
        xhr.open(options.method,options.url + '?'+qs);
        xhr.send();
    }else if(options.method.toUpperCase() === 'POST'){
        //发起post请求
        xhr.open(options.method,options.url);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    xhr.onreadystatechange = function(){
        if(xhr.readystate === 4 && xhr.status === 200){
            let res = JSON.parse(xhr.responseText);


            options.success(res);
        }
    }
}