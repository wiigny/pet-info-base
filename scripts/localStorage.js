export function getLocalStorage(){
    const user = JSON.parse(localStorage.getItem('user')) || ""

    return user
}