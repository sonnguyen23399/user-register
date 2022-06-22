const getUsers = (callback) => {
    let usersApi = 'http://localhost:3000/users'
    fetch(usersApi)
        .then(res => res.json())
        .then(callback)
        .catch(err => console.log(err))
}

const renderUsers = (users) => {
    let htmls = users.map((user) =>
        `<tr class="user-item-${user.id}">
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>${user.birthday}</td>
                    <td><button type="button" class="btn btn-warning" name="edit" id="btn-edit-${user.id}" onclick="handleEditUser(${user.id})">Edit</button></td>
                    <td><button type="button" class="btn btn-danger" name="delete" id="btn-delete-${user.id}" onclick="handleRemoveUser(${user.id})">Delete</button></td>
                </tr>`
    )
    let html = htmls.join('')
    document.querySelector('tbody').innerHTML = html
    console.log(users)
}

const createUser = (usersApi, data) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(usersApi, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
}

const updateUser = (usersApi, data, id) => {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(usersApi + "/" + id, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
}



const handlePostUser = () => {
    let usersApi = 'http://localhost:3000/users'
    let submitBtn = document.querySelector("#btn-save")
    submitBtn.addEventListener('click', () => {
        let userNameValue = document.querySelector("#username").value
        let fullNameValue = document.querySelector("#fullname").value
        let emailValue = document.querySelector("#email").value
        let birthdayValue = document.querySelector("#birthday").value

        let user = {
            username: userNameValue,
            fullname: fullNameValue,
            email: emailValue,
            birthday: birthdayValue
        }
        console.log(user)
        createUser(usersApi, user)
    })

}




const handleRemoveUser = (id) => {
    let usersApi = 'http://localhost:3000/users'
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(usersApi + "/" + id, options)
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
    let removeBtn = document.querySelector(`#btn-delete-${id}`)
    removeBtn.addEventListener('click', () => {
        document.querySelector(`user-item-${id}`).remove()
    })
}

const handleEditUser = (id) => {
    document.querySelector("#btn-save").style.display = 'none'
    document.querySelector("#btn-update").style.display = 'inline-block'
    let usersApi = 'http://localhost:3000/users'
    fetch(usersApi)
        .then(res => res.json())
        .then((data) => {
            document.querySelector("#username").value = data[id - 1].username
            document.querySelector("#fullname").value = data[id - 1].fullname
            document.querySelector("#email").value = data[id - 1].email
            document.querySelector("#birthday").value = data[id - 1].birthday

        })
        .then(() => {
            let usersApi = 'http://localhost:3000/users'
            let updateBtn = document.querySelector("#btn-update")
            updateBtn.addEventListener('click', () => {
                let userNameValue = document.querySelector("#username").value
                let fullNameValue = document.querySelector("#fullname").value
                let emailValue = document.querySelector("#email").value
                let birthdayValue = document.querySelector("#birthday").value

                let user = {
                    username: userNameValue,
                    fullname: fullNameValue,
                    email: emailValue,
                    birthday: birthdayValue
                }
                console.log(user)
                updateUser(usersApi, user, id)
                document.querySelector("#btn-save").style.display = 'inline-block'
                document.querySelector("#btn-update").style.display = 'none'
            })
        })
}



const start = () => {
    document.querySelector("#btn-update").style.display = 'none'
    getUsers(renderUsers)
    handlePostUser()
}
start()