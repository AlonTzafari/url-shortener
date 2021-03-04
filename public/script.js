"use strict"

document.addEventListener("DOMContentLoaded", onLoad);
async function onLoad() {
    const form = document.querySelector("#url-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const url = form.querySelector("#url_input").value;
        const res = await axios.post( "http://localhost:3000/api/shorturl/new", {url} );
    });
}