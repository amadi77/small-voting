import Vuex from 'vuex';
import vote from './modules/vote';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';


export const index = new Vuex.Store({
    state: {
        value: 0,
      studentId: null,
      selectionId:null,
      isHost:false,
      grade:null,
      inputYear:0
    },
    getters,
    mutations,
    actions,
    modules: {
        vote
    }
});
