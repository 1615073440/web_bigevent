function template(id,data){
let str = document.getElementById(id).innerHTML;
let parten = /{{\s*([a-zA-Z]+)\s*}}/;

let res =null;
while((res = parten.exec(str))){
    str = str.replace(res[0],data[res[1]]);
}
return str;
}

// function template(id, data) {
//     var str = document.getElementById(id).innerHTML
//     var pattern = /{{\s*([a-zA-Z]+)\s*}}/
//     var pattResult = null
//     while ((pattResult = pattern.exec(str))) {
//         str = str.replace(pattResult[0], data[pattResult[1]])
//     }
//     return str
// }
