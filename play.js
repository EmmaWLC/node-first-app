const fetchData = () => {
    const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('haha');
        },1);
    });
    return promise;
}


setTimeout(()=>{
    console.log('Timer is done!');
    fetchData().then(
        text=> {
            console.log(text);
            return fetchData()
        }
    ).then(
        text2 => {
            console.log(text2);
        }
    );
},1500);

console.log('Hi');
console.log('Hello');
