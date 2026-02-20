<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      showFilters: false,
      title: '',
      priorities: [],
    }
  },
  watch: {
    title(val) {
      const filters = { title: val, priorities: [...this.priorities] }
      this.$emit('change-filter', filters)
    },
    priorities(values) {
      const filters = { title: this.title, priorities: [...values] }
      this.$emit('change-filter', filters)
    },
  },
}
</script>

<template>
  <div></div>
  <div class="filters-container">
    <input type="text" v-model.trim="title" placeholder="Search by title" />
    <input type="checkbox" id="high" name="priorities" value="HIGH" v-model="priorities" />
    <label for="high">High</label>

    <input type="checkbox" id="medium" name="priorities" value="MEDIUM" v-model="priorities" />
    <label for="medium">Medium</label>

    <input type="checkbox" id="low" name="priorities" value="LOW" v-model="priorities" />
    <label for="low">Low</label>
  </div>
</template>

<style scoped>
.filters-container {
  max-width: 40rem;
  margin: 20px auto;
  display: 'flex';
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
</style>
