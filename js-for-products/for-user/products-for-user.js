// pageable?limit=6&page=3
function showAllProductForUser(page = 0) {
    axios.get(`http://localhost:8080/products/show?page=${page}`)
        .then(async function (response) {
            let products = response.data.content;
            console.log(response.data)
            let pagination= "";
            if(page>0){
                pagination+=`<a href="javascript:" onClick="showAllProductForUser(${page-1})" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>`
            }
            for (let i = 0; i < response.data.totalPages; i++) {
                pagination+=`<a href="javascript:" class="${(page===i)? 'active':''}" onClick="showAllProductForUser(${i})">${i+1}</a>`
            }
            if(page<response.data.totalPages-1){
                pagination+=`<a href="javascript:" onClick="showAllProductForUser(${page+1})" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>`
            }
            document.getElementById("pagination").innerHTML=pagination;


            let html = `
            <div class="row">
            `
            for (let i = 0; i < products.length; i++) {
                html += `
                 <div class="col-lg-4 col-md-6" style="" >
              <div class="single-product" style="margin-left: 8px;border: 1px solid darkgray;
                    display: flex;
                    margin-right: 8px;
                    flex-direction: column;
                    align-content: center;
                    justify-content: center;
                    align-items: center;">
<!--                IMage-->
                <div id="product_${products[i].id}">
             
                </div>
                <div class="product-details">
                  <h6>${products[i].name}
                    </h6>
                  <div class="price">
                    <h6>$${products[i].price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">

                    <a href="" class="social-info">
                      <span class="ti-bag"></span>
                      <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
               </div>       
            `;
                getOneImage(products[i].id)
            }
            html +=
                `
         </div> 
    `;
            await showAllCategoryForUserPage();
            document.getElementById("show-page").innerHTML = html;

        })
}
showAllProductForUser();

async function showAllCategoryForUserPage(){
    axios.get('http://localhost:8080/categories')
        .then(function (response) {
                let listCate = response.data;

                let html = ``;
                for (let i = 0; i < listCate.length; i++) {

                    html += `
             <li class="main-nav-list" style="cursor: pointer">
            <a data-toggle="collapse" onclick="searchByCateForUser(0,${listCate[i].id})" aria-expanded="false" aria-controls="fruitsVegetable">
            <span
                 class="lnr lnr-arrow-right"> 
                 <input type="hidden" value="${listCate[i].id}" class="categories_user">               
            </span>${listCate[i].name}
            <span class="number">(53)</span></a>
            </li>
`
                }
                document.getElementById("main_categories").innerHTML = html;
            }
        )

}

function searchByCateForUser(page = 0,id){
    console.log(id)
        axios.post(`http://localhost:8080/products/searchByCateForUser?page=${page}`,[id])
            .then(async function (response) {
                console.log(response.data)
                let products = response.data.content;
                if(products.length>0){
                    let pagination= "";
                    if(page>0){
                        pagination+=`<a href="javascript:" onClick="searchByCateForUser(${page-1},${id})" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>`
                    }
                    for (let i = 0; i < response.data.totalPages; i++) {
                        pagination+=`<a href="javascript:" class="${(page===i)? 'active':''}" onClick="searchByCateForUser(${i},${id})">${i+1}</a>`
                    }
                    if(page<response.data.totalPages-1){
                        pagination+=`<a href="javascript:" onClick="searchByCateForUser(${page+1},${id})" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>`
                    }
                    document.getElementById("pagination").innerHTML=pagination;


                    let html = `
            <div class="row">
            `
                    for (let i = 0; i < products.length; i++) {
                        html += `
                 <div class="col-lg-4 col-md-6" style="" >
              <div class="single-product" style="margin-left: 8px;border: 1px solid darkgray;
                    display: flex;
                    margin-right: 8px;
                    flex-direction: column;
                    align-content: center;
                    justify-content: center;
                    align-items: center;">
<!--                IMage-->
                <div id="product_${products[i].id}">
             
                </div>
                <div class="product-details">
                  <h6>${products[i].name}
                    </h6>
                  <div class="price">
                    <h6>$${products[i].price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">

                    <a href="" class="social-info">
                      <span class="ti-bag"></span>
                      <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
               </div>       
            `;
                        getOneImage(products[i].id)
                    }
                    html +=
                        `
         </div> 
    `;
                    await showAllCategoryForUserPage();
                    document.getElementById("show-page").innerHTML = html;
                }else
                {
                    document.getElementById("show-page").innerHTML = `<h2>KHÔNG CÓ GÌ ĐÂU BÉ ƠI. TÌM LOẠI KHÁC ĐI !!</h2> `;
                    document.getElementById("pagination").innerHTML="";

                }


            })

}