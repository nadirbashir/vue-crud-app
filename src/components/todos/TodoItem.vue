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
      todoData: this.$props.todo,
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
    <template #header>
      <h3>Are you sure to delete?</h3>
    </template>
    <template #default>
      <h4>{{ todoData.title }}</h4>
      <p>{{ todoData.description }}</p>
    </template>
    <template #actions>
      <div class="buttons-container">
        <base-button mode="outline" @click="setShowConfirmDelete(false)">Cancel</base-button>
        <base-button @click="onDelete(todoData.id)">Delete</base-button>
      </div>
    </template>
  </base-dialog>
  <base-card v-if="!isEditMode">
    <h4>{{ todoData.title }}</h4>
    <p>{{ todoData.description }}</p>
    <base-badge :title="todoData?.priority"></base-badge>
    <div class="buttons-container">
      <base-button mode="outline" @click="setEditMode">Edit</base-button>
      <base-button @click="setShowConfirmDelete(true)">Delete</base-button>
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
