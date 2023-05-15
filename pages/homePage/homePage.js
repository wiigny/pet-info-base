import { getLocalStorage } from "../../scripts/localStorage.js";
import { modalHomePage, modalInfo, modalPost , showPostModal } from "../../scripts/modal.js"
import { getUser, createPost, getPostApi, changePost, deletePost } from "../../scripts/api.js"

(async function checkLocal(){
    if(getLocalStorage() == ""){
        window.location.replace('../../index.html')
    }else{
        const nameUser = document.querySelector('#nameUser')
        const imgUser = document.querySelector('#avatarUser')
        const imgApi = await getUser(getLocalStorage())
        nameUser.innerText = `@${imgApi.username}`
        imgUser.src = imgApi.avatar

    }
    addPost()
    logout()
})()

async function addPost(){
    const objPost = await getPostApi(getLocalStorage())

    const section = document.querySelector('#posts')
    section.innerHTML = ''

    await objPost.forEach(async obj=> {
        
        section.insertAdjacentHTML("afterbegin",await modalPost(obj))
        
        
        if(section.childElementCount == objPost.length){
            delOrEditPost()
            showPost()
        }
    })

}

function logout(){
    const p = document.querySelector('#logout')
    const divLogout = document.querySelector('#logoutDiv')
    const boxImg = document.querySelector('.boxImg')

    boxImg.addEventListener('mouseenter', ()=>{
        divLogout.classList.add('dspl-flex')
        divLogout.classList.remove('dspl-none')
        if('mouseover'){
            setTimeout(() => {
                divLogout.classList.remove('dspl-flex')
                divLogout.classList.add('dspl-none')
            }, 3000);
        }
    })


    p.addEventListener('click', ()=>{
        localStorage.removeItem('user')
        window.location.replace('../../index.html')
    })
}

function delOrEditPost(){
    const section = document.querySelector('main section')
    const body = document.querySelector('body')

    const article = [...section.children]

    article.forEach(tag=>{

        if(tag.children[0].children[1]){
            const divButtons = tag.children[0].children[1]

            divButtons.addEventListener('click', (e)=>{

                if(e.target.id == 'deletPost'){
                    body.insertAdjacentHTML('beforeend',modalHomePage('Confirmação de exclusão', "Sim, excluir este post", true))
                
                    const buttonDeletePost = document.querySelector('#deletePost')
    
                    buttonDeletePost.addEventListener('click', (e)=>{
                        e.preventDefault()
                        deletePost(getLocalStorage(),tag.id)
    
                        modalInfo('O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed', false, true)             
                        setTimeout(() => {
                            document.querySelector('#divModal').remove()
                        }, 3000);
    
    
                        document.querySelector('#modalPosts').classList.add('opacityAnimation')
                        setTimeout(() => {
                            document.querySelector('#modalPosts').remove()
                            addPost()
                        }, 500);
    
                    })
    
                    closeModal()

                }if(e.target.id == 'editPost'){
                    const h2 = tag.children[1].children[0].innerText
                    const paragraph = tag.children[1].children[1].innerText

                    body.insertAdjacentHTML('beforeend', modalHomePage('Edição', 'Salvar Alterações', false, h2))
                    document.querySelector('#content').value = paragraph

                    postModalElements(true, tag.id)
                    closeModal()
                }
            })
        }
        
    })
}

function callModalPost(){
    const buttonCreate = document.querySelector('#createPost')
    const body = document.querySelector('body')

    buttonCreate.addEventListener('click', ()=>{
        body.insertAdjacentHTML('beforeend', modalHomePage('Criando novo post', 'Publicar'))
        postModalElements()
        closeModal()
    })
}
callModalPost()

function postModalElements(change = false, idpost){
    const modal = document.querySelector('#modalPosts')
    const publicPost = document.querySelector('#publicPost')
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')


    publicPost.addEventListener('click', async (e)=>{
        e.preventDefault()
        if(title.value == '' || content.value == ''){
            modalInfo('Preencha o campo vázio')
        }else if(!change){
            const obj = {
                title: title.value,
                content: content.value
            }

            const insertPostToApi = await createPost(obj)

            if(insertPostToApi.id){
                modalInfo('Sua postagem foi criada!', true)

                modal.classList.add('opacityAnimation')

                setTimeout(() => {
                    modal.remove()
                    addPost()
                }, 500);
                setTimeout(() => {
                    document.querySelector('#divModal').remove()
                }, 3000);
            }
        }else{
            const obj = {
                title: title.value,
                content: content.value
            }

            const insertPostToApi = await changePost(obj, idpost)

            if(insertPostToApi.id){
                modalInfo('Sua postagem foi Alterada!', true)

                modal.classList.add('opacityAnimation')

                setTimeout(() => {
                    modal.remove()
                    addPost()
                }, 500);
                setTimeout(() => {
                    document.querySelector('#divModal').remove()
                }, 3000);
            }
        }
    })
}

function closeModal(){

    const buttonCloseModal = document.querySelector('#closeModal')
    const buttonCancelModal = document.querySelector('#buttonCancelModal')
    
    const modal = document.querySelector('#modalPosts')

    const buttons = []
    if(buttonCloseModal || buttonCancelModal){
        if(buttonCloseModal){
            buttons.push(buttonCloseModal)
        }
        if(buttonCancelModal){
            buttons.push(buttonCancelModal)
        }
    }
   

    buttons.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault()
            modal.classList.add('opacityAnimation')
    
            setTimeout(() => {
                modal.remove()
            }, 500);
        })
    })
}

function showPost(){
    const buttons = document.querySelectorAll('#buttonAcessPost')
    const body = document.querySelector('body')
    buttons.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            const avatar = e.currentTarget.parentNode.parentNode.children[0].children[0].children[0].children[0].src
            const name = e.currentTarget.parentNode.parentNode.children[0].children[0].children[0].children[0].alt
            const date = e.currentTarget.parentNode.parentNode.children[0].children[0].children[3].innerText
            const title = e.currentTarget.parentNode.parentNode.children[1].children[0].innerText
            const descript = e.currentTarget.parentNode.parentNode.children[1].children[1].innerText

            body.insertAdjacentHTML("afterbegin",showPostModal(avatar, name, date, title, descript))
            
            closeModal()
        })
    })
}