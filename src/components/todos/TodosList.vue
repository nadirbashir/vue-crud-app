<script>
import TodoCard from './TodoItem.vue'

export default {
  components: { TodoCard },
  emits: ['update-todo', 'delete-todo'],
  props: {
    todos: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {
      isLoading: false,
      error: null,
      todosList: this.$props.todos,
    }
  },

  methods: {
    onDeleteTodo(todoId) {
      this.$emit('delete-todo', todoId)
    },
    onUpdateTodo(updatedTodo) {
      this.$emit('update-todo', updatedTodo)
    },
  },
}
</script>

<template>
  <base-card v-if="!todosList.length">
    <h4>No Todos Found</h4>
  </base-card>
  <div v-else>
    <todo-card
      v-for="todo in todosList"
      :key="todo.id"
      :todo="todo"
      @delete-todo="onDeleteTodo"
      @update-todo="onUpdateTodo"
    ></todo-card>
  </div>
</template>
