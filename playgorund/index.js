





// function geolocacion() {
//     const geolocationSuport = false
//     if (geolocationSuport) {

//     } else {
//         throw new Error('No hay soporte de geolocalizacion')
//     }
// }

// try {
//     geolocacion()
// } catch (error) {
//     console.log(error.message)
// }

userList = []
idCount = 1


create({ name: 'jaun', password: 'asga', email: 'sdag@gamil.com' })
create({ name: 'sdag', password: 'gahhk', email: 'fhjg@gamil.com' })
create({ name: 'jhgk', password: 'aetgha', email: '124@gamil.com' })
create({ name: 'qwern', password: 'asga', email: 'sdag@gamil.com' })
create({ name: 'tqtag', password: 'gahhk', email: 'fhjg@gamil.com' })
create({ name: 'jqtek', password: 'aetgha', email: '124@gamil.com' })
create({ name: 'j324n', password: 'asga', email: 'sdag@gamil.com' })
create({ name: 'sqetg', password: 'gahhk', email: 'fhjg@gamil.com' })
create({ name: 'jaun', password: 'asga', email: 'sdag@gamil.com' })
create({ name: 'sdag', password: 'gahhk', email: 'fhjg@gamil.com' })

function create(user) {
    const newUser = { ...user, id: idCount }
    userList.push(newUser)
    idCount++

    return newUser
}

readById()
function readById(id) {
    userId = userList.find(i => i.id === id)
    return userId
}



erase()

function erase(id) {
    idToErase = userList.findIndex(i => i === readById(id))
    userList.splice(idToErase, 1)
    return userList
}

console.log(update(userToUpdate = { name: 'Juamon', password: 'ramon', email: 'cabron@gamil.com' }, 3))

// function update(userToUpdate, id) {
//     userToUpdateById = userList.findIndex(i => i === readById(id))

//     let { name, password, email } = userList[userToUpdateById]

//     if (name !== userToUpdate.name) {
//         userList[userToUpdateById].name = userToUpdate.name
//     }

//     if (password !== userToUpdate.password) {
//         userList[userToUpdateById].password = userToUpdate.password
//     }

//     if (email !== userToUpdate.email) {
//         userList[userToUpdateById].email = userToUpdate.email
//     }

//     return userList
// }


function update(userToUpdate, id) {
    userToUpdateById = userList.findIndex(i => i === i.id === id)

    return userList.map((user, index) => {
        if (user.id === id) {
            return { ...user, ...userToUpdate }
        }
        return user
    })
}



