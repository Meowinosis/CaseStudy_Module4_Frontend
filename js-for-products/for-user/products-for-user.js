async function showAllCategoryForUserPage(){
    axios.get('http://localhost:8080/categories')
        .then(function (response) {
                let listCate = response.data;

                let html = ``;
                for (let i = 0; i < listCate.length; i++) {

                    html += `
             <li class="main-nav-list" style="cursor: pointer">
            <a data-toggle="collapse" onclick="searchByCateForUser(${listCate[i].id})" aria-expanded="false" aria-controls="fruitsVegetable">
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

function searchByCateForUser(id){
        axios.post('http://localhost:8080/products/searchByCategory',[id])


            .then(async function (response) {
                let products = response.data;
                let html = `

    <div class="container">
    <div class="row">
      <div class="col-xl-3 col-lg-4 col-md-5">

        <div class="sidebar-categories">
          <div class="head"  >Browse Categories</div>
          
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
                <li class="filter-list"><input class="pixel-radio" type="radio" id="apple" name="brand"><label for="apple">Orient<span>(29)</span></label></li>

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
         <div class="col-xl-9 col-lg-8 col-md-7">
        <!-- Start Filter Bar -->
        <div class="filter-bar d-flex flex-wrap align-items-center">
          <div class="sorting">
            <select>
              <option value="1">Default sorting</option>
              <option value="1">Default sorting</option>
              <option value="1">Default sorting</option>
            </select>
          </div>
          <div class="sorting mr-auto">
            <select>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
            </select>
          </div>
          <div class="pagination">
            <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
            <a href="#">6</a>
            <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
     
        <section class="lattest-product-area pb-40 category-list">
          <div class="row"
          >
`
                for (let i = 0; i < products.length; i++) {
                    html += `
                 <div class="col-lg-4 col-md-6">
              <div class="single-product">
                IMage
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
        </section>
        <!-- End Best Seller -->
        <!-- Start Filter Bar -->
        <div class="filter-bar d-flex flex-wrap align-items-center">
          <div class="sorting mr-auto">
            <select>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
              <option value="1">Show 12</option>
            </select>
          </div>
          <div class="pagination">
            <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
            <a href="#" class="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
            <a href="#">6</a>
            <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
          </div>
        </div>
        <!-- End Filter Bar -->
      </div>
    </div>
  </div>
    `;
                await showAllCategoryForUserPage();
                document.getElementById("main").innerHTML = html;
            })



}