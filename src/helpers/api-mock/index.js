let users = [
   //{ id: 1, name: 'Troy Moreland', email: 'troy@morelands.net', photoUrl: '', mobile: '' },
]

export const getUsers = () => {
   console.log('getUsers', users)
   return users
}

export const getUser = (id) => {
   return users.filter(u => u.id === id)
}

export const addUser = (obj) => {
   users.push(obj)
   getUsers()
   return true
}

export const deleteUser = (id) => {
   users = users.filter(u => u.id !== id)
   return true
}
