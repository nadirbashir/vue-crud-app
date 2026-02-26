import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import { afterEach, beforeEach } from 'vitest'

describe('App.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct default data', () => {
    expect(wrapper.vm.selectedTab).toBe('list-todos')
    expect(Array.isArray(wrapper.vm.todos)).toBe(true)
    expect(wrapper.vm.todos.length).toBeGreaterThan(0)
  })

  it('adds todo when TodoForm emits save-data', async () => {
    wrapper.vm.setSelectedTab('add-todo')
    await wrapper.vm.$nextTick()
    const newTodo = { id: 10, title: 'New', description: 'desc', priority: 'HIGH' }
    wrapper.findComponent({ name: 'TodoForm' }).vm.$emit('save-data', newTodo)
    expect(wrapper.vm.todos).toContainEqual(newTodo)
  })

  it('deletes a todo correctly', () => {
    const initialLength = wrapper.vm.todos.length
    const idToDelete = wrapper.vm.todos[0].id
    wrapper.vm.deleteTodo(idToDelete)
    expect(wrapper.vm.todos.length).toBe(initialLength - 1)
    expect(wrapper.vm.todos.find((t) => t.id === idToDelete)).toBeUndefined()
  })

  it('updates a todo correctly', () => {
    const wrapper = shallowMount(App)
    const todo = wrapper.vm.todos[0]
    const updated = { ...todo, title: 'Updated', description: 'Updated desc', priority: 'HIGH' }
    wrapper.vm.updateTodo(updated)
    expect(wrapper.vm.todos[0].title).toBe('Updated')
    expect(wrapper.vm.todos[0].description).toBe('Updated desc')
    expect(wrapper.vm.todos[0].priority).toBe('HIGH')
  })

  it('sets selectedTab correctly', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.setSelectedTab('add-todo')
    expect(wrapper.vm.selectedTab).toBe('add-todo')
  })
})
