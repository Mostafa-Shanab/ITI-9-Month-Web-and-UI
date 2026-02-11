if('serviceWorker' in navigator){
    // console.log('found')
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('../sw.js')
            // ,{scope:'/Pages/'})
        .then(reg=>{
            console.log('service worker registered successfully! ',reg)
        })
        .catch(err=>{
            console.log(err)
        })
    })
}