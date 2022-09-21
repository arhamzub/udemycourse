
console.log('client side js file is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

// messageone.textContent = ''

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value

    messageone.textContent = 'Loading......'
    messagetwo.textContent = ''

    
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
         response.json().then((data) => {

            if(data.error){
                messageone.textContent = data.error
            }else{
                messageone.textContent = data.location
                messagetwo.textContent = 'temp = ' + data.forcast.temperature +
                ' ,humidity = ' + data.forcast.humidity

                console.log(data)

            }      
})
})

    


})

