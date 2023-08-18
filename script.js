// Get a reference to the form element with the ID "myform"
var form = document.getElementById("myform");

// Add an event listener to the form's "submit" event
form.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the value from the input field with the ID "search" and remove leading/trailing spaces
  var search = document.getElementById("search").value.trim();

  // Check if the search input is empty
  if (search === "") {
    // Display an error message in the "result" element and stop further execution
    document.getElementById("result").innerHTML = "<p>Please enter a valid username.</p>";
    return;
  }

  // Fetch user data from the GitHub API using the search value
  fetch("https://api.github.com/users/" + search)
    .then((response) => {
      // Check if the response status is not OK (HTTP status code other than 200)
      if (!response.ok) {
        // Throw an error if user is not found
        throw new Error(`<div id="notfound">User not found!!</div>`);
      }
      // Convert the response to JSON format
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Display user information in the "result" element using template literals
      document.getElementById("result").innerHTML = `
        <div class="java">
          <a target="_blank" href="https://github.com/${data.login}">
            <img src="${data.avatar_url}" alt="${data.login}" class="avatar">
            <h2>${data.login}</h2>
          </a>
          <div class="javaalign">
            <p>Name: ${data.name || "Not specified"}</p>
            <p>Location: ${data.location || "Not specified"}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>BIO: ${data.bio || "N/A"}</p>
            <p>Public Repositories: ${data.public_repos}</p>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      // Display an error message in the "result" element if an error occurs
      document.getElementById("result").innerHTML = `<p class="error">${error.message}</p>`;
    });
});
