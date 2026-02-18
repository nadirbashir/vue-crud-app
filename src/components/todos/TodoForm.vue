<script>
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
  data() {
    return {
      title: this.$props.todo?.title || '',
      description: this.$props.todo?.description || '',
    }
  },
  methods: {
    submitData() {
      const formData = {
        id: this.$props.todo?.id || new Date().toISOString(),
        title: this.title,
        description: this.description,
      }

      this.$emit('save-data', formData)

      if (this.$props.todo && this.$props.closeEditMode) {
        this.$props.closeEditMode()
        return
      }
      this.title = ''
      this.description = ''
    },
  },
}
</script>

<template>
  <base-card>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input id="title" v-model.trim="title" placeholder="Enter Title" />
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
        <base-button
          type="button"
          v-if="this.$props.todo && this.$props.closeEditMode"
          @click="closeEditMode"
          mode="outline"
          >Cancel</base-button
        >
        <base-button>Save</base-button>
      </div>
    </form>
  </base-card>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

.form-actions {
  display: flex;
  gap: 5px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
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

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
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
