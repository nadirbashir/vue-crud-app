import { createStore } from 'vuex'
import todosModule from './modules/todos'

const store = createStore({
  modules: {
    todos: todosModule,
  },
})

export default store
