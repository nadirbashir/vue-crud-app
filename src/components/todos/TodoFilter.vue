<script>
import { reactive, ref, watch } from 'vue'

export default {
  emits: ['change-filter'],
  setup(_, context) {
    const showFilters = ref(false)
    const title = ref('')
    const priorities = ref([])

    watch([title, priorities], function (values) {
      const filters = { title: values[0], priorities: [...values[1]] }
      context.emit('change-filter', filters)
    })
    return {
      showFilters,
      title,
      priorities,
    }
  },
}
</script>

<template>
  <base-card>
    <div>Filters:</div>
    <div class="filters-container">
      <input type="text" v-model.trim="title" placeholder="Search by title" />
      <span> Priority: </span>
      <input type="checkbox" id="high" name="priorities" value="HIGH" v-model="priorities" />
      <label for="high">High</label>

      <input type="checkbox" id="medium" name="priorities" value="MEDIUM" v-model="priorities" />
      <label for="medium">Medium</label>

      <input type="checkbox" id="low" name="priorities" value="LOW" v-model="priorities" />
      <label for="low">Low</label>
    </div>
  </base-card>
</template>

<style scoped>
.filters-container {
  max-width: 40rem;
  margin: 20px auto;
  display: 'flex';
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}
</style>
