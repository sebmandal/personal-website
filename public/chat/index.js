const socket = io('https://salvus2.sebmandal.com', {
    // ^ http://143.198.173.186:6905 for production // maybe replace with salvus2... if it works
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
