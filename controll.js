
const data = require('./data')

class Controll {
    async getTodos() {
        return new Promise((resolve, _) => resolve(data))
    }

    //geting one todo
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find(todo => todo.id === parseInt(id));
            if (todo) {
                resolve(todo)
            } else {
                reject(`todo with ${id} not found`)
            }
        })
    }

    //creating a new todu 
    async createTodo(todo) {
        return new Promise((resolve, reject) => {
            let newtodo =
            {
                id: Math.max(...data.map(todo=>todo.id))+1,
                ...todo
            }
            data.push(newtodo)
            resolve(newtodo)
        })
    }

    //updating a todu
    async updatetodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find(todo => todo.id === parseInt(id))

            if (!todo) {
                reject(`no todo with ${id} found`);
            }
            todo.completed = true
            resolve(todo)
        })
    }
//delete todo
    async deletetodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find(todo => todo.id === parseInt(id))

            if (!todo) {
                reject(`no todo with ${id} found`);
            }
            resolve('todo deleted succesfully')
        })
    }
}

module.exports = Controll