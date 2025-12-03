const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const catButtons = document.querySelectorAll(".cat-btn");
const emojiSpan = document.querySelector("span");

const categoryEmoji = {
    Any: "😂",
    Programming: "💻",
    Misc: "🎭",
    Pun: "🤪",
    Dark: "🌑",
    Spooky: "👻"
};

let selectedCategory = "Any";

async function getJoke() {
    jokeContainer.classList.remove("fade");
    jokeContainer.textContent = "Loading...";

    const url = `https://v2.jokeapi.dev/joke/${selectedCategory}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.type === "single") {
            jokeContainer.textContent = data.joke;
        } else {
            jokeContainer.textContent = `${data.setup} ... ${data.delivery}`;
        }

        emojiSpan.textContent = categoryEmoji[selectedCategory];

        jokeContainer.classList.add("fade");

    } catch (err) {
        jokeContainer.textContent = "Oops! Could not fetch a joke.";
        console.error(err);
    }
}

catButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.cat;

        catButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        emojiSpan.textContent = categoryEmoji[selectedCategory];

        getJoke();
    });
});

getJoke();