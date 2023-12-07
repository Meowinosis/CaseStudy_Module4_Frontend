async function getAllImage(idProduct){
    let images = ``
     await axios.get('http://localhost:8080/product_images/search/' + idProduct)
        .then(function (response) {
            let list = response.data;
            for (let i = 0; i < list.length; i++) {
                images += `<input type="image" src="${list[i].image}" value="${list[i].id}" alt="" style="width: 300px;height: 200px;object-fit: cover">`
            }
        })
    document.getElementById("test-web").innerHTML= images;
}
// getAllImage(1);
function getOneImage(idProduct){
    let img = ``;
    return axios.get('http://localhost:8080/product_images/search/' + idProduct)
        .then(function (response) {
            let images = response.data;
            document.getElementById("product_" + idProduct).innerHTML = `<img src="${images[0].image}"   class="img-fluid" alt="" style="height: 200px;width: 200px;object-fit: cover">`
            // return images[1].image
        })
}



