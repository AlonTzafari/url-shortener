"use strict"

document.addEventListener("DOMContentLoaded", onLoad);
async function onLoad() {
    const form = document.querySelector("#url-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const url = form.querySelector("#url_input").value;
        const res = await axios.get( "http://" + window.location.host + "/api/statistic/" + url);
        
        const createdAt = res.data["creationDate"];
        const redirectCount = res.data["redirectCount"];
        const originalUrl = res.data["originalUrl"];

        const createdAtSpan = document.querySelector("#create-date");
        const redirectCountSpan = document.querySelector("#redirect-count");
        const originalUrlSpan = document.querySelector("#original-url");

        createdAtSpan.innerText = createdAt;
        redirectCountSpan.innerText = redirectCount;
        originalUrlSpan.innerText = originalUrl;
    });
}
