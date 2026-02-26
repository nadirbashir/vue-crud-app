import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDialog from '@/components/ui/BaseDialog.vue'

// Mock BaseButton for slot
const BaseButton = {
  template: '<button><slot /></button>',
}

// BaseDialog uses <teleport> to render its dialog outside the wrapper DOM tree.
// Therefore, wrapper.find('dialog') will not find the dialog.

describe('BaseDialog', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    // Clean up teleported nodes
    document.body.innerHTML = ''
  })

  it('renders dialog when show is true', () => {
    wrapper = mount(BaseDialog, {
      props: { show: true },
      global: { components: { BaseButton } },
      attachTo: document.body,
    })
    const dialog = document.body.querySelector('dialog')
    expect(dialog).not.toBeNull()
  })

  it('does not render dialog when show is false', () => {
    wrapper = mount(BaseDialog, {
      props: { show: false },
      global: { components: { BaseButton } },
      attachTo: document.body,
    })
    const dialog = document.body.querySelector('dialog')
    expect(dialog).toBeNull()
  })

  it('renders title if provided', () => {
    wrapper = mount(BaseDialog, {
      props: { show: true, title: 'Test Title' },
      global: { components: { BaseButton } },
      attachTo: document.body,
    })
    const h2 = document.body.querySelector('dialog h2')
    expect(h2).not.toBeNull()
    expect(h2.textContent).toBe('Test Title')
  })

  it('emits close when backdrop is clicked', async () => {
    wrapper = mount(BaseDialog, {
      props: { show: true },
      global: { components: { BaseButton } },
      attachTo: document.body,
    })
    const backdrop = document.body.querySelector('.backdrop')
    expect(backdrop).not.toBeNull()
    backdrop.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('emits close when close button is clicked', async () => {
    wrapper = mount(BaseDialog, {
      props: { show: true },
      global: { components: { BaseButton } },
      attachTo: document.body,
    })
    const closeBtn = document.body.querySelector('button')
    expect(closeBtn).not.toBeNull()
    closeBtn.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('close')
  })
})
