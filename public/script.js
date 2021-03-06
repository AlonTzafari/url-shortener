"use strict"

document.addEventListener("DOMContentLoaded", onLoad);
async function onLoad() {
    const form = document.querySelector("#url-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const url = form.querySelector("#url_input").value;
        const res = await axios.post( "http://localhost:3000/api/shorturl/new", {url} );
        const shortUrl = res.data.short_url;
        const outputDiv = document.querySelector(".output-container");
        outputDiv.innerHTML = "";
        const shortUrlElement = document.createElement("a");
        shortUrlElement.innerText = shortUrl;
        shortUrlElement.href = shortUrl;
        shortUrlElement.id = "url-output";

        const copyBtn = document.createElement("button");
        copyBtn.innerText = "COPY";
        copyBtn.classList.add("copy-button");

        outputDiv.append(shortUrlElement, copyBtn);
    });
}


{/* <div class="output-container">
<a id = "url-output" href="">shorturl.com</a>
<button>COPY</button>
</div> */}