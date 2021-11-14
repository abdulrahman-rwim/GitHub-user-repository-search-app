const input = document.getElementById("input");
const getBtn = document.querySelector(".repositories__btn");
const repositoriesData = document.querySelector(".repositories__data");
const getRepositories = () => {
  if (input.value == "") {
    repositoriesData.innerHTML = `<p>please write github user name</p>`;
  } else {
    const url = `https://api.github.com/users/${input.value}/repos`;
    fetch(url)
      .then((response) => response.json())
      .then((repositories) => {
        repositoriesData.innerHTML = "";
        repositories.forEach((repo) => {
          const repoUrl = `<div class="repositories__repo">
          <div>
          <a
            target="_blank"
            href="https://github.com/${input.value}/${repo.name}"
            >${repo.name}</a
          >
          <p class="repositories__description">
           ${repo.description === null ? "" : repo.description}
          </p>
          <div class="repositories__info">
            <span class="repositories__language"
              ><i class="fas fa-circle icon icon-c"></i>${
                repo.language === null ? "" : repo.language
              }</span
            >
            <span class="repositories__forks"
              ><i class="fas fa-code-branch icon"></i> ${
                repo.forks_count === null ? "" : repo.forks_count
              }</span
            >
            <span class="repositories__date"
              ><i class="far fa-calendar-alt icon"></i> ${repo.created_at.slice(
                0,
                -10
              )}</span
            >
          </div>
        </div>
        <div class="repositories__repo--star icon">
          <i class="far fa-star"></i> ${repo.stargazers_count}
        </div>
      </div>`;
          repositoriesData.insertAdjacentHTML("afterbegin", repoUrl);
        });
      });
  }
};
getBtn.onclick = function () {
  getRepositories();
};
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") getRepositories();
});
