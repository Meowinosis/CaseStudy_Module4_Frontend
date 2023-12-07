async function getAllCategory(){
    let categories = ``
    await axios.get('http://localhost:8080/categories')
        .then(function (response) {
            let list = response.data;
            for (let i = 0; i < list.length; i++) {
                categories += `<option value="${list[i].id}">${list[i].name}</option> `
            }
        })
    return categories;
}

async function showAllCategory(){
    await axios.get('http://localhost:8080/categories')
        .then(function (response) {
            let listCate = response.data;
            let html = ``;
            for (let i = 0; i < listCate.length; i++) {
                html += `<input type="checkbox" value="${listCate[i].id}" class="categories_id">${listCate[i].name}</input> `
            }
            html += `
            <button class="btn btn-info btn-round" onclick="searchByCategory()" >Commit</button>
           `
            document.getElementById("searchCategory").innerHTML = html;

        } )
}


