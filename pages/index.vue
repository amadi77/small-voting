<template>
  <div class="container">
    <!--      <b-col offset="3" md="3" sm="6">-->

    <b-col md="6" sm="12" class="info-box card-border">
      <!--        <b-form @submit="onSubmit" @reset="onReset">-->
      <div class="col-12 float-left">
        <img src="../static/icon.gif" width="130px">
        <br/><br/>
        <h3>سامانه رای گیری دانشکده کامپیوتر</h3>
        <div class="col-12">
          <b-alert v-model="showError" variant="danger" dismissible>
            {{errorMassage}}
          </b-alert>
        </div>
      </div>

      <b-form class="col-12 float-left mt-3" @submit="onSubmit">
        <b-form-group id="userStudentId-group" label="شماره دانشجویی" dir="rtl">
          <b-form-input
            v-model.trim="$v.form.studentId.$model"
            :state="$v.form.studentId.$dirty ? !$v.form.studentId.$error : null"
            id="userStudentId-input"/>
        </b-form-group>
        <b-form-group id="studentType-group">
          <b-form-radio-group v-model="form.type" id="checkboxes-4">
            <b-form-radio value="host">دانشجو اصلی</b-form-radio>
            <b-form-radio value="guest">مهمان</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group id="studentYear-group" label="سال ورود" v-if="form.type=='guest'">
          <b-form-select
            v-model="form.inputYear"
            :options="years"
            required
            id="studentYear-input"/>
        </b-form-group>
        <b-form-group id="studentGrade-group" label="مقطع تحصیلی" v-if="form.type=='guest'">
          <b-form-select
            v-model="form.grade"
            :options="grades"
            required
            id="studentGrade-input"/>
        </b-form-group>
        <b-button type="submit" variant="primary" class="col-12" :disabled="$v.form.$invalid || isLoading">تایید
        </b-button>
        <!--          <b-button type="reset" variant="danger">Reset</b-button>-->
      </b-form>
    </b-col>
  </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import {validationMixin} from 'vuelidate'
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    // import numeric from "vuelidate/src/validators/numeric"

    export default {
        mixins: [validationMixin],
        data() {
            return {
                testData: process.env.BASE_URL,
                isLoading: false,
                types: ['guest', 'host'],
                grades: {'BH': 'لیسانس', 'MA': 'ارشد', 'PHD': 'دکترا'},
                years: [93, 94, 95, 96, 97, 98],
                form: {
                    studentId: '',
                    type: null,
                    inputYear: 0,
                    grade: null,
                },
                showError: false,
                errorMassage: ''
            }
        },
        validations: {
            form: {
                studentId: {
                    required,
                    minLength: minLength(8),
                    numeric
                }
            }
        },
        methods: {
            onSubmit(evt) {
                this.isLoading = true
                evt.preventDefault()
                this.$v.form.$touch()
                if (this.$v.form.$anyError) {
                    return
                }
                if (this.form.type == 'guest') {
                    this.$axios.get('/rest/selections/condition?grade=' + this.form.grade + '&year=' + this.form.inputYear + '&studentId=' + this.form.studentId)
                        .then(response => {
                                // this.$store.commit('setStudentId', this.form.studentId)
                                // this.$store.commit('setSelectionId', response.data)
                                console.log("response guest: ", response)
                            if (response.data.length > 0) {
                                this.$store.commit('setAll', {
                                    studentId: this.form.studentId,
                                    selections: response.data,
                                    grade: this.form.grade,
                                    inputYear: this.form.inputYear,
                                    host: false
                                })
                                this.$router.push({
                                    path: '/selection'
                                })
                            }else {
                                this.showError = true
                                this.errorMassage = 'شما قبلا رای داده اید و نمیتوانید مجددا وارد شوید!'
                            }
                            }
                        )
                        .catch(er => {
                            console.log("guest error : ", er)
                            this.showError = true
                            this.errorMassage = 'دانشجویی با شماره دانشجویی وارد شده به عنوان دانشجوی مهمان پیدا نشد!'
                        })
                } else if (this.form.type = 'host') {
                    this.$axios.get('/rest/selections/student/' + this.form.studentId)
                        .then(response => {
                                console.log("response host 1 ", response)
                                if (response.data.length > 0) {
                                    // this.$store.commit('setSelectionId', response.data)
                                    this.$store.commit('setAll',
                                        {
                                            studentId: this.form.studentId,
                                            selections: response.data,
                                            grade: null,
                                            inputYear: null,
                                            host: true
                                        })

                                    console.log("response host 2 ")
                                    this.$router.push({
                                        path: '/selection'
                                    })
                                    console.log("response host 3 ")

                                } else {
                                    this.showError = true
                                    this.errorMassage = 'شما قبلا رای داده اید و نمیتوانید مجددا وارد شوید!'
                                }
                            }
                        )
                        .catch(er => {
                            console.log("host error : ", er)
                            this.showError = true
                            this.errorMassage = 'دانشجویی با شماره دانشجویی وارد شده به عنوان دانشجوی اصلی پیدا نشد!'
                        })
                }
                // this.vuex.studentId = this.form.studentId
                this.isLoading = false
            },
            onReset(evt) {
                evt.preventDefault()

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.$store.commit('resetStudentId')
                this.$store.commit('resetSelectionId')
            })
        }
    }
</script>

<style>

  .container {
    margin: 0 auto;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .info-box {
    padding: 40px;
    border: 1px solid rgba(216, 190, 190, 0.56078);
    border-radius: 5px;
    display: block;
    box-shadow: 2px 2px 2px 3px #ded8d8;
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
  }

</style>
