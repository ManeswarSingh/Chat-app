const socket = io();

const form = document.getElementById('send-container')
const msg = document.getElementById('msg')
const btn = document.getElementById('button')
const container = document.querySelector('.container')

const name = prompt("Enter your name to join")

const append = (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    // messageElement.classList.add('message')
    messageElement.classList.add(position)
    container.append(messageElement)

}
btn.addEventListener('click',(e)=>{
    e.preventDefault()
    const message = msg.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    msg.value = ''
})

socket.emit('new-user-joined',name)

socket.on("message",(message)=>{
})

socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,'mid');
})
socket.on('receive',(data)=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',(name)=>{

    append(`${name} left the chat`,'mid');
})

// btn.addEventListener('click',()=>{
//     const message = msg.value;

//     socket.emit('user-message',message)
    // console.log("message is ",message)
// })