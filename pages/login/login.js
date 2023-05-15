import { loginApi } from '../../scripts/api.js'

function goToRegister(){
    const buttonRegister = document.querySelector('#buttonRegister')
    buttonRegister.addEventListener('click', (e)=>{
        e.preventDefault()
        setTimeout(()=>{
            window.location.replace('../pages/register/register.html')
        }, 1000)
    })
}
goToRegister()

async function login(){
    const emailError = 'O email está incorreto'
    const passError = 'A senha está incorreta'
    const internalError = 'Internal server Error'
    
    const emailAlert = document.querySelector('#emailInvalid')
    const passAlert = document.querySelector('#passInvalid')

    const buttonAcess = document.querySelector('#buttonAcess')

    const inputs = document.querySelectorAll('form input')

    const form = document.querySelector('form')
    const elements = [...form.elements]

    inputs.forEach(inp=>{
        inp.addEventListener('input', ()=>{
            inputs.forEach(elt=>{
                if(elt.value != ""){
                    buttonAcess.disabled = false
                }else{
                    buttonAcess.disabled = true
                }
            })
        })
    
    })

    form.addEventListener('submit', async (e)=>{
        e.preventDefault()
        
        const body = {}

        const button = e.target.children[3]
        button.children[0].classList.add('loader')
        button.children[0].innerText = ''
        if(button.children[0].disabled){

        }

        elements.forEach(async elt=>{
            if(elt.tagName == 'INPUT' && elt.value == ''){
                emailAlert.classList.remove('dspl-none')
                passAlert.classList.remove('dspl-none')
                setTimeout(() => {
                    passAlert.classList.add('dspl-none')
                    emailAlert.classList.add('dspl-none')
                }, 3000);

            }else if(elt.tagName == 'INPUT' && elt.value != ''){
                body[elt.id] = elt.value
            }
            
        })
        const response = await loginApi(body)
        if(response.message == internalError){
            button.children[0].classList.remove('loader')
            button.children[0].innerText = 'Acessar'
        }
        if(response.message == emailError){
            emailAlert.classList.remove('dspl-none')

            button.children[0].classList.remove('loader')
            button.children[0].innerText = 'Acessar'

            setTimeout(() => {
                emailAlert.classList.add('dspl-none')
            }, 3000);
        }
        if(response.message == passError){
            passAlert.classList.remove('dspl-none')

            button.children[0].classList.remove('loader')
            button.children[0].innerText = 'Acessar'

            setTimeout(() => {
                passAlert.classList.add('dspl-none')
            }, 3000);
        }

        if(response.token){
            const token = JSON.stringify(response)
            localStorage.setItem('user', token)
            
            window.location.replace('./pages/homePage/homePage.html')
        }
    })
}
login()