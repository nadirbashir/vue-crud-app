<script>
import TodoFilter from './TodoFilter.vue'
import TodoItem from './TodoItem.vue'

export default {
  components: { TodoItem, TodoFilter },
  emits: ['update-todo', 'delete-todo', 'filter-todos'],
  props: {
    todos: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {
      error: null,
      filters: {
        title: '',
        priorities: [],
      },
    }
  },

  computed: {
    filteredTodos() {
      return this.todos.filter(({ title, priority }) => {
        if (this.filters.priorities.length) {
          return (
            title.toLowerCase().includes(this.filters.title.toLowerCase()) &&
            this.filters.priorities.includes(priority)
          )
        }
        return title.toLowerCase().includes(this.filters.title.toLowerCase())
      })
    },
  },

  methods: {
    onDeleteTodo(todoId) {
      this.$emit('delete-todo', todoId)
    },
    onUpdateTodo(updatedTodo) {
      this.$emit('update-todo', updatedTodo)
    },
    setFilters(updatedFilters) {
      this.filters = updatedFilters
    },
  },
}
</script>

<template>
  <todo-filter @change-filter="setFilters"></todo-filter>
  <base-card>
    <h4 v-if="!filteredTodos.length">No Todos Found</h4>
    <div v-else>
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete-todo="onDeleteTodo"
        @update-todo="onUpdateTodo"
      ></todo-item>
    </div>
  </base-card>
</template>
