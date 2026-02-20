<script>
import { mapMutations } from 'vuex'
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
    }
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab
    },
    ...mapMutations('todos', ['addTodo']),
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
      <todos-list v-if="selectedTab === 'list-todos'"></todos-list>
      <todo-form v-show="selectedTab === 'add-todo'" @save-data="addTodo"></todo-form>
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
