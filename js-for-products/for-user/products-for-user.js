function showPageUser() {
    let page = 0;
    axios.get('http://localhost:8080/products')

        .then(async function (response) {
            let products = response.data;
            let html = `
            
               <div class="container">
               <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-5">
            
                    <div class="sidebar-categories">
                      <div class="head">Browse Categories</div>
                      
                      <ul class="main-categories" id="main_categories">
                      </ul>
                    </div>
            
            <!--        search by brand-->
            
                    <div class="sidebar-filter mt-50">
                      <div class="top-filter-head">Product Filters</div>
                      <div class="common-filter">
                        <div class="head">Brands</div>
                        <form action="#">
                          <ul>
                            <li class="filter-list"><input class="pixel-radio" type="radio" id="apple" name="brand">
                            <label for="apple">Orient<span>(29)</span></label></li>
            
                          </ul>
                        </form>
                      </div>
            
                        <div class="common-filter">
                        <div class="head">Price</div>
                        <div class="price-range-area">
                          <div id="price-range"></div>
                          <div class="value-wrapper d-flex">
                            <div class="price">Price:</div>
                            <span>$</span>
                            <div id="lower-value"></div>
                            <div class="to">to</div>
                            <span>$</span>
                            <div id="upper-value"></div>
                          </div>
                        </div>
                        </div>
                      
                      
                    </div>
                     </div>
                <div class="col-xl-9 col-lg-8 col-md-7" style="background-color: #ececec;padding: 0;">
                    <!-- Start Filter Bar -->        
                 <div class="filter-bar d-flex flex-wrap align-items-center">
                      <div class="sorting">
                        <select style="height: 32px" id="sortProduct" onchange="sortUp()">
                          <option selected value="0">Default sorting</option>
                          <option value="1">Asc sorting</option>
                          <option value="2">Desc sorting</option>
                        </select>
                      </div>
                      
                      <div class="sorting mr-auto">
                        <select style="height: 32px">
                          <option value="1">Show 6</option>
                    
                        </select>
                      </div>
                      
                      <div class="pagination" id="pagination">
                  
                    </div>
                    </div>
                 
                <section class="lattest-product-area pb-40 category-list">
               <div  id="show-page">
   
            </div> 
         
            </section>


      </div>
    </div>
  </div>
    `;
            await showAllCategoryForUserPage();
            // showAllProductForUser();
            document.getElementById("main").innerHTML = html;
            sortUp()
        })
}
showPageUser();


function addToCart(id) {
    // if (getCurrentUser()) {
    let existingList = sessionStorage.getItem('cart-list');
    let updatedList = existingList ? JSON.parse(existingList) : [];
    var productIdToCheck = id;
    var existingProductIndex = updatedList.findIndex(function (item) {
        return item.id === productIdToCheck;
    });
    if (existingProductIndex === -1) {
        let newItem = { id: id, quantity: 1 };
        updatedList.push(newItem);
    }
    else {
        updatedList[existingProductIndex].quantity += 1;
    }
    sessionStorage.setItem('cart-list', JSON.stringify(updatedList));
    // }
    // else {
    //   alert("chua dang nhap");
    // }
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem("current-user"));
}

async function showAllCategoryForUserPage(){
    axios.get('http://localhost:8080/categories')
        .then(function (response) {
                let listCate = response.data;

                let html = ``;
                for (let i = 0; i < listCate.length; i++) {

                    html += `
             <li class="main-nav-list" style="cursor: pointer;color: #0b0b0b">
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
                    <h6 class="l-through">$${products[i].price*1.2}</h6>
                  </div>
                  <div class="prd-bottom">

                    <a href="javascript:" onclick="addToCart(${products[i].id})" class="social-info">
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

async function sortUp(page =0) {

    const size = 6;
    const sorts = ['','asc','desc'];

    let sort=document.getElementById("sortProduct").value;
    axios.get('http://localhost:8080/products/showAll', {
        params:{
            page: page,
            size: size,
            sortOrder: sorts[sort]
    }})
        .then(function (response) {
            let products = response.data.content;
            let pagination = "";
            if (page > 0) {
                pagination += `<a href="javascript:" onClick="sortUp(${page - 1})" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>`
            }
            for (let i = 0; i < response.data.totalPages; i++) {
                pagination += `<a href="javascript:" class="${(page === i) ? 'active' : ''}" onClick="sortUp(${i})">${i + 1}</a>`
            }
            if (page < response.data.totalPages - 1) {
                pagination += `<a href="javascript:" onClick="sortUp(${page + 1})" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>`
            }
            document.getElementById("pagination").innerHTML = pagination;


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
                    <h6 class="l-through">$${products[i].price * 1.2}</h6>
                  </div>
                  <div class="prd-bottom">

                   <a href="javascript:" onclick="addToCart(${products[i].id})" class="social-info">
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
            // await showAllCategoryForUserPage();
            document.getElementById("show-page").innerHTML = html;

        })
}
// sortUp();
