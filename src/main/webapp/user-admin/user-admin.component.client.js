let users = [0];
let $usernameFld;
let $passwordFld;
let $firstNameFld;
let $lastNameFld;
let $roleFld;
let $searchBtn;
let $createBtn;
let $updateBtn;


// starting the function
// call to service client "user.service.client.js" to connect to db and initiate a new session

let userService = new AdminUserServiceClient()

let tableBody = jQuery("tbody")

function renderUsers(users) {
    tableBody.empty()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        tableBody.prepend(`
            <td class="wbdv-username">${user.username}</td>
            <td class="wbdv-password">********</td>
            <td class="wbdv-first-name">${user.firstName}</td>
            <td class="wbdv-last-name">${user.lastName}</td>
            <td class="wbdv-role">$(user.role}</td>
            <td class="wbdv-actions">
                <span class="float-right">
                    <button><i class="fa-2x fa fa-trash wbdv-remove" id="${i}"></i> Delete</button>
                      <button><i class=" fa-2x fa fa-edit wbdv-edit" id="${user._id}"></i> Select
                    </button>
                    </span>
            </td>`)
    }
    jQuery(".wbdv-remove")
        .click(deleteUser)
    jQuery(".wbdv-edit")
        .click(selectUser)
}

async function createUser() {
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }

    adminUserService.createUser(newUser)
        .then(function (actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("")
}



jQuery("wbdv-remove")
    .click(function (event) {
        let deleteBtn = jQuery(event.target())
        let deleteId = deleteBtn.attr("id")
        const delId = users[deleteId]._id;
        users.splice(deleteId, 1)
        renderUsers(users)

    })


    let $webDevForm = jQuery("wbdv_form")
    function emptyInputForm() {
        $webDevForm.empty()
    }


