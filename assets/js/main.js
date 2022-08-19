//obtener el formulario
const form = document.getElementById('form')
//obtener la barra de busqueda
const search = document.getElementById('search')
//obtener perfil  del usuario
const userCard = document.getElementById('usercard')

// Escuchar el evento submit del form

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const username = search.value
    getUserData(username)
    search.value = ""
})

// obtener la info del usuario en github

async function getUserData(username){
    const API = 'https://api.github.com/users/'
    
    try{
        
        const userRequest = await fetch(API + username);
        
        if(!userRequest.ok){
            throw new Error(userRequest.status)
        }
        
        const userData = await userRequest.json();
        
        if(userData.public_repos){
        const reposRequest = await fetch(API + username + "/repos");
        const reposData = await reposRequest.json();
        userData.repos = reposData;
    }

    showUserData(userData)

    }catch(error){
      showError(error.message);
    }
}


// función para componer el HTML

function showUserData(userData){

    const userContent = `
    <img src="${userData.avatar_url}" alt="Avatar">
    <h1>${userData.name}</h1>
    <p>${userData.bio}</p>
    
    <div class="data">
        <ul>
            <li>Followers: ${userData.followers}</li>
            <li>Following: ${userData.following}</li>
            <li>Repos: ${userData.public_repos}</li>
        </ul>
    </div>
`;

    // if (userData.repos) {
    //     userContent += `<div class="repos">`
    
    //     userData.repos.slice(0, 7).forEach(repo => {
    //         userContent += `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`
    //     })
    
    //     userContent += `</div>`;
    //   }
    
    
    userCard.innerHTML = userContent;
}

//función para gestionar los errores 
function showError(){

}


/*<img src="${userData.avatar_url}" alt="">
<h1>${userData.name}</h1>
<p>${userData.bio}</p>
<div class="data">
    <ul>
        <li>Followers: ${userData.followers}</li>
        <li>Following: ${userData.following}</li>
        <li>Repositories: ${userData.public_repos}</li>
    </ul>
</div> */