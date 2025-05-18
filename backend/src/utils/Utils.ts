export function RandomHash(len:number):string{
    let options:string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz123456789"
    let hash:string=""
    for(let i=0;i<len;i++){
        hash+=options[Math.floor((Math.random()*options.length))]
    }
    return hash;
}