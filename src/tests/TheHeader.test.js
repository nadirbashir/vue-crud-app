import TheHeader from '@/components/layout/TheHeader.vue'
import { shallowMount } from '@vue/test-utils'
import { it } from 'vitest'

it('renders header with correct title', () => {
  const wrapper = shallowMount(TheHeader)
  expect(wrapper.find('h1').text()).toBe('Todo App')
})
