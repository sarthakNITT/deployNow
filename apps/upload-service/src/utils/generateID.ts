export default function GenerateID () {
    const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let id = "";
    for(let i=0;i<length;i++){
        id += sample[Math.floor(Math.random() * sample.length)];
    }
    return id;
}