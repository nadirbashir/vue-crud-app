<script>
import TodoForm from './TodoForm.vue'

export default {
  components: { TodoForm },
  props: ['todo'],
  emits: ['delete-todo', 'update-todo'],
  data() {
    return {
      isEditMode: false,
      showConfirmDelete: false,
    }
  },
  methods: {
    setShowConfirmDelete(flag) {
      this.showConfirmDelete = flag
    },
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
  <base-dialog
    :show="this.showConfirmDelete"
    title="Title default"
    @close="setShowConfirmDelete(false)"
  >
    <template v-slot:header>
      <h3>Are you sure to delete?</h3>
    </template>
    <template #default>
      <h4>{{ todo.title }}</h4>
      <p>{{ todo.description }}</p>
    </template>
    <template #actions>
      <div class="buttons-container">
        <base-button mode="outline" @click="setShowConfirmDelete(false)">Cancel</base-button>
        <base-button @click="onDelete(todo.id)">Delete</base-button>
      </div>
    </template>
  </base-dialog>
  <div v-if="!isEditMode" class="todo-item">
    <h4>{{ todo.title }}</h4>
    <p>{{ todo.description }}</p>
    <base-badge :title="todo?.priority"></base-badge>
    <div class="buttons-container">
      <base-button mode="outline" @click="setEditMode">Edit</base-button>
      <base-button @click="setShowConfirmDelete(true)">Delete</base-button>
    </div>
  </div>
  <todo-form
    v-else="isEditMode"
    :todo="todo"
    :closeEditMode="setEditMode"
    @save-data="onUpdate"
  ></todo-form>
</template>
<style scoped>
.todo-item {
  padding: 1rem;
  margin: 2rem auto;
  min-width: 200px;
  max-width: 40rem;
  border: solid #171717;
  border-radius: 20px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
