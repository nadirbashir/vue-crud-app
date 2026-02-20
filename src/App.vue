<script>
import TheHeader from './components/layout/TheHeader.vue'
import TodoForm from './components/todos/TodoForm.vue'
import TodosList from './components/todos/TodosList.vue'

export default {
  components: {
    TheHeader,
    TodosList,
    TodoForm,
  },
  data() {
    return {
      selectedTab: 'list-todos',
      todos: [
        {
          id: Date.now() - 1,
          title: 'Title 1',
          description: 'details here',
          priority: 'MEDIUM',
        },
        {
          id: Date.now(),
          title: 'Title 2',
          description: 'details here 2',
          priority: 'LOW',
        },
      ],
    }
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab
    },
    addTodo(data) {
      this.todos.push(data)
    },
    updateTodo(updatedTodo) {
      const todo = this.todos.find((item) => item.id === updatedTodo.id)
      todo.title = updatedTodo.title
      todo.description = updatedTodo.description
      todo.priority = updatedTodo.priority
    },
    deleteTodo(todoId) {
      const index = this.todos.findIndex((item) => item.id === todoId)
      this.todos.splice(index, 1)
    },
  },
  computed: {
    todosTabMode() {
      return this.selectedTab === 'list-todos' ? null : 'outline'
    },
    addTodoTabMode() {
      return this.selectedTab === 'add-todo' ? null : 'outline'
    },
  },
}
</script>

<template>
  <the-header></the-header>
  <div>
    <div class="tabs-container">
      <base-button @click="setSelectedTab('list-todos')" :mode="todosTabMode">Todos</base-button>
      <base-button @click="setSelectedTab('add-todo')" :mode="addTodoTabMode">Add Todo</base-button>
    </div>
    <div class="tab-content">
      <todos-list
        v-if="selectedTab === 'list-todos'"
        :todos="this.todos"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      ></todos-list>
      <todo-form
        v-else-if="selectedTab === 'add-todo'"
        @save-data="(data) => addTodo(data)"
      ></todo-form>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.tabs-container {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 40px 0px 10px;
}

.tabs-container button {
  width: 20rem;
  height: 40px;
}
</style>
