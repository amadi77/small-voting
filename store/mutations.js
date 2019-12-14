const mutations = {
  setStudentId(state, studentId) {
    state.studentId = studentId
  },
  setSelectionId(state, selections) {
    let selectionId = [];
    selections.forEach(index => {
      selectionId.push(parseInt(index.id))
    });
    state.selectionId = selectionId;
  },
  setHost(state, host) {
    state.isHost = host
  },
  setGrade(state, grade) {
    state.grade = grade;
  },
  setInputYear(state, inputYear) {
    state.inputYear = inputYear
  },
  resetStudentId(state) {
    state.studentId = null
  },
  resetSelectionId(state) {
    state.selectionId = null
  },
  resetAll(state) {
    state.isHost = true;
    state.inputYear = null;
    state.grade = null;
    state.studentId = null;
    state.selectionId = null;
  },
  setAll(state, payload) {

    this.commit('setStudentId', payload.studentId)
    this.commit('setSelectionId', payload.selections)
    this.commit('setHost', payload.host)
    this.commit('setGrade', payload.grade)
    this.commit('setInputYear', payload.inputYear)
    // this.studentId = payload.studentId;
    // this.grade = payload.grade;
    // this.isHost = payload.host;
    // this.inputYear = payload.inputYear;
    // let selectionId = [];
    // payload.selections.forEach(index => {
    //   selectionId.push(parseInt(index.id))
    // });
    // state.selectionId = selectionId
  }
};


export default mutations;
