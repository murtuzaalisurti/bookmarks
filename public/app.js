document.querySelector("input").addEventListener("change", (e) => {
    let iframe = document.querySelector("iframe");
    iframe.style = '';
    let style_link = document.createElement("link");
    style_link.rel = "stylesheet";
    style_link.href = "styles.css";
    iframe.contentDocument.head.appendChild(style_link);

    let file = document.querySelector("#upload").files[0];

    let data_of_form = new FormData();
    data_of_form.append("file.html", file);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: data_of_form
    }).then((response) => {
        console.log(response);
        return response.json()
    }).then((data) => {
        console.log(data);
        display();
    }).catch((error) => {
        console.log(error);
    })
})
function display() {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: { data: [] }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        const bk_categories = [[data[0].categories[0].name, data[0].categories[0].level]];
        let container = document.querySelector("iframe").contentWindow.document.querySelector(".container");
        data.forEach((bookmark) => {
            // let present = false;
            /*for (let i = 0; i < bookmark.categories.length; i++) {
                for (let j = 0; j < bk_categories.length; j++) {
                    if (bookmark.categories[i].name == bk_categories[j][0]) {
                        present = true;
                        break;
                    } else {
                        present = false;
                    }
                }
                if (present) {
                    continue;
                } else {
                    bk_categories.push([bookmark.categories[i].name, bookmark.categories[i].level]);
                }
            }*/
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
            container.appendChild(a_bk);
            document.querySelector(".download_contain").style = '';

        })
        // document.body.appendChild(container);
        /*console.log(bk_categories);
        let max = 0;
        for (let k = 0; k < bk_categories.length; k++) {
            if (bk_categories[k][1] > max) {
                max = bk_categories[k][1];
            }
        }
        console.log(max);
        let element = document.createElement("div");
        element.classList.add("level-1");
        let first_level = '';
        let second_level = '';
        let third_level = '';
        let fourth_level = '';
        let fifth_level = '';

        for (let d = 0; d < max; d++) {
            if (d < (max - 1)) {
                let nest = document.createElement("div");
                nest.classList.add(`level-${d + 2}`);
                element.appendChild(nest);
                if (d == 0) {
                    first_level = element;
                }
                if (d == 1) {
                    second_level = element;
                }
                if (d == 2) {
                    third_level = element;
                }
                if (d == 3) {
                    fourth_level = element;
                    fifth_level = nest;
                }
                if (d != (max - 2)) {
                    element = nest;
                }
            } else {
                break;
            }
        }
        console.log(first_level);
        console.log(second_level);
        console.log(third_level);
        console.log(fourth_level);
        console.log(fifth_level);*/

    }).catch((error) => {
        console.log(error);
    })
}

document.querySelector("#pdf_download").addEventListener("click", () => {
    var element = document.querySelector("iframe").contentWindow.document.body.querySelector(".container");
    document.querySelector("iframe").contentWindow.print();
})