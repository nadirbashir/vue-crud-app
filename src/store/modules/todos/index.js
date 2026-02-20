import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      todosList: [
        {
          id: Date.now() - 1,
          title: 'Title 1',
          description: 'details here',
          priority: 'MEDIUM',
        },
        {
          id: Date.now(),
          title: 'Title 2',
          description: 'details here 2',
          priority: 'LOW',
        },
      ],
    }
  },
  mutations,
  getters,
}
