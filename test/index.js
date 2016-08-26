import { mutations } from '../client/stores/store'
import test from 'ava'

test('mutation test passed', t => {
  const state = { count: 0 }
  mutations.INCREMENT(state, 1)
  t.is(state.count, 1)
})
