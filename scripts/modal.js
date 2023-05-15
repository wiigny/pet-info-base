import { getLocalStorage } from "./localStorage.js"
import { getUser } from "./api.js"

function modalInfo(type,post = false, del = false){
    const created = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../../index.html">Acessar página de login</a> ou espere 5 segundos'

    const body = document.querySelector('body')
    body.insertAdjacentHTML('beforeend',`
        <div id="divModal" class="dspl-flex gap20 flex__direc-column">
            <div class="dspl-flex align__items-center gap20">
                ${checkType(type,created,post,del)}
            </div>
            <p class="text5 font-w400">${type}</p>
        </div>
    `)
}
function checkType(type,string,post, del){

    if(post){
        return`<div>
                    <img src="../../assets/vector/picwish.png">
                </div>
                <p class="text4 font-w500 sucess100">Postagem criada com sucesso!</p>
            `
    }else if(del){
        return `<div>
                    <img src="../../assets/vector/picwish.png">
                </div>
                <p class="text4 font-w500 alert100">Post deletado com sucesso!</p>
        `
    }else if(type !== string){
        return `<div>
                    <img src="../../assets/vector/false.png">
                </div>
                <p class="text4 font-w500 alert100">Algo Errado!</p>
        `
    }else{
        return`<div>
                    <img src="../../assets/vector/picwish.png">
                </div>
                <p class="text4 font-w500 sucess100">Sua conta foi criada com sucesso!</p>
            `
    }
}




function modalHomePage(title,button, del = false, heading, buttonName){

    const modal = `
    <section id="modalPosts" class="dspl-flex justy__cont-center pTop50">
        <article class="dspl-flex flex__direc-column gap50">
            <div class="dspl-flex justy__cont-SB align__items-center">
                <h3>${title}</h3>
                <button id="closeModal" class="text4 font-w500 gray400 button3" style="padding: 4px 12px;">x</button>
            </div>
            ${formOrDelete(del,button, heading, buttonName)}
        </article>
    </section>
    `
    return modal
}


function formOrDelete(del,button, heading = '', buttonName = 'publicPost'){
    if(del == true){
        return `
        <div class="dspl-flex flex__direc-column gap20">
            <p class="title2 font-w500">Tem certeza que deseja excluir este post?</p>
            <p class="text4 font-w400 gray300">Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</p>
            <div class="dspl-flex mTop20 gap20">
                <button id="buttonCancelModal" class="text4 font-w500 gray400 button3">Cancel</button>
                <button type="submit" id="deletePost" class="button5 text4 gray900 font-w500">${button}</button>
            </div>
        </div>
        `
    }else{
        return `
            <form action="" class="dspl-flex flex__direc-column justy__cont-SB gap30">
                <div class="dspl-flex flex__direc-column gap10">
                    <label for="title">Título do post</label>
                    <input type="text" id="title" class="input1" value="${heading}" placeholder="Digite o título aqui...">
                </div>
                <div class="dspl-flex flex__direc-column gap10">
                    <label for="content">Conteúdo do post</label>
                    <textarea name="text" id="content" class="input1 font-w500 text5 gray100 font-family1" cols="20" rows="4" wrap="hard" spellcheck placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
                </div>
                <div class="dspl-flex gap20 justy__cont-end">
                    <button id="buttonCancelModal" class="text4 font-w500 gray400 button3">Cancelar</button>
                    <button type="submit" id="${buttonName}" class="button1 text4 gray900 font-w500">${button}</button>
                </div>
            </form>
        `
    }
}






async function modalPost(obj){

    const modal = `

    <article id="${obj.id}" class="dspl-flex flex__direc-column gap20">
        <div class="dspl-flex justy__cont-SB align__items-center">
            <div class="dspl-flex align__items-center gap10">
                <div class="boxImg">
                    <img src="${obj.user.avatar}" alt="${obj.user.username}" id="imgUser">
                </div>
                <h4 id="nameUser" class="text5 font-w500 gray100">${obj.user.username}</h4>
                <span class="gray600">|</span>
                <p id="dataPublic" class="gray400 font-w500 text5">${dateTreated(obj.createdAt)}</p>
            </div>

            ${await postIsUser(obj.user.username)}
        </div>

        <div class="dspl-flex flex__direc-column gap20">
            <h2 id="titlePost" class="title2 font-w600">${obj.title}</h2>
            
            <p id="descriptionPost" class="text4 font-w400 gray300">${obj.content}</p>

            <button id="buttonAcessPost" class="button4 text4 font-w500">Acessar publicação</button>
        </div>

    </article>
    `

    return modal
}
function dateTreated(elt){
    const date = new Date(elt)
    const mounth = date.toLocaleString('default',{ month:"long"})
    const year = date.getFullYear()

    return `${mounth.charAt(0).toUpperCase() + mounth.substring(1)} de ${year}`
}

async function postIsUser(objUsername){
    const user = await getUser(getLocalStorage())

    if(user.username == objUsername){
        return ` <div>
                    <button id="editPost" class="button2 text5 font-w500" style="padding: 3px 6px;">Editar</button>
                    
                    <button id="deletPost" class="button3 text5 font-w500" style="padding: 3px 6px;">Excluir</button>
                </div>`
    }
    return ''
}


function showPostModal(avatar, name, date ,title, descript){
    const modal = `
    <section id="modalPosts" class="dspl-flex justy__cont-center pTop50">
        <article class="dspl-flex flex__direc-column gap40">
            <div class="dspl-flex justy__cont-SB align__items-center">
                <div class="dspl-flex align__items-center gap10">
                    <div class="boxImg">
                        <img src="${avatar}" alt="${name}" id="imgUser">
                    </div>
                    <h4 id="nameUser" class="text5 font-w500 gray100">${name}</h4>
                    <span class="gray600">|</span>
                    <p id="dataPublic" class="gray400 font-w500 text5">${date}</p>
                </div>
                <button id="closeModal" class="text4 font-w500 gray400 button3" style="padding: 4px 12px;">x</button>
            </div>
            <div class="dspl-flex flex__direc-column gap20">
                <h2 class="title2 font-w500">${title}</h2>
                <p class="tex4 font-w400 gray300">${descript}</p>
            </div>
            
        </article>
    </section>
    `
    return modal
}

export { modalInfo,modalHomePage, modalPost ,showPostModal} 