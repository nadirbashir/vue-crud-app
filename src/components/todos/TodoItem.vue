<script>
import { ref } from 'vue'
import TodoForm from './TodoForm.vue'

export default {
  components: { TodoForm },
  props: ['todo'],
  emits: ['delete-todo', 'update-todo'],
  setup(props, context) {
    const isEditMode = ref(false)
    const showConfirmDelete = ref(false)

    function setShowConfirmDelete(flag) {
      showConfirmDelete.value = flag
    }
    function setEditMode() {
      isEditMode.value = !isEditMode.value
    }
    function onUpdate(updatedTodo) {
      context.emit('update-todo', updatedTodo)
    }
    function onDelete(todoId) {
      context.emit('delete-todo', todoId)
    }

    return {
      todo: props.todo,
      isEditMode,
      showConfirmDelete,
      setShowConfirmDelete,
      setEditMode,
      onUpdate,
      onDelete,
    }
  },
}
</script>

<template>
  <base-dialog :show="showConfirmDelete" title="Title default" @close="setShowConfirmDelete(false)">
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
