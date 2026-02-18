<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.4rem 0.8rem;
  font-family: inherit;
  background-color: #1d1d1d;
  border: 1px solid #1d1d1d;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #000000;
  border-color: #000000;
}

.outline {
  background-color: transparent;
  color: #1d1d1d;
  border: 1px solid #1d1d1d;
}

.outline:hover,
.outline:active {
  background-color: #e6e6e6;
}

.flat {
  background-color: transparent;
  color: #1d1d1d;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #e6e6e6;
}
</style>
