let files = 0;
document.querySelector("input").addEventListener("change", (e) => {
    let iframe = document.querySelector("iframe");
    iframe.style = '';
    let loading = iframe.contentWindow.document.querySelector(".loading");
    loading.style = '';
    let style_link = document.createElement("link");
    style_link.rel = "stylesheet";
    style_link.href = "styles.css";
    let cdn_link = document.createElement("link");
    cdn_link.rel = "stylesheet";
    cdn_link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    cdn_link.setAttribute("integrity", "sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==")
    cdn_link.setAttribute("crossorigin", "anonymous");
    cdn_link.setAttribute("referrerpolicy", "no-referrer");
    iframe.contentDocument.head.appendChild(style_link);
    iframe.contentDocument.head.appendChild(cdn_link);

    let file = document.querySelector("#upload").files[0];

    let data_of_form = new FormData();
    data_of_form.append("file.html", file);

    fetch(`${window.location.href}upload`, {
        method: 'POST',
        body: data_of_form
    }).then((response) => {
        return response.json()
    }).then((data) => {
        display();
    }).catch((error) => {
        console.log(error);
    })
})
function display() {
    fetch(`${window.location.href}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: { data: [] }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let bookmarks_container = document.querySelector("iframe").contentWindow.document.querySelector(".bookmarks");
        let loading = document.querySelector("iframe").contentWindow.document.querySelector(".loading");
        loading.style = 'display: none; z-index: -1;';
        data.forEach((bookmark) => {
            let a_bk = document.createElement("div");
            a_bk.className = "bookmark";
            let title = document.createElement("div");
            title.className = "title";
            let link = document.createElement("a");
            link.setAttribute("href", bookmark.url);
            link.innerText = bookmark.title;
            title.appendChild(link);
            a_bk.appendChild(title);
            let categories = document.createElement("div");
            categories.className = "categories";
            for (let b = 0; b < bookmark.categories.length; b++) {
                let category = document.createElement("div");
                category.className = "category";
                category.innerText = bookmark.categories[b].name;
                categories.appendChild(category);
            }
            a_bk.appendChild(categories);
            bookmarks_container.appendChild(a_bk);
            
        })
        document.querySelector(".download_contain").style = '';
        files++;
        if(files > 0){
            if(files == 1){
                document.querySelector("#upload-label").innerHTML = 'Add another file<i class="fas fa-upload"></i>';
                document.querySelector(".uploaded-files").innerHTML = `${files} file added`;
            } else {
                document.querySelector(".uploaded-files").innerHTML = `${files} files added`;
            }
        }
    }).catch((error) => {
        console.log(error);
        document.querySelector("iframe").contentWindow.document.querySelector(".loading").style = 'display: none; z-index: -1;';
    })
}

document.querySelector("#pdf_download").addEventListener("click", () => {
    document.querySelector("iframe").contentWindow.print();
})