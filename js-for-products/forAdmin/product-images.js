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
            document.getElementById("product_" + idProduct).innerHTML = `<img src="${images[0].image}"   class="img-fluid" alt="" style="height: 180px;width: 200px;object-fit: cover">`
            // return images[1].image
        })
}

function showFormUpdateImage(idProduct){
    let image = ``;
    return axios.get('http://localhost:8080/product_images/search/' + idProduct)
        .then(function (response) {
            let images = response.data;
            image += `
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-images">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" style="color: #007bff;margin-left: 180px;">LIST IMAGE</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
      <div class="modal-body" style="display: flex;justify-content: center;align-items: center;gap: 8px;flex-direction: column">`
            for (let i = 0; i < images.length; i++) {
                image += `
                <img src="${images[i].image}" class="img-fluid" alt="" style="height: 200px;width: 200px;object-fit: cover">                
               
                 <button onclick="removeImage(${images[i].id})" style="background-color: #da5151;border-radius: 4px">Delete</button>    
                `
            }
            image += `
              
                </div>
                <div style="display: flex;border-radius: 4px; justify-content: center;padding-bottom: 8px;">
                <button style="background-color: #007bff;width: 400px" onclick="showFormAddImage()">Add More</button>
                </div>
                <div id="add-image">
                                
                </div>
                <div class="row" style="margin-right: 15px;align-items: center">
                <div class="col-10" id="upload-1" ></div>
                <div class="col-2"><button onclick="addImage(${idProduct})">Commit</button></div>
                
                </div>
                
                
            </div>
          </div>
        </div>`
            document.getElementById("product_" + idProduct).innerHTML = image;
            $("#modal-images").modal("show");
            getOneImage(idProduct)
            // return images[1].image
        })
}
function removeImage(imageId){
    let isConfirm = confirm("Are you sure to delete this image")
    if (isConfirm){
        axios.delete('http://localhost:8080/product_images/delete/' + imageId )
            .then(function (){
                alert("Delete complete")
                showPageForAdmin();
            })
        $("#modal-images").modal("hide");
    }
    else {
        alert("Okie")
    }

}

function showFormAddImage(){
    document.getElementById("add-image").innerHTML = ' <label for="fileButtonUpdate" style="color: indianred">Select New Image : </label><input type="file" multiple="multiple" id="fileButtonUpdate" onchange="uploadImageForProduct(event)"> <input type="hidden" id="image-update" value="">';

}

function addImage(id){
    let image = document.getElementById("image-update").value;
    let product_image = {
        image : image,
        product : {
            id : id
        }
    }
    axios.post('http://localhost:8080/product_images/create', product_image)
        .then(function (response){
            alert("Add complete")
            showPageForAdmin();
        })
    $("#modal-images").modal("hide");

}
function uploadImageForProduct(e) {
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
            document.getElementById('upload-1').innerHTML = `<img src="${downloadURL}" alt="" style="width: 150px;height: 150px">`
            document.getElementById("image-update").value = downloadURL;
        });
}

