async function showFormCreate(){
    document.getElementById("showModal").innerHTML = `
<div class="modal fade" tabindex="-1" role="dialog" id="modal-create">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" style="padding: 10px">
        <h5 class="modal-title" style=" margin-left: 180px;">FORM CREATE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


    <div class="form-create">
        <label for="name">Name : </label><input type="text" id="name" placeholder="Name">
        <label for="birthDay">Price : </label><input type="text" id="price" placeholder="Price">
        <label for="gender">Quantity : </label><input type="number" id="quantity" placeholder="Quantity">
       <div class="row" style="padding: 12px 0">
       
       <div class="col-8">
       <label for="fileButton" style="color: indianred">Image : </label><input type="file" multiple="multiple" id="fileButton" onchange="uploadImage(event)">
        <input type="hidden" id="image" value="">
        <div style="margin-top: 8px"><label for="category" style="color: indianred">Category : </label><select name="category" id="category">${await getAllCategory()}</select>
        </div>
        </div>
        <div class="col-4">
        <div id="imgDiv" style="height: 100%;width: 100%"></div>
        </div>
        
        </div>
        
        <label for="manufacture">Manufacture : </label><input type="text" id="manufacture" placeholder="Manufacture">
        <label for="description">Description : </label><textarea id="description" placeholder="Description"></textarea>
        
        <button onclick="create()" style="background-color: seagreen;margin-top: 24px">Commit</button>
    </div>

      </div>
    </div>
  </div>
</div>
    `
        $("#modal-create").modal("show");
    $("#modal-create").modal("close");
}

function create(){
    let name = document.getElementById("name").value;
    let  price = document.getElementById("price").value;
    let  quantity = document.getElementById("quantity").value;
    let  image = document.getElementById("image").value;
    let  categoryId = document.getElementById("category").value;
    let  manufacture = document.getElementById("manufacture").value;
    let  description = document.getElementById("description").value;

    let product = {
        name: name,
        price: price,
        quantity: quantity,
        category: {
            id: categoryId
        },
        manufacture : manufacture,
        description : description
    } ;
    axios.post('http://localhost:8080/products/create', product)
        .then(function (response) {
            let productId = response.data.id;
            let product_images = {
                image : image,
                product : {
                    id: productId
                }
            }
            axios.post('http://localhost:8080/product_images/create', product_images)
                .then(function (response){
                    showPageForAdmin();
                })
            $("#modal-create").modal("hide");
        })
}

// function uploadImage(e) {
//     let fbBucketName = 'images';
//     let uploader = document.getElementById('uploader');
//     let file = e.target.files;
//     let storageRef;
//     let uploadTask;
//     for (let i = 0; i < file.length; i++) {
//         storageRef = firebase.storage().ref(`${fbBucketName}/${file[i].name}`);
//         uploadTask = storageRef.put(file[i]);
//     }
//
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//         function (snapshot) {
//             uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED:
//                     break;
//                 case firebase.storage.TaskState.RUNNING:
//                     break;
//             }
//         }, function (error) {
//             switch (error.code) {
//                 case 'storage/unauthorized':
//                     break;
//                 case 'storage/canceled':
//                     break;
//                 case 'storage/unknown':
//                     break;
//             }
//         }, function () {
//             let downloadURL = uploadTask.snapshot.downloadURL;
//             console.log(downloadURL)
//             document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="" style="width: 100%;height: 100%">`
//             document.getElementById("image").value = downloadURL;
//         });
// }


function getFormUpdateProduct(id,categoryId){
    axios.get('http://localhost:8080/products/search/' + id)
        .then(async function (response){
            let product = response.data;
            document.getElementById("showModal").innerHTML = `
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-create">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header" style="padding: 10px">
                <h5 class="modal-title" style=" margin-left: 180px;">FORM CREATE</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">


    <div class="form-create">
        <label for="name">Name : </label><input type="text" id="name" placeholder="Name" value="${product.name}">
        <label for="birthDay">Price : </label><input type="text" id="price" placeholder="Price" value="${product.price}">
        <label for="gender">Quantity : </label><input type="number" id="quantity" placeholder="Quantity" value="${product.quantity}">
       <div class="row" style="padding: 12px 0">
       
       <div class="col-8">
        <label for="fileButton" style="color: indianred">Image : </label><input type="file" multiple="multiple" id="fileButton" onchange="uploadImage(event)">
        <input type="hidden" id="image" value="">
        <div style="margin-top: 8px"><label for="category" style="color: indianred">Category : </label><select name="category" id="category">${await getAllCategory()}</select>
        
        </div>
        </div>
        <div class="col-4">
        <div id="imgDiv" style="height: 100%;width: 100%"></div>
        </div>
        
        </div>
        
        <label for="manufacture">Manufacture : </label><input value="${product.manufacture}" type="text" id="manufacture" placeholder="Manufacture">
        <label for="description">Description : </label><textarea id="description" placeholder="Description" >${product.description}</textarea>
        
        <button onclick="update(${product.id})" style="background-color: seagreen;margin-top: 24px">Commit</button>
    </div>

      </div>
    </div>
  </div>
</div>
    `
            $("#modal-create").modal("show");
        })



}

function update(id){
    let name = document.getElementById("name").value;
    let  price = document.getElementById("price").value;
    let  quantity = document.getElementById("quantity").value;
    let  image = document.getElementById("image").value;
    let  categoryId = document.getElementById("category").value;
    let  manufacture = document.getElementById("manufacture").value;
    let  description = document.getElementById("description").value;

    let product = {
        name: name,
        price: price,
        quantity: quantity,
        category: {
            id: categoryId
        },
        manufacture : manufacture,
        description : description
    } ;
    axios.put('http://localhost:8080/products/update/' +id , product)
        .then(function (response) {

            let product_images = {
                image : image,
                product : {
                    id: id
                }
            }
            axios.post('http://localhost:8080/product_images/create', product_images)
                .then(function (response){
                    showPageForAdmin();
                })
            $("#modal-create").modal("hide");

        })
}


function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL)
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="" style="width: 150px;height: 150px">`
            document.getElementById("image").value = downloadURL;
        });
}

