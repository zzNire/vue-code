var a = 1;

// worker.js
const ports = []
onconnect = e => {
	const port = e.ports[0]
	ports.push(port)
	port.onmessage = evt => {
		ports.filter(v => v!== port) //sharedworker分发消息
		.forEach(p => p.postMessage(a++))
    }
    //如果使用 addEventListener('message0,e=>{}')
    //需要加上 port.start();
}