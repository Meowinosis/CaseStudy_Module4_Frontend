function showPageForAdmin() {
    axios.get('http://localhost:8080/products')

        .then(async function (response) {
            let products = response.data;
            let html = `
            <div class="t-body">
            <h2 style="text-align: center;margin-bottom: 40px;color: saddlebrown">PRODUCT MANAGER</h2>
    <div class="nav" style="justify-content: center" >
    
    <br>
        <div class="left-nav">
<!--            <button class="btn btn-info btn-round" onclick="getAll()">Home</button>-->
            <button style="margin-right: 20px" class="btn btn-info btn-round" onclick="showFormCreate()">Create</button>
        </div>
        <div class="right-nav">
            <input type="text" placeholder="Search" id="q">
            <button class="btn btn-info btn-round" onclick="search()">Search</button>
        </div>
        
        
    </div>
    <div id="searchCategory">
        </div>
    <br>
         <div class="main-admin">
            <table border="1" style="margin-top: 20px">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>         
            <th colspan="2">Image</th>
             <th>Description</th>
             <th>Manufacture</th>
             <th>Category</th>
            <th colspan="2">Action</th>
        </tr>
            `;
            for (let i = 0; i < products.length; i++) {
                html += `
                <tr>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].quantity}</td>
            <td id="product_${products[i].id}" style="height: 180px;width: 210px" </td>
            <td style="width: 80px"><button onclick="showFormUpdateImage(${products[i].id})" class="btn btn-info btn-round" style="font-size: 10px">Update Image</button></td>
            <td>${products[i].description}</td>
            <td>${(products[i].manufacture)}</td>
            <td>${(products[i].category.name)}</td>
            
            <td>
                <button class="btn btn-info btn-round" onclick="getFormUpdateProduct (${products[i].id},${products[i].category.id})">Edit</button>
            </td>
            <td>
                <button class="btn btn-info btn-round" onclick="removeProduct(${products[i].id})">Delete</button>
            </td>
        </tr> `;
                 getOneImage(products[i].id)
            }
            html += `  </table>
            </div>
             </div>
`
            document.getElementById("main").innerHTML = html;
            showAllCategory();
        })
}

// showPageForAdmin();


function removeProduct(id){
    let isConfirm = confirm("Are you sure to delete this product??");
    if (isConfirm){
        axios.delete('http://localhost:8080/products/delete/' + id )
            .then(function () {
                alert("Delete Complete")
                showPageForAdmin();
            })
    } else {
        alert("What the hell??")
    }

}

function search(){
let name = document.getElementById("q").value;
    console.log(name)
if (name === ""){
    showPageForAdmin();
}else {
    axios.get('http://localhost:8080/products/search?name='+ name)

        .then(function (response) {
            let products = response.data;
            console.log(response.data)
            let html = `
            <div class="t-body">
            <h2 style="text-align: center;margin-bottom: 10px">PRODUCT MANAGER</h2>
    <div class="nav" style="justify-content: center" >
    
    <br>
        <div class="left-nav">
<!--            <button class="btn btn-info btn-round" onclick="getAll()">Home</button>-->
            <button style="margin-right: 20px" class="btn btn-info btn-round" onclick="showFormCreate()">Create</button>
        </div>
        <div class="right-nav">
            <input type="text" placeholder="Search" id="q">
            <button class="btn btn-info btn-round" onclick="search()">Search</button>
        </div>
        <div id="searchClass">
        </div>
    </div
    <br>
         <div class="main-admin">
            <table border="1" style="margin-top: 20px">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>         
            <th>Image</th>
             <th>Description</th>
             <th>Manufacture</th>
             <th>Category</th>
            <th colspan="2">Action</th>
        </tr>
            `;
            for (let i = 0; i < products.length; i++) {
                html += `
                <tr>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].quantity}</td>
            <td id="product_${products[i].id}"></td>
            <td>${products[i].description}</td>
            <td>${(products[i].manufacture)}</td>
            <td>${(products[i].category.name)}</td>
            
            <td>
                <button class="btn btn-info btn-round" onclick="getFormUpdateProduct (${products[i].id},${products[i].category.id})">Edit</button>
            </td>
            <td>
                <button class="btn btn-info btn-round" onclick="removeProduct(${products[i].id})">Delete</button>
            </td>
        </tr> `;
                getOneImage(products[i].id)
            }
            html += `  </table>
            </div>
             </div>
`
            document.getElementById("main").innerHTML = html;
        })
}

}

function searchByCategory(){
let arr = [];
let categories = document.getElementsByClassName("categories_id");
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].checked){
            arr.push(categories[i].value);
        }
    }
    if (arr.length === 0){
        showPageForAdmin();
    }
    else {
        axios.post('http://localhost:8080/products/searchByCategory',arr)
            .then(function (response) {
                let products = response.data;
                let html = `
            <div class="t-body">
            <h2 style="text-align: center;margin-bottom: 40px;color: saddlebrown">PRODUCT MANAGER</h2>
    <div class="nav" style="justify-content: center" >
    
    <br>
        <div class="left-nav">
<!--            <button class="btn btn-info btn-round" onclick="getAll()">Home</button>-->
            <button style="margin-right: 20px" class="btn btn-info btn-round" onclick="showFormCreate()">Create</button>
        </div>
        <div class="right-nav">
            <input type="text" placeholder="Search" id="q">
            <button class="btn btn-info btn-round" onclick="search()">Search</button>
        </div>
        
        
    </div>
    <div id="searchCategory">
        </div>
    <br>
         <div class="main-admin">
            <table border="1" style="margin-top: 20px">
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>         
            <th>Image</th>
             <th>Description</th>
             <th>Manufacture</th>
             <th>Category</th>
            <th colspan="2">Action</th>
        </tr>
            `;
                for (let i = 0; i < products.length; i++) {
                    html += `
                <tr>
            <td>${products[i].id}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].quantity}</td>
            <td id="product_${products[i].id}"></td>
            <td>${products[i].description}</td>
            <td>${(products[i].manufacture)}</td>
            <td>${(products[i].category.name)}</td>
            
            <td>
                <button class="btn btn-info btn-round" onclick="getFormUpdateProduct (${products[i].id},${products[i].category.id})">Edit</button>
            </td>
            <td>
                <button class="btn btn-info btn-round" onclick="removeProduct(${products[i].id})">Delete</button>
            </td>
        </tr> `;
                    getOneImage(products[i].id)
                }
                html += `  </table>
            </div>
             </div>
`
                document.getElementById("main").innerHTML = html;
                showAllCategory();
            })
    }
}