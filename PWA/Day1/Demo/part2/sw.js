const filesToCache =[
    'index.html',
    'CSS/main.css',
    'page1.html'
]

const staticCache = 'Pages'
self.addEventListener('install',event=>{
    console.log('service worker installing....',event)
    event.waitUntil(
        caches.open(staticCache)
        .then(cache=>{
            return cache.addAll(filesToCache)
        })
        .catch(err=>{
            console.log(err)
        })
    )
})
self.addEventListener('activate',event=>{
    console.log('service worker activating.....',event)
})

self.addEventListener('fetch',event=>{
    console.log('Fetching ..',event.request.url)
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                console.log('found in cache ',event.request.url)
                return response
            }
            console.log('network request needed',event.request.url)
            return fetch(event.request)
        })
        .catch(err=>{
            console.log(err)
        })
    )
})