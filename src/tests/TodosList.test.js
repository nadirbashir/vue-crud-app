import { shallowMount } from '@vue/test-utils'
import TodosList from '@/components/todos/TodosList.vue'

describe('TodosList.vue', () => {
  const todos = [
    { id: 1, title: 'Test 1', description: 'desc', priority: 'HIGH' },
    { id: 2, title: 'Test 2', description: 'desc2', priority: 'LOW' },
  ]

  const wrapper = shallowMount(TodosList, {
    props: { todos },
  })

  it('renders the correct number of TodoItem components based on filteredTodos', () => {
    expect(wrapper.findAllComponents({ name: 'TodoItem' }).length).toBe(2)
  })

  it('shows empty state when no todos match filter', async () => {
    await wrapper.setData({ filters: { title: 'no-match', priorities: [] } })
    expect(wrapper.text()).toContain('No Todos Found')
  })

  it('emits delete-todo when onDeleteTodo is called', () => {
    wrapper.vm.onDeleteTodo(1)
    expect(wrapper.emitted('delete-todo')[0]).toEqual([1])
  })

  it('emits update-todo when onUpdateTodo is called', () => {
    const updated = { ...todos[0], title: 'Updated' }
    wrapper.vm.onUpdateTodo(updated)
    expect(wrapper.emitted('update-todo')[0]).toEqual([updated])
  })

  it('filters todos by title and priority', async () => {
    await wrapper.setData({ filters: { title: 'Test 1', priorities: ['HIGH'] } })
    expect(wrapper.vm.filteredTodos.length).toBe(1)
    expect(wrapper.vm.filteredTodos[0].title).toBe('Test 1')
  })
})
