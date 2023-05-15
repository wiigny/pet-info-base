import { getLocalStorage } from '../scripts/localStorage.js'
async function getPostApi(obj){
    const options = {
        headers: {
            'Authorization': `Bearer ${obj.token}`
        }
    }
   
    const response = await fetch('http://localhost:3333/posts', options)

    const responseJson = await response.json()

    return responseJson
}

async function getUser(key){
    const options = {
        headers: {
            'Authorization': `Bearer ${key.token}`
        }
    }
   
    const response = await fetch('http://localhost:3333/users/profile', options)

    const responseJson = await response.json()

    return responseJson
}

async function registerUser(data){

    const body = JSON.stringify(data)

    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: body
    }
    try{
        const response = await fetch('http://localhost:3333/users/create', options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }

}

async function loginApi(data){

    const body = JSON.stringify(data)

    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: body
    }
    
    try{
        const response = await fetch('http://localhost:3333/login', options)

        const responseJson = await response.json()

        return responseJson 

    }catch(error){
        console.log(error)
    }

}

async function createPost(data){
    const objectBody = JSON.stringify(data)

    const key = getLocalStorage()

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${key.token}`
        },
        body: objectBody
    }

    const response = await fetch('http://localhost:3333/posts/create', options)

    const responseJson = await response.json()

    return responseJson
}

async function changePost(data, idPost){
    const objectBody = JSON.stringify(data)

    const key = getLocalStorage()

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${key.token}`
        },
        body: objectBody
    }

    const response = await fetch(`http://localhost:3333/posts/${idPost}`, options)

    const responseJson = await response.json()

    return responseJson
}

async function deletePost(key, id){
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${key.token}`
        }
    }

    const response = await fetch(`http://localhost:3333/posts/${id}`, options)

    const responseJson = await response.json()

    return responseJson
}

export {getUser ,createPost, loginApi, registerUser, getPostApi, changePost, deletePost}