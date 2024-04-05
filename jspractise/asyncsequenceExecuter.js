asynctask = function (time)
{
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve('time elapsed is '+time)
        }, time*100);
    })
}

let arrayofAsync = [
    asynctask(3),
    asynctask(7),
    asynctask(1),
    asynctask(5)
]

resolveAsyncInSequence = function(asyncArray)
{
    asyncArray.reduce((prev,current)=>{

        return prev.then((result)=>{
            return current.then((res)=>{console.log(res)})
        })

    },Promise.resolve())
}

resolveAsyncInSequence(arrayofAsync)