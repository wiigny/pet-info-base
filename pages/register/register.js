import { registerUser} from "../../scripts/api.js"
import { modalInfo } from "../../scripts/modal.js"

function registrarUser(){
    const form = document.querySelector('form')
    const elements = [...form.elements]

    const passInvalid = document.querySelector('#passInvalid')
    const userInvalid = document.querySelector('#userInvalid')
    const emailInvalid = document.querySelector('#emailInvalid')
    const imgInvalid = document.querySelector('#imgInvalid')

    const inputs = document.querySelectorAll('form input')

    const buttonRegister = document.querySelector('#buttonRegister')

    const msg = {message: 'Username já cadastrado, favor informar um username que não pertença a um usuário já cadastrado'}
    const msg2 = {message: "Email já cadastrado, favor informar um email que não pertença a um usuário já cadastrado"}
    const created = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../../index.html">Acessar página de login</a> ou espere 5 segundos'

    inputs.forEach(inp=>{
        inp.addEventListener('input', ()=>{
            inputs.forEach(elt=>{
                if(elt.value != ""){
                    buttonRegister.disabled = false
                }else{
                    buttonRegister.disabled = true
                }
            })
        })
    
    })


    elements.forEach(elt=>{
        
        elt.addEventListener('click', async (e)=>{
            e.preventDefault()

            if(elt.tagName == 'BUTTON' && elt.textContent == "Voltar para o login"){
                setTimeout(()=>{
                    window.location.replace('../../index.html')
                },1000)

            }else if(elt.tagName == 'BUTTON' && elt.textContent == "Cadastrar" ){
                
                const inputUsername = elements[1]
                const inputEmail = elements[2]
                const inputPassword = elements[4]
                const inputAvatar = elements[3]
                
                if(inputPassword.value == '' || inputEmail.value == '' || inputUsername.value == '' || inputAvatar.value == ''){
                    if(inputUsername.value == ''){
                        userInvalid.innerText = 'insira um nome de usuário'
                        setTimeout(() => {
                            userInvalid.innerText = ''
                        }, 3000);
                    }else if(inputEmail.value == ''){
                        emailInvalid.innerText = 'insira um email'
                        setTimeout(() => {
                            emailInvalid.innerText = ''
                        }, 3000);
                    }else if(inputAvatar.value == ''){
                        imgInvalid.innerText = 'insira um avatar'
                        setTimeout(() => {
                            imgInvalid.innerText = ''
                        }, 3000);
                    }else if(inputPassword.value == ''){
                        passInvalid.innerText = 'insira uma senha'
                        setTimeout(() => {
                            passInvalid.innerText = ''
                        }, 3000);
                    }

                }else{
                    elt.children[0].classList.add('loader')
                    elt.children[0].innerText = ''

                    const body = {
                        username: inputUsername.value,
                        email: inputEmail.value,
                        password: inputPassword.value,
                        avatar: inputAvatar.value
                    }
                    const response = await registerUser(body)

                    if(response.message == msg.message || response.message == msg2.message){
                        modalInfo(response.message)

                        elt.children[0].classList.remove('loader')
                        elt.children[0].innerText = 'Cadastrar'

                        setTimeout(()=>{
                            const divModal = document.querySelector('#divModal')
                            divModal.remove()
                        }, 3000)
                    }else if(response.id){
                        modalInfo(created)

                        elt.children[0].classList.remove('loader')
                        elt.children[0].innerText = 'Cadastrar'
                        
                        setTimeout(()=>{
                            const divModal = document.querySelector('#divModal')
                            divModal.remove()
                            window.location.replace('../../index.html')
                        }, 3000)
                    }
                }
            }
        })
    })

}
registrarUser()