import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from '@/components/ui/BaseBadge.vue'

describe('BaseBadge', () => {
  it('renders the uppercase title', () => {
    const wrapper = mount(BaseBadge, {
      props: { title: 'high' },
    })
    expect(wrapper.text()).toBe('HIGH')
  })

  it('applies the correct class for "high"', () => {
    const wrapper = mount(BaseBadge, {
      props: { title: 'high' },
    })
    expect(wrapper.classes()).toContain('high')
  })
})
