 const getters =  {
  getStudentId(state) {
    console.log("student")
    return state.studentId
  },
  getSelectionId(state){
    return state.selectionId
  },
  getGrade(state){
    return state.grade
  },
  getHost(state){
    console.log("host")
    return state.isHost
  },
  getInputYear(state){
    return state.inputYear
  }
};

export default getters;
