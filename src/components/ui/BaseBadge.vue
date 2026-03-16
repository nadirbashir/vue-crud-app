<script>
import { computed } from 'vue'

export default {
  props: ['title'],
  setup(props) {
    const textUpperCase = computed(function () {
      return props.title.toUpperCase()
    })
    const textLowerCase = computed(function () {
      return props.title.toLowerCase()
    })
    return {
      textUpperCase,
      textLowerCase,
    }
  },
}
</script>

<template>
  <span class="badge" :class="textLowerCase">
    {{ textUpperCase }}
  </span>
</template>

<style scoped>
.badge {
  background-color: #ccc;
  color: #171717;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.high {
  background-color: #980202de;
  color: white;
}

.medium {
  background-color: #ffa602;
  color: white;
}

.low {
  background-color: #999898;
  color: white;
}
</style>
