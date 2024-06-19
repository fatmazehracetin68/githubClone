const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);

    createUserCard(data);
    getRepos(username);
  } catch (err) {
    createErrorCard("Aradığınız kullanıcı bulunamadı");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = " ";
  }
});

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p> ${user.bio} </p> ` : "";

  const cardHTML = ` <div class="card">
        <img src="${user.avatar_url}" alt="${user.name}" class="user-image" />

        <div class="user-info">
          <div class="user-name">
            <h2>${userName}</h2>
            <small>${user.login}</small>
          </div>
        </div>
        <p>
          ${userBio}
        </p>

        <ul>
          <li><i class="fa-solid fa-user-group"></i>${user.followers}<strong> Followers</strong></li>
          <li><i class="fa-solid fa-plus"></i>${user.following}<strong> Following</strong></li>
          <li><i class="fa-solid fa-bookmark"></i>${user.public_repos}<strong> Repository</strong></li>
        </ul>

        <div class="repos" id="repos">
          <a href="#"><i class="fa-solid fa-bookmark"></i></i>Repo1 </a>
          <a href="#"> <i class="fa-solid fa-bookmark"></i></i>Repo2</a>
          <a href="#"><i class="fa-solid fa-bookmark"></i></i>Repo3</a>
        </div>
      </div>`;
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardErrorHTML = `
    <div class="card">
     <h2>${msg}</h2>
     </div>
    `;
  main.innerHTML = cardErrorHTML;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    addReposToCard(data);
  } catch (err) {
    createErrorCard("Üzgünüm repoları çekerken hata oluştu.");
  }
}

function addReposToCard(repos) {
  const reposElement = document.getElementById("repos");
  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`;

    reposElement.appendChild(reposLink);
  });
}
