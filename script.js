
var form = document.getElementById("myform");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var search = document.getElementById("search").value;

  fetch("https://api.github.com/users/" + search)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`<br><br><br><p style=" text-align: center;
        color: white;
        text-transform: uppercase;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;">User not found!!</p>`);
      }
      return result.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById("result").innerHTML = `
      <link rel="stylesheet" href="style.css" />
      <div class="java">
       <a target="_blank" href="https://github.com/${data.login}"> <img src="${data.avatar_url}" alt="${data.login}" class="avatar"></a>
        <h2>${data.login}</h2>
        <p>Name: ${data.name}</p>
        <p>Location: ${data.location || "Not specified"}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Public Repositories: ${data.public_repos}</p>
        </div>
      `;
    })
    .catch(error => {
      document.getElementById("result").innerHTML = `<p class="error">${error.message}</p>`;
    });
});