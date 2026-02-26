import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('renders with default empty mode', () => {
    const wrapper = mount(BaseButton)

    expect(wrapper.props('mode')).toBe('')
    expect(wrapper.classes()).not.toContain('outline')
  })

  it('applies "outline" class when mode is passed', () => {
    const wrapper = mount(BaseButton, {
      props: { mode: 'outline' },
    })
    expect(wrapper.classes()).toContain('outline')
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Submit' },
    })
    expect(wrapper.text()).toBe('Submit')
  })
})
