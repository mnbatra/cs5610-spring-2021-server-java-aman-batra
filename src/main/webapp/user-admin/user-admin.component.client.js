let users = [0];
let $usernameFld, $passwordFld;
let $firstNameFld, $lastNameFld;
let $roleFld;
let $removeBtn, $editBtn, $resetBtn;
let $createBtn, $updateBtn;
let $tbody;
let selectedUser = null;


// starting the function
// call to service client "user.service.client.js" to connect to db and initiate a new session

let UserService = new AdminUserServiceClient()
function renderUsers(users) {
    $tbody.empty()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        $tbody.prepend(`
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

function createUser() {
    let newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }
    UserService.createUser(newUser)
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


function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()
    UserService.updateUser(selectedUser._id, selectedUser).then(status => {
        let index = users.findIndex(user => user._id === selectedUser._id)
        users[index] = selectedUser
        renderUsers(users)
    })
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("")
}

function deleteUser(event) {
    let button = $(event.target)
    let index = button.attr("id")
    let id = users[index]._id
    UserService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

function selectUser(event) {
    let id = $(event.target).attr("id")
    console.log(id)
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}


let $webDevForm = jQuery("wbdv_form")
    function emptyInputForm() {
    $webDevForm.empty()
    }

function main() {

    $usernameFld = jQuery("#usernameFld");
    $passwordFld = jQuery("#passwordFld");
    $firstNameFld = jQuery("#firstNameFld");
    $lastNameFld = jQuery("#lastNameFld");
    $roleFld = jQuery("#roleFld");
    $createBtn = jQuery(".wbdv-create");
    $removeBtn = jQuery(".wbdv-remove")
    $editBtn = jQuery(".wbdv-edit");
    $tbody = jQuery(".wbdv-tbody");
    $updateBtn = jQuery(".wbdv-update")



    $createBtn.click(createUser())
    $updateBtn.click(updateUser())
    $removeBtn.click(deleteUser())
    $resetBtn.click(emptyInputForm())
}
jQuery(main);
