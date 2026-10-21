
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");
const userContainer = document.getElementById("userContainer");

let users = [];

async function fetchUsers() {
    status.textContent = "Loading users...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve user data");
        }

        users = await response.json();

        displayUsers(users);
        status.textContent = `Loaded ${users.length} users successfully.`;
    } catch (error) {
        status.textContent =
            "Unable to load users. Check your internet connection and try again.";
        console.error("Error:", error);
    }
}

function displayUsers(userList) {
    userContainer.innerHTML = "";

    if (userList.length === 0) {
        userContainer.innerHTML = "<p>No users found.</p>";
        return;
    }

    userList.forEach((user) => {
        const card = document.createElement("article");
        card.className = "user-card";

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        card.append(name, email, city, company);
        userContainer.appendChild(card);
    });
}

function filterUsers() {
    const query = searchInput.value.trim().toLowerCase();

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(query) ||
            user.address.city.toLowerCase().includes(query)
        );
    });

    displayUsers(filteredUsers);
    status.textContent = `${filteredUsers.length} user(s) found.`;
}

searchBtn.addEventListener("click", filterUsers);

searchInput.addEventListener("input", filterUsers);

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    displayUsers(users);
    status.textContent = `Showing all ${users.length} users.`;
});

fetchUsers();
