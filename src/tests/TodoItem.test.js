import { beforeEach, describe, expect, it } from 'vitest'
import TodoItem from '@/components/todos/TodoItem.vue'
import { mount } from '@vue/test-utils'
import BaseDialog from '@/components/ui/BaseDialog.vue'

const BaseButton = {
  props: ['mode'],
  template: '<button><slot /></button>',
}
const TodoForm = {
  props: ['todo', 'closeEditMode'],
  template: '<div><slot /></div>',
}
const BaseBadge = {
  props: ['title'],
  template: '<div><slot /></div>',
}

describe('TodoItem', () => {
  let wrapper

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    wrapper = mount(TodoItem, {
      props: {
        todo: { id: 1, title: 'Test Todo', description: 'Test Description', priority: 'HIGH' },
      },
      global: { components: { BaseDialog, BaseButton, TodoForm, BaseBadge } },
    })
  })

  it('should render the todo item correctly', () => {
    expect(wrapper.find('.todo-item h4').text()).toBe('Test Todo')
    expect(wrapper.find('.todo-item p').text()).toBe('Test Description')
    expect(wrapper.findComponent(BaseBadge).props('title')).toBe('HIGH')
    expect(wrapper.findAllComponents(BaseButton)[0].text()).toBe('Edit')
    expect(wrapper.findAllComponents(BaseButton)[1].text()).toBe('Delete')
    expect(wrapper.findComponent(BaseDialog).props('show')).toBe(false)
    expect(wrapper.findComponent(TodoForm).exists()).toBe(false)
  })

  it('should show delete dialog when delete button is clicked', async () => {
    await wrapper.findAllComponents(BaseButton)[1].trigger('click')
    expect(wrapper.findComponent(BaseDialog).props('show')).toBe(true)
  })

  it('should emit delete-todo with correct id when delete is confirmed', async () => {
    await wrapper.findAllComponents(BaseButton)[1].trigger('click')
    await wrapper.vm.$nextTick()
    const dialog = document.body.querySelector('dialog')
    const buttons = dialog.querySelectorAll('button')
    buttons[1].click() // Confirm delete
    await wrapper.vm.$nextTick()
    const emitted = wrapper.emitted('delete-todo')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe(1)
  })

  it('should show edit form when edit button is clicked', async () => {
    await wrapper.findAllComponents(BaseButton)[0].trigger('click')
    expect(wrapper.findComponent(TodoForm).exists()).toBe(true)
    expect(wrapper.findComponent(TodoForm).props('todo')).toEqual({
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      priority: 'HIGH',
    })
  })

  it('should emit update-todo with updated data when edit form is submitted', async () => {
    await wrapper.findAllComponents(BaseButton)[0].trigger('click')
    const form = wrapper.findComponent(TodoForm)
    form.vm.$emit('save-data', {
      id: 1,
      title: 'Updated Todo',
      description: 'Updated Desc',
      priority: 'LOW',
    })
    await wrapper.vm.$nextTick()
    const emitted = wrapper.emitted('update-todo')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toEqual({
      id: 1,
      title: 'Updated Todo',
      description: 'Updated Desc',
      priority: 'LOW',
    })
  })
})
