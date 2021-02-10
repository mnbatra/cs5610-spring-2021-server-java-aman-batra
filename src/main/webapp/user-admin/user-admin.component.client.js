let $usernameFld;
let $passwordFld;
let $firstNameFld;
let $lastNameFld;
let $roleFld;
let $searchBtn;
let $createBtn;
let $updateBtn;
let adminBody;
let users[] = 0


// starting the function
// call to service client "user.service.client.js" to connect to db and initiate a new session

let userService = new AdminUserServiceClient()


