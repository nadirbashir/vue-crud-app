import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoFilter from '@/components/todos/TodoFilter.vue'

const BaseCard = {
  template: '<div><slot /></div>',
}

describe('TodoFilter', () => {
  let wrapper
  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders filter inputs', () => {
    wrapper = mount(TodoFilter, {
      global: { components: { BaseCard } },
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"][value="HIGH"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"][value="MEDIUM"]').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"][value="LOW"]').exists()).toBe(true)
  })

  it('emits change-filter when title changes', async () => {
    wrapper = mount(TodoFilter, {
      global: { components: { BaseCard } },
    })
    await wrapper.find('input[type="text"]').setValue('test')
    const emitted = wrapper.emitted('change-filter')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toEqual({ title: 'test', priorities: [] })
  })

  it('emits change-filter when priorities change', async () => {
    wrapper = mount(TodoFilter, {
      global: { components: { BaseCard } },
    })
    await wrapper.find('input[type="checkbox"][value="HIGH"]').setChecked()
    const emitted = wrapper.emitted('change-filter')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toEqual({ title: '', priorities: ['HIGH'] })
  })

  it('emits correct filter object when both title and priorities change', async () => {
    wrapper = mount(TodoFilter, {
      global: { components: { BaseCard } },
    })
    await wrapper.find('input[type="text"]').setValue('foo')
    await wrapper.find('input[type="checkbox"][value="LOW"]').setChecked()
    // The watcher emits on each change, so check the last emission
    const emitted = wrapper.emitted('change-filter')
    expect(emitted).toBeTruthy()
    const last = emitted[emitted.length - 1][0]
    expect(last).toEqual({ title: 'foo', priorities: ['LOW'] })
  })
})
