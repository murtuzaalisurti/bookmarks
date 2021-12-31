// all this will go into data.forEach((bookmark) => {})

// const bk_categories = [[data[0].categories[0].name, data[0].categories[0].level]];

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