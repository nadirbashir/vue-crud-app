import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoForm from '@/components/todos/TodoForm.vue'

const BaseButton = {
  template: '<button><slot /></button>',
}
const BaseCard = {
  template: '<div><slot /></div>',
}
const BaseDialog = {
  props: ['show', 'title'],
  template: '<div v-if="show"><slot /></div>',
}

describe('TodoForm', () => {
  let wrapper
  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders empty form when no todo prop', () => {
    wrapper = mount(TodoForm, {
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    expect(wrapper.find('input#title').element.value).toBe('')
    expect(wrapper.find('textarea#description').element.value).toBe('')
    expect(wrapper.find('input[type="radio"][value="MEDIUM"]').element.checked).toBe(true)
  })

  it('renders form with todo prop', () => {
    const todo = { title: 'Test', description: 'Desc', priority: 'HIGH' }
    wrapper = mount(TodoForm, {
      props: { todo },
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    expect(wrapper.find('input#title').element.value).toBe('Test')
    expect(wrapper.find('textarea#description').element.value).toBe('Desc')
    expect(wrapper.find('input[type="radio"][value="HIGH"]').element.checked).toBe(true)
  })

  it('shows error dialog if title is empty on submit', async () => {
    wrapper = mount(TodoForm, {
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.error).toBe(true)
    // Error dialog should be visible
    expect(wrapper.findComponent(BaseDialog).props('show')).toBe(true)
  })

  it('emits save-data with correct payload on valid submit', async () => {
    wrapper = mount(TodoForm, {
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    await wrapper.find('input#title').setValue('My Todo')
    await wrapper.find('textarea#description').setValue('Some desc')
    await wrapper.find('input[type="radio"][value="LOW"]').setChecked()
    await wrapper.find('form').trigger('submit.prevent')
    const emitted = wrapper.emitted('save-data')
    expect(emitted).toBeTruthy()
    const payload = emitted[0][0]
    expect(payload.title).toBe('My Todo')
    expect(payload.description).toBe('Some desc')
    expect(payload.priority).toBe('LOW')
    expect(payload.id).toBeTruthy()
  })

  it('calls closeEditMode if editing and closeEditMode is provided', async () => {
    const todo = { id: '1', title: 'Edit', description: 'Edit desc', priority: 'MEDIUM' }
    const closeEditMode = vi.fn()
    wrapper = mount(TodoForm, {
      props: { todo, closeEditMode },
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    await wrapper.find('input#title').setValue('Edit')
    await wrapper.find('form').trigger('submit.prevent')
    expect(closeEditMode).toHaveBeenCalled()
  })

  it('disables save button and shows success message after save', async () => {
    wrapper = mount(TodoForm, {
      global: { components: { BaseButton, BaseCard, BaseDialog } },
    })
    await wrapper.find('input#title').setValue('My Todo')
    await wrapper.find('form').trigger('submit.prevent')
    // Save button should be disabled
    expect(wrapper.vm.isSaved).toBe(true)
    // Success message should be visible
    expect(wrapper.find('.form-actions p').isVisible()).toBe(true)
  })
})
