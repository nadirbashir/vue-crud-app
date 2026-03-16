<script>
import { ref } from 'vue'

export default {
  emits: ['save-data'],
  props: {
    todo: {
      type: Object,
      required: false,
      default: null,
    },
    closeEditMode: {
      // anti-pattern, to communicate with parent use emit instead of passing function
      type: Function,
      required: false,
      default: null,
    },
  },
  setup(prop, context) {
    const title = ref(prop.todo?.title || '')
    const description = ref(prop.todo?.description || '')
    const priority = ref(prop.todo?.priority || 'MEDIUM')
    const error = ref(false)
    const isSaved = ref(false)

    function submitData() {
      if (!title.value) {
        error.value = true
        return
      }
      const formData = {
        id: prop.todo?.id || new Date().toISOString(),
        title: title.value,
        description: description.value,
        priority: priority.value,
      }

      context.emit('save-data', formData)

      if (prop.todo && prop.closeEditMode) {
        prop.closeEditMode()
        return
      }

      title.value = ''
      description.value = ''
      priority.value = 'MEDIUM'
      isSaved.value = true

      setTimeout(() => {
        isSaved.value = false
      }, 1000)
    }

    return {
      title,
      description,
      priority,
      error,
      isSaved,
      submitData,
      closeEditMode: prop.closeEditMode,
    }
  },
}
</script>

<template>
  <base-card>
    <base-dialog :show="error" title="Error:" @close="error = false">
      <template #default>
        <p>Title is required.</p>
      </template>
    </base-dialog>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title (*)</label>
        <input id="title" name="title" v-model.trim="title" placeholder="Enter Title" />
      </div>
      <div class="form-control">
        <p>Priority:</p>
        <div class="radio-container">
          <input type="radio" id="high" name="priority" value="HIGH" v-model="priority" />
          <label for="high">High</label>

          <input type="radio" id="medium" name="priority" value="MEDIUM" v-model="priority" />
          <label for="medium">Medium</label>

          <input type="radio" id="low" name="priority" value="LOW" v-model="priority" />
          <label for="low">Low</label>
        </div>
      </div>
      <div class="form-control">
        <label for="description">description</label>
        <textarea
          id="description"
          placeholder="Enter description"
          rows="5"
          v-model.trim="description"
        ></textarea>
      </div>
      <div class="form-actions">
        <base-button type="button" v-if="closeEditMode" @click="closeEditMode" mode="outline"
          >Cancel</base-button
        >
        <base-button :disabled="isSaved" :class="isSaved ? 'disabled' : ''">Save</base-button>
        <p v-show="isSaved">Todo Saved Successfully!</p>
      </div>
    </form>
  </base-card>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

.disabled,
.disabled:hover,
.disabled:active {
  background-color: #bdbdbd;
  border: 1px solid #bdbdbd;
}

.form-actions {
  display: flex;
  gap: 5px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

button {
  width: 100px;
  height: 30px;
}

.radio-container {
  display: flex;
  align-items: center;
  gap: 2px;
}
.radio-container label {
  margin: 0;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='radio'] + label {
  width: auto;
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio']:focus {
  outline: #3d008d solid 1px;
}

h3,
p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
