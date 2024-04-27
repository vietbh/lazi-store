export const numberFormat = (n)=>{
    return parseInt(n).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&.')
}