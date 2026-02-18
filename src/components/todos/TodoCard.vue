<script>
import TodoForm from './TodoForm.vue'

export default {
  components: { TodoForm },
  props: ['todo'],
  emits: ['delete-todo', 'update-todo'],
  data() {
    return {
      isEditMode: false,
      todoData: this.$props.todo,
    }
  },
  methods: {
    setEditMode() {
      this.isEditMode = !this.isEditMode
    },
    onUpdate(updatedTodo) {
      this.$emit('update-todo', updatedTodo)
    },
    onDelete(todoId) {
      this.$emit('delete-todo', todoId)
    },
  },
}
</script>

<template>
  <base-card v-if="!isEditMode">
    <h4>{{ todoData.title }}</h4>
    <p>{{ todoData.description }}</p>
    <div class="buttons-container">
      <base-button mode="outline" @click="setEditMode">Edit</base-button>
      <base-button @click="onDelete(todoData.id)">Delete</base-button>
    </div>
  </base-card>
  <todo-form
    v-else="isEditMode"
    :todo="todoData"
    :closeEditMode="setEditMode"
    @save-data="onUpdate"
  ></todo-form>
</template>
<style scoped>
.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
