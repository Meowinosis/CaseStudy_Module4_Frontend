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
