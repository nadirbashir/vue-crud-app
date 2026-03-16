<script>
import { computed, reactive } from 'vue'
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
  setup(props, context) {
    const filters = reactive({
      title: '',
      priorities: [],
    })

    const filteredTodos = computed(function () {
      return props.todos.filter(({ title, priority }) => {
        if (filters.priorities.length) {
          return (
            title.toLowerCase().includes(filters.title.toLowerCase()) &&
            filters.priorities.includes(priority)
          )
        }
        return title.toLowerCase().includes(filters.title.toLowerCase())
      })
    })

    function onDeleteTodo(todoId) {
      context.emit('delete-todo', todoId)
    }
    function onUpdateTodo(updatedTodo) {
      context.emit('update-todo', updatedTodo)
    }
    function setFilters(updatedFilters) {
      filters.title = updatedFilters.title
      filters.priorities = [...updatedFilters.priorities]
    }

    return {
      filteredTodos,
      onDeleteTodo,
      onUpdateTodo,
      setFilters,
    }
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
