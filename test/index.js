import test from 'ava'
import { mutations } from '../client/stores/store'

test('mutation test passed', t => {
  const state = { count: 0 }
  mutations.INCREMENT(state, 1)
  t.is(state.count, 1)
})
