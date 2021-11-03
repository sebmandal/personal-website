const socket = io('ws://localhost:6905', {
    // change to your own server's port
    transports: ['websocket'],
    upgrade: false,
})

socket.on('message', (text) => {
    const newMessage = document.createElement('li')
    newMessage.innerHTML = text
    document.querySelector('#messages').appendChild(newMessage)

    document.querySelector('#message').value = ''
})

document.querySelector('#send-button').onclick = () => {
    const text = document.querySelector('#message').value
    socket.emit('message', text)
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        document.querySelector('#send-button').click()
    }
})
