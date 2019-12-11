<template>

  <b-row class="candidate-box">
    <div class="p-2 col-md-6 col-sm-12">
      <b-card
        class="card-border"
        align="center"
      >
        <b-card-header class="text-center justify-content-center p-3">
          <h5 class="w-50 ">شرایط</h5>
          <b-button class="float-right" variant="success" v-b-modal.modal-1>ایجاد</b-button>
          <!--        <b-button class="float-right mr-3" variant="success" @click="refreshTable">refresh</b-button>-->
          <!--        to="/admin/create"-->
        </b-card-header>
        <b-card-body>
          <b-table striped hover
                   :items="selection.conditionType"
                   class="ltr-table"
                   :fields="conditionKey">
            <template v-slot:cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <!-- A custom formatted column -->
            <template v-slot:cell(inputYear)="data">
              {{ data.value }}
            </template>

            <!-- A virtual composite column -->
            <template v-slot:cell(grade)="data">
              {{data.item.grade | translateGrade}}
            </template>
            <template v-slot:cell(actions)="row">

              <b-button size="sm"
                        variant="danger" class="mr-1"
                        @click="infoCondition(row.item,row.index,'modal-2')"
                        v-b-modal.modal-2>
                حذف
              </b-button>
            </template>
          </b-table>

        </b-card-body>
      </b-card>
    </div>
    <div class="p-2 col-md-6 col-sm-12">
      <b-card
        class="card-border"
        align="center"
      >
        <b-card-header class="text-center justify-content-center p-3">
          <h5 class="w-50 ">کاندیدها</h5>
          <b-button class="float-right" variant="success" @click="getValidStudent" v-b-modal.modal-4>ایجاد</b-button>
          <!--        <b-button class="float-right mr-3" variant="success" @click="refreshTable">refresh</b-button>-->
          <!--        to="/admin/create"-->
        </b-card-header>
        <b-card-body>
          <b-table
            class="ltr-table"
            :items="selection.candidateItems"
            :fields="candidateKey"
            striped responsive="sm">
            <template v-slot:cell(studentDetail)="row">
              <b-button size="sm" @click="row.toggleDetails" variant="primary" class="mr-2">
                {{ row.detailsShowing ? 'پنهان کردن' : 'مشاهده'}}
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card
                :img-src="baseUrl+'/rest/file/upload?file='+ (row.item.fileId !=null ? row.item.fileId : 'default')"
                img-alt="Card image" img-bottom>
                <b-row class="mb-2 pb-1 border-bottom">
                  <b-col>{{ row.item.student.name }}</b-col>
                  <b-col sm="5" class="text-sm-right dir-ltr"><b>نام:</b></b-col>
                </b-row>
                <b-row class="mb-2 pb-1 border-bottom">
                  <b-col>{{ row.item.student.studentId }}</b-col>
                  <b-col sm="5" class="text-sm-right dir-ltr"><b>شماره دانشجویی:</b></b-col>
                </b-row>
                <b-row class="mb-2 pb-1 border-bottom">
                  <b-col>{{ row.item.student.grade | translateGrade}}</b-col>
                  <b-col sm="5" class="text-sm-right dir-ltr"><b>مقطع تحصیلی:</b></b-col>
                </b-row>
                <b-row class="mb-2 pb-1 border-bottom">
                  <b-col>{{ row.item.student.inputYear | translateGrade}}</b-col>
                  <b-col sm="5" class="text-sm-right dir-ltr"><b>سال ورود:</b></b-col>
                </b-row>
                <b-row class="mb-2 pb-1 border-bottom">
                  <!--  <b-card-img>

                    </b-card-img>
                    <b-img width="50"
                           :src="baseUrl+'/rest/file/upload?file='+ (row.item.fileId !=null ? row.item.fileId : 'default')"/>-->
                </b-row>
                <b-button size="sm" @click="row.toggleDetails" variant="primary">پنهان کردن</b-button>
              </b-card>
            </template>

            <template v-slot:cell(actions)="row">

              <b-button size="sm"
                        variant="danger" class="mr-1"
                        @click="infoCandidate(row.item,row.index,'modal-3')"
                        v-b-modal.modal-3>
                حذف
              </b-button>
            </template>
          </b-table>
        </b-card-body>
      </b-card>
    </div>
    <b-modal
      ref="modal-2"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
      id="model-2"
      @hide="resetConditionInfo"
      title="delete">
      <p class="w-100">آیا از حذف شرایط انتخابات شماره {{conditionType.id}} مطمئن هستید؟</p>
      <b-button class="mt-2" variant="outline-danger" @click="deleteCondition('modal-2')">حذف</b-button>
      <b-button class="mt-2" variant="outline-warning" @click="toggleModal('modal-2')">انصراف</b-button>
    </b-modal>
    <b-modal
      ref="modal-3"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
      id="model-3"
      @hide="resetConditionInfo"
      title="delete">
      <p class="w-100">آیا از حذف کاندید انتخابات شماره {{candidate.id}} مطمئن هستید؟</p>
      <b-button class="mt-2" variant="outline-danger" @click="deleteCandidate('modal-3')">حذف</b-button>
      <b-button class="mt-2" variant="outline-warning" @click="toggleModal('modal-3')">انصراف</b-button>
    </b-modal>
    <b-modal
      ref="modal-1"
      header-bg-variant="success"
      header-text-variant="light"
      hide-footer
      id="modal-1"
      @hide="resetConditionInfo"
      title="افزودن شرط">
      <b-form v-if="show">
        <b-form-select
          id="input-1"
          v-model="conditionType"
          :options="conditionTypes"
          required
        ></b-form-select>
        <b-button type="submit" class="mt-2" variant="success" @click="createSelectionCondition('modal-1')">تایید
        </b-button>

      </b-form>

    </b-modal>
    <b-modal
      ref="modal-4"
      header-bg-variant="success"
      header-text-variant="light"
      hide-footer
      id="modal-4"
      @hide="resetConditionInfo"
      title="افزودن کاندید">
      <!--      <b-form v-if="show">-->
      <b-form-group id="input-group-1" class="text-right" label="دانشجو" label-for="input-1">

        <b-form-select
          id="input-1"
          v-model="student.studentId"
          value-field="id"
          :options="validStudents"
          required
        >
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-2" class="text-right" label="توضیحات" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="student.description"
          placeholder="اهداف  کاندید..."
          rows="3"
          max-rows="6">

        </b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-3" class="text-right" label="تصویر" label-for="input-3">
        <b-form-file
          id="input-3"
          v-model="file"
          :state="Boolean(file)"
          class="text-left"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          v-on:change="uploadFile()"
        ></b-form-file>
      </b-form-group>
      <b-button type="submit" class="mt-2" variant="success" @click="createCandidate('modal-4')">تایید
      </b-button>

      <!--      </b-form>-->

    </b-modal>
  </b-row>
</template>
<script>
    export default {
        name: 'index.vue',
        async asyncData({store, $axios, redirect, params, $route}) {
            let output = {};
            const selection = await $axios.$get('/rest/selections/' + params.id);
            const conditionList = await $axios.$get('/rest/conditionType');
            let newConditionList = [];
            conditionList.forEach(item => {
                switch (item.grade) {
                    case "BH":
                        item.grade = "لیسانس";
                        break;
                    case "MA":
                        item.grade = "ارشد";
                        break;
                    case "PHD":
                        item.grade = "دکترا";
                        break;
                }
                newConditionList.push({
                    value: item.id,
                    text: item.inputYear + ' - ' + item.grade
                })
            });
            return {
                selection: selection,
                conditionTypes: newConditionList
            }
        },
        data() {
            return {
                show: true,
                baseUrl: this.$axios.defaults.baseURL,
                conditionType: {},
                conditionKey: [
                    {key: 'id', label: 'شماره', sortable: true},
                    {key: 'grade', label: 'مقطع تحصیلی'},
                    {key: 'inputYear', label: 'سال ورود'},
                    {key: 'actions', label: ''}],
                candidateKey: [
                    {key: 'id', label: 'شماره', sortable: true},
                    {key: 'description', label: 'توضیح'},
                    {key: 'voteCount', label: 'تعداد رای'},
                    {key: 'studentDetail', label: 'جزئیات'},
                    {key: 'actions', label: ''}],
                candidate: {},
                validStudents: [],
                student: {
                    description: '',
                    fileId: 'default',
                    studentId: ''
                },
                file: null,
                fileCheck: true,
                fileUploaded: true
            }
        },
        methods: {
            deleteFromList(list, key, value) {
                let i = 0;
                for (; i < list.length; i++) {
                    if (list[i][key] == value)
                        break;
                }
                if (i < list.length)
                    list.splice(i, 1)
            },
            resetConditionInfo() {
                this.conditionType = {
                    id: null,
                    grade: '',
                    inputYear: 0,
                    index: null
                }
            },
            hideModal(modelName) {
                this.$refs[modelName].hide()
            },
            toggleModal(modelName) {
                this.$refs[modelName].toggle('#toggle-btn')
            },
            deleteCondition(modelName) {
                this.$axios.$delete('/rest/selectionCondition?selection=' +
                    this.$route.params.id +
                    '&conditionType=' +
                    this.conditionType.id).then(response => {
                }).catch(er => {
                    console.log("error delete ", er)
                });
                this.deleteFromList(this.selection.conditionType, 'id', this.conditionType.id);
                this.hideModal(modelName);
                this.resetConditionInfo()

            },
            infoCondition(item, index, modelName) {
                this.conditionType = item;
                this.toggleModal(modelName)
            },
            createSelectionCondition(modelName) {
                this.$axios.$post('/rest/selectionCondition', {
                    conditionTypeId: this.conditionType,
                    selectionId: this.$route.params.id
                }).then(response => {
                    this.selection.conditionType.push(response.conditionType)
                }).catch(er => {
                    console.log(er)
                });
                this.hideModal(modelName);
                this.resetConditionInfo()
            },
            infoCandidate(item, index, modelName) {
                this.candidate = item;
                // this.conditionType.index = index
                this.toggleModal(modelName)
            },
            deleteCandidate(modelName) {
                this.$axios.$delete('/rest/candidate/' + this.candidate.id).then(response => {
                    this.deleteFromList(this.selection.candidateItems, 'id', this.candidate.id)
                });
                this.hideModal(modelName)
            },
            getValidStudent() {
                this.$axios.$post('/rest/students/hasCondition', this.selection.conditionType)
                    .then(response => {
                        let students = [];
                        let grade;
                        response.forEach(item => {
                            switch (item.grade) {
                                case "BH":
                                    grade = "لیسانس";
                                    break;
                                case "MA":
                                    grade = "ارشد";
                                    break;
                                case "PHD":
                                    grade = "دکترا";
                                    break
                            }
                            students.push({
                                id: item.id,
                                text: item.name + " - " + item.studentId + " - " + grade + " - " + item.inputYear
                            })
                        });
                        this.validStudents = students;
                        this.student.fileId = []
                    }).catch(error => {
                })
            },
            createCandidate(modelName) {
                if (this.fileUploaded) {
                    this.student.selectionId = this.$route.params.id;
                    if(typeof this.student.fileId != String)
                        this.student.fileId = "default"
                    console.log("this.student.file : ", typeof this.student.fileId == String);
                    console.log("this.student : ", this.student);
                    this.$axios.$post('/rest/candidate', this.student)
                        .then(response => {
                            console.log("response : ", response);
                            this.selection.candidateItems.push(response)
                        }).catch(error => console.log("error ", error));
                    this.student = {
                        description: '',
                        fileId: 'default',
                        studentId: ''
                    };
                    this.toggleModal(modelName);
                    this.file = [];
                    this.fileUploaded = true;
                    console.log("this.selection : ", this.selection.candidateItems)
                }
            },
            uploadFile() {
                if (this.fileCheck) {
                    this.fileUploaded = false;
                    setTimeout(() => {
                        let formData = new FormData();
                        formData.append("file", this.file);
                        this.$axios.$post('/rest/file/upload',
                            formData,
                            {
                                headers: {"Content-Type": "multipart/form-data"}
                            })
                            .then(response => {
                                this.student.fileId = (response).toString();
                                console.log('file upload 1 : ', this.student.fileId);
                                this.fileUploaded = true
                            })
                            .catch(function () {
                                console.log('FAILURE!!');
                                this.fileCheck = !this.fileCheck
                            });
                    }, 1000)
                }
                this.fileCheck = !this.fileCheck;
                console.log('file upload 2 : ', this.student.fileId);
            }
        },
        filters: {
            translateGrade(grade) {
                switch (grade) {
                    case "BH":
                        return "لیسانس";
                    case "MA":
                        return "ارشد";
                    case "PHD":
                        return "دکترا"
                }

            },
            showLog(message) {
                console.log("message : ", message);
                return message
            }
        }
    }
</script>

<style>
</style>
