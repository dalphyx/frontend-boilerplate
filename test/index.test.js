import { mutations } from '../src/stores/store'

test('mutation test passed', () => {
  const state = { count: 0 }
  mutations.INCREMENT(state, 1)
  expect(state.count).toBe(1)
})
