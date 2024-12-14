function populateTweetCard(data) {
    document.getElementById("profile-img").src = data.profileImage;
    document.getElementById("name").innerText = data.name;
    document.getElementById("username").innerText = `@${data.username}`;
    document.getElementById("x-post").innerText = data.text;
}

// Function to fetch tweet data from backend
/*
async function fetchTweetData(tweetUrl) {
    const response = await fetch(`/tweet?tweetUrl=${encodeURIComponent(tweetUrl)}`);
    return await response.json(); // Return the JSON response from backend
}*/

//const tweetUrl = "https://x.com/AlexHormozi/status/1866358010244956492";
//fetchTweetData(tweetUrl).then(data => populateTweetCard(data));


const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const username = urlParams.get('username');
    const profileImage = urlParams.get('profileImage');
    const text = urlParams.get('text');