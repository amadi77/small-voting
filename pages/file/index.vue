<template>
  <div>
    <b-row class="col-md-6 offset-3">
<!--      <p class="mr-3">-->
<!--        date :-->
<!--      </p>-->
      <!--      <p>{{nowDate}}</p>-->
<!--      <p>{{date}}</p>-->
<!--      <span>{{ date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>-->
<!--      <span>{{ date | moment("jdddd, jMMMM Do jYYYY") }}</span>-->

<!--      <hr/>-->
<!--      <date-picker v-model="datePersian"></date-picker>-->
<!--      <p>{{datePersian}}</p>-->

    </b-row>

    <b-form class="float-left col-6 m-3 p-3">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        v-on:change="uploadFile()"
      ></b-form-file>
      <b-button type="submit">submit</b-button>


      </b-form>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
    <!--

    <b-form class="float-left col-6 m-3 p-3" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Student Id:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="student.studentId"
          type="text"
          required
          placeholder="Enter studentId"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="student.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="student.grade"
          :options="grades"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="input Year:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="student.inputYear"
          required
          placeholder="Input Year"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="isLoading">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>


    <b-button @click="getStudents" type="success" class="m-3">get</b-button>
    <div v-for="student in students" :key="student.id" class="m-3 p-2 col-3">
      <div v-for="(value,key) in student">
        <p>{{key}}: {{value}}</p>
        <hr/>
      </div>
    </div>
  --></div>
</template>

<script>
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'


    const options = {
        headers: {'Content-Type': 'multipart/form-data'}
    };
    export default {
        name: "index",
        created() {
            // moment.locale('fa');
        },
        components: {
            datePicker: VuePersianDatetimePicker
        },
        data() {
            return {
                datePersian: '',
                date: new Date(),
                grades: ['BH', 'Ma', 'PHD'],
                isLoading: false,
                file: null,
                students: [],
                student: {
                    name: '',
                    studentId: '',
                    grade: '',
                    inputYear: 0
                }
            }
        },
        methods: {
            getStudents() {
                this.$axios.$get('http://localhost:8000/rest/students').then(
                    response => {
                        console.log("response : ", response)
                        this.students = response
                    }
                ).catch(er => console.log("error: ", er))
            },
            uploadFile() {
                setTimeout(() => {
                    let formData = new FormData();
                    formData.append("file", this.file);
                    // let data = {file: this.files[0]}
                    this.$axios.$post('/file/upload',
                        formData,
                        {
                            headers: {"Content-Type": "multipart/form-data"}
                        })
                        .then(response => {
                            console.log('SUCCESS!! ', response);
                        })
                        .catch(function () {
                            console.log('FAILURE!!');
                        });


                }, 1000)

            },
            onSubmit(evt) {
                this.isLoading = true;
                evt.preventDefault()
                console.log("student : ", this.student)
                this.$axios.$post('/students', this.student)
                    .then(response => console.log("response : ", response))
                    .catch(er => console.log("er : ", er))
                this.isLoading = false;
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.student.name = ''
                this.student.studentId = ''
                this.student.grade = null
                this.student.inputYear = []
                // Trick to reset/clear native browser form validation state
            }
        }
    }
</script>

<style scoped>

</style>
