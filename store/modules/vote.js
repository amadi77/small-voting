const state = () => {
    return {
      votes: []
    }
  }
;

const getters = {};

const mutations = {
  addVote: (state, vote) => {
    console.log("add vote : ", vote)
    let index = state.votes.find(vote)
    if (index == -1)
      state.votes.add(vote)
  },
  removeVote: (state, vote) => {
    let index = state.votes.find(vote)
    if (index != -1)
      state.votes.splice(index, 1)
  }
};

const actions = {};

export default {
  state,
  mutations,
  actions,
  getters
}
