importScripts('../JS/lib.js')
console.log(this)
onmessage = function(event){
    console.log(event)
    // var sum = parseInt(event.data[0])+parseInt(event.data[1])
    var sum = add(parseInt(event.data[0]),parseInt(event.data[1]))
    this.postMessage([sum])
}

/**Worker API
 * Dedicated Worker
 * Shared Worker
 * Service Worker
 */