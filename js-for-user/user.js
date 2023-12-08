function showFormLogin() {
    {
        $("#form-Login").modal("hide");
    }
    document.getElementById("form-login-logout").innerHTML =
        `
    <div class="modal fade" id="form-Login" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          
            <div class="login_form_inner" style="padding-top: 30px">
                <h3>Log in to Website</h3>
                <span id="msg" class="text-danger"></span>
                <div class="row login_form" id="contactForm">
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <div class="creat_account">
                            <input type="checkbox" id="f-option2" name="selector">
                            <label for="f-option2">Keep me logged in</label>
                        </div>
                    </div>
                    <div class="col-md-12 form-group">
                        <button class="primary-btn" onclick="login()">Log In</button>
                        <a href="#">Forgot Password?</a>
                        <a href="javascript:" style="color: skyblue" onclick="showFormRegister()">Create Account?</a>
                    </div>
                </div>
                </div>
          
        </div>
      </div>
    </div>
    `
    $("#form-Login").modal("show");
}

function showFormRegister() {
    $("#form-Login").modal("hide");
    document.getElementById("form-login-logout").innerHTML =
        `
    <div class="modal fade" id="form-Login" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="login_form_inner register-modal" style="padding-top: 30px">
                <h3>Register</h3>
                <div class="row login_form">
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="username" name="username" placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Confirm Password'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Full Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Full Name'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="date" class="form-control" id="birthDay" name="birthDay" placeholder="birthDay" onfocus="this.placeholder = ''" onblur="this.placeholder = 'BirthDay'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="address" name="address" placeholder="address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Address'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="phoneNumber" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone Number'">
                    </div>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="email" name="email" placeholder="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'email'">
                    </div>
                    
                    <div class="col-md-12 form-group">
                        <span id="msg" class="text-danger"></span>
                        <button onclick="registerAccount()" class="primary-btn">Register</button>
                        <a href="javascript:" onclick="showFormLogin()"> Have Account <span style="color: skyblue" >Login</span></a>
                    </div>
                </div>
                </div>
          
        </div>
      </div>
    </div>
    `
    $("#form-Login").modal("show");
}

function login() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let user = {
        username: username.value,
        password: password.value
    }
    axios.post("http://localhost:8080/login", user).then(res => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        let roles= res.data.roles;
        const isAdmin = function () {
            for (let i=0;i<roles.length;i++) {
                if (roles[i].authority==="ROLE_ADMIN")
                    return true
            }
            return false;
        }
        if(isAdmin()){
            showPageForAdmin()
        }else {
            showPageUser();
        }
        $("#form-Login").modal("hide");
        showNavbarUser();
    }).catch(err => {
        document.getElementById("msg").innerHTML = "Sai Tài Khoản hoặc mật khẩu"
    })
}

function registerAccount() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let fullName = document.getElementById("fullName").value;
    let birthDay = document.getElementById("birthDay").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let customer = {
        fullName: fullName,
        birthDay: birthDay,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        user: {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }
    }
    axios.post("http://localhost:8080/register", customer)
        .then(function (response) {
            alert("success")
            showFormLogin()
        }).catch(error => {
        document.getElementById("msg").innerHTML = error.response.data;
    })
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
    localStorage.clear();
    showPageUser();
    showNavbarUser()
}

function checkCurrentUser() {
    let flag = true;
    axios.get("http://localhost:8080/customers/" + getCurrentUser().id, {headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
        .then().catch(err => {
        flag = false;
        localStorage.clear();
    })
    return flag;
}

if (getCurrentUser()) {
   if ( checkCurrentUser()){
       showNavbarUser();
   }
}else {
    showNavbarUser();
}

function showCustomerInfo() {
    let user= getCurrentUser();
    console.log(user)
    axios.get("http://localhost:8080/customers/" + user.id, {headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
        .then(response => {
            let customer = response.data;
            let html = "";
            document.getElementById("main").innerHTML =
                `
                <!--================Customer Box Area =================-->
                <section class="login_box_area section_gap">
                    <div class="container customer-info">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="login_form_inner" style=" padding-top: 45px">
                                <h3>Information of <span class="text-info">${customer.user.username}</span></h3>
                                    <div class="row login_form" id="customer-information">
                                        <div class="col-md-6 form-group">
                                            <input type="text" class="form-control" id="fullName-info" value="${customer.fullName}" onfocus="this.placeholder = ''"
                                           onblur="this.placeholder = 'Full Name'">
                                        </div>
                                        <div class="col-md-6 form-group">
                                            <input type="date" class="form-control" value="${customer.birthDay}" id="birthDay-info">
                                        </div>
                            
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" id="address-info" value="${customer.address}" onfocus="this.placeholder = ''"
                                           onblur="this.placeholder = 'Address'">
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" value="${customer.phoneNumber}" id="phoneNumber-info" readonly>
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <input type="text" class="form-control" value="${customer.email}" id="email-info" readonly>
                                        </div>
                                        <div class="col-md-12 form-group ">
                                            <span id="update-error" class="text-danger"></span>
                                            <button class="genric-btn primary circle" onclick="changeInfo()" style="width: 170px">Save Change</button>
                                            <a href="javascript:" onclick="showFormChangePassword()" class="text-info">Change Password</a>
                                        </div>
                                     </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="login_form_inner" style="padding-top: 45px">
                                    <h3>Order History</h3>
                                    <div id="order-history"></div>
                                </div>
                            </div>
                        </div>
                        <div id="change-password"></div>
                    </div>
                </section>
                `
            showOrderHistory();
        }).catch(err => {
    })
}

function changeInfo() {
    let fullName = document.getElementById("fullName-info").value;
    let birthDay = document.getElementById("birthDay-info").value;
    let address = document.getElementById("address-info").value;
    let customer = {
        fullName: fullName,
        birthDay: birthDay,
        address: address,
    }
    axios.put("http://localhost:8080/customers/" + getCurrentUser().id, customer, {headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
        .then(response => {
            document.getElementById("update-error").innerHTML = "";
            alert("success")
            showCustomerInfo()
        }).catch(err => {
        document.getElementById("update-error").innerHTML = err.response.data;
    })
}

function showFormChangePassword() {
    document.getElementById("change-password").innerHTML =
        `
        <div class="modal fade" id="form-change-password" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="login_form_inner" style="padding-top: 30px">
                    <h3>Change password</h3>
                    <div class="row login_form" id="contactForm">
                        <div class="col-md-12 form-group">
                            <input type="password" class="form-control" id="oldPassword" placeholder="Old password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Old password'">
                        </div>
                        <div class="col-md-12 form-group">
                            <input type="password" class="form-control" id="newPassword" name="password" placeholder="New Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'New Password'">
                        </div>
                        <div class="col-md-12 form-group">
                            <input type="password" class="form-control" id="confirmPassword2" name="confirmPassword" placeholder="Confirm Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Confirm Password'">
                        </div>
                         <div class="col-md-12 form-group">
                            <span id="password-error" class="text-danger"></span>
                            <button onclick="changePassword()" class="primary-btn">Change</button>
                         </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        `
    $("#form-change-password").modal("show");
}

function changePassword() {
    let oldPassword = document.getElementById("oldPassword").value;
    let password = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword2").value;
    let user = {
        id: getCurrentUser().id,
        username: oldPassword,
        password: password,
        confirmPassword: confirmPassword
    }
    axios.put("http://localhost:8080/change-password", user, {headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}})
        .then(response => {
            alert("Password changed successfully")
            $("#form-change-password").modal("hide");
            document.getElementById("change-password").innerHTML = "";
        }).catch(error => {
        document.getElementById("password-error").innerHTML = error.response.data;
    })
}

function showOrderHistory() {
    axios.get(`http://localhost:8080/users/${getCurrentUser().id}/orders`, {headers: {"Authorization": `Bearer ${getCurrentUser().accessToken}`}}).then(response => {
        let orders = response.data;
        let html = ``;
        html = `
<section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Order Time</th>
                                <th scope="col">Total Money</th>
                                <th scope="col">status</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        if (orders.length === 0) {
            html += `<tr>
                   <td colspan="4"> <h3>No orders</h3></td>
                </tr></tbody>`
        }
        for (let i = 0; i < orders.length; i++) {
            html += `                            
            <tr>
            <td>
                ${orders[i].id}
            </td>
            <td>
                <h5>${orders[i].orderTime}</h5>
            </td>
            <td>
                $${orders[i].totalMoney}
            </td>
            <td>
                <h5>${orders[i].status} </h5>
            </td>
        </tr>`;
        }
        document.getElementById("order-history").innerHTML = html;
    })
}

function showNavbarUser() {
    let html='';
    if (getCurrentUser()) {
        let user= getCurrentUser();
        let roles=user.roles;
        const isAdmin = function () {
            for (let i=0;i<roles.length;i++) {
                if (roles[i].authority==="ROLE_ADMIN")
                    return true
            }
            return false;
        }
        html =
            `
                        <li class="nav-item"><a href="javascript:" onclick="showCart()" class="cart nav-link"><span
                                class="ti-bag"></span></a></li>
                        <li class="nav-item submenu dropdown">
                            <a href="#" class="nav-link dropdown-toggle user" data-toggle="dropdown" role="button"
                               aria-haspopup="true"
                               aria-expanded="true"><span class="fa fa-user-o"></span> ${user.fullName}</a>
                            <ul class="dropdown-menu user-menu" style="top:100%">
                              `;
        if (isAdmin()) {
            html += `            <li class="nav-item"><a class="nav-link" onclick="showPageForAdmin()" href="javascript:">Product Management</a></li>`
        }else {
            html+=`<li class="nav-item"><a class="nav-link" onclick="showCustomerInfo()"
                                                        href="javascript:">Profile</a></li>`
        }
        html += `
                                <li class="nav-item"><a class="nav-link" onclick="logout()"
                                                        href="javascript:">Logout</a></li>
                            </ul>
                        </li>
                     
                        <li class="nav-item">
                            <a class="nav-link" href="javascript:"><span class="lnr lnr-magnifier"
                                                                         id="search"></span></a>
                        </li>
    `
    }else {
        html+= `        <li class="nav-item"><a href="javascript:" class="cart nav-link"><span
                                class="ti-bag"></span></a></li>
                         <li class="nav-item"><a href="javascript:" class="user nav-link" onclick="showFormLogin()"
                                                style="color: black"><span class="fa fa-user-o"></span> Login</a></li>`
    }
    document.getElementById("user-navbar").innerHTML=html;
}