document.getElementById('btn').addEventListener('click',function(){
    var counter = 0
    timer = setInterval(function(){
        counter++
        document.getElementById('sp1').innerHTML += ","+counter
    },1000)
})

document.getElementById('btn2').addEventListener('click',function(){
    clearInterval(timer)
})

var myworker = new Worker('../JS/workerScript.js')
document.getElementById('btn3').addEventListener('click',function(){
    var val1 = document.getElementById('txt1').value
    var val2 = document.getElementById('txt2').value
    myworker.postMessage([val1,val2])
})

myworker.onmessage = function(event){
    console.log(event)
    document.getElementById('sp2').innerHTML = event.data[0]
}