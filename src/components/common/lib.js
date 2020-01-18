export function roundTo(x, i){
    let str = '';
    for(let j = 0; j < (i - x.toString().length); j++){
        str += '0';
    }
    return str + x;
}