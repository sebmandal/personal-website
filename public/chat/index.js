const socket = io('ws://localhost:6905', {
    // ^ https://salvus.sebmandal.com for production
    // ^ ws://localhost:6905 for development
    // change to your own server's port
    transports: ['websocket'],
    upgrade: false,
})

socket.on('message', (text) => {
    const newMessage = document.createElement('li')
    newMessage.innerHTML = text
    document.querySelector('#messages').appendChild(newMessage)

    // scroll to bottom
    const messages = document.querySelector('#messages')
    messages.scrollTop = messages.scrollHeight
})

document.querySelector('#send-button').onclick = () => {
    const text = document.querySelector('#message').value
    if (text === '') {
        return
    }
    socket.emit('message', text)
    document.querySelector('#message').value = ''
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        document.querySelector('#send-button').click()
        document.querySelector('#message').value = ''
    }
})
