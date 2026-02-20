export default {
  addTodo(state, payload) {
    state.todosList.push(payload)
  },
  updateTodo(state, payload) {
    const todo = state.todosList.find((item) => item.id === payload.id)
    todo.title = payload.title
    todo.description = payload.description
    todo.priority = payload.priority
  },
  deleteTodo(state, todoId) {
    const index = state.todosList.findIndex((item) => item.id === todoId)
    state.todosList.splice(index, 1)
  },
}
