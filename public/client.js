const socket = io()

let names;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    names = prompt('Please Enter your name : ')
}while(!names)

// keyup event checks if any key is pressed but here we will check specifically for enter key
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: names,
        message:message.trim()//white space will get trimmed we dont want text area to increase by scrolling up and down so trim
    }
//append

    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

// send to server
//use socket server required from the first line 
    socket.emit('message',msg)     //msg is the object created inside of sendMessage function


}


function appendMessage(msg,type){
    let mainDiv = document.createElement('div')

    let className = type

    mainDiv.classList.add(className,'message')

    let markup= `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>

    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

//Recive
//receive the message which was broadcasted by the server.js on all connected sockets

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')  //as this is the incoming message so this has type as incoming
    //the above written appendMessage function is called 
    scrollToBottom()
})
//function to scroll to bottom when we recive or send mess

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}