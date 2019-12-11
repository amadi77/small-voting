<template>
  <b-row class="candidate-box">
    <b-card
      border-variant="secondary"
      align="center"
      class="col-10 p-0 pb-3 mt-3 mb-3"
    >
      <b-card-header class="text-center justify-content-center p-3">
        <h5 class="w-50 ">انتخابات</h5>
        <b-button class="float-right" variant="success" v-b-modal.modal-1>ایجاد</b-button>
        <!--        <b-button class="float-right mr-3" variant="success" @click="refreshTable">refresh</b-button>-->
        <!--        to="/admin/create"-->
      </b-card-header>
      <div class="m-3">
        <b-table
          responsive
          hover
          head-variant="light"
          class="ltr-table"
          table-variant="light"
          ref="selectionTable"
          :items="selections"
          :fields="fields">


          <template v-slot:cell(name)="row">
            {{ row.value }}
          </template>
          <template v-slot:cell(actions)="row">
            <nuxt-link size="sm" variant="primary" class="btn btn-primary mr-1" :to="'/admin/'+row.item.id">
              مشاهده
            </nuxt-link>
            <b-button size="sm" variant="danger" class="mr-1" @click="info(row.item, row.index,'modal-2')"
                      v-b-modal.modal-2>
              حذف
            </b-button>
            <!--            <b-button size="sm" @click="row.toggleDetails">-->
            <!--              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details-->
            <!--            </b-button>-->
          </template>
        </b-table>
      </div>
    </b-card>

    <b-modal
      header-bg-variant="success"
      ref="modal-1"
      header-text-variant="light"
      hide-footer
      id="modal-1"
      title="add">
      <p class="my-4">Hello from modal!</p>
    </b-modal>


    <b-modal
      ref="modal-2"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
      id="model-2"
      @hide="resetInfo"
      title="delete">
      <p class="w-100">آیا از حذف انتخابات با شماره {{selectionId}} مطمئن هستید؟</p>
      <b-button class="mt-2" variant="outline-danger" @click="deleteSelection('modal-2')">حذف</b-button>
      <b-button class="mt-2" variant="outline-warning" @click="toggleModal('modal-2')">انصراف</b-button>
    </b-modal>
  </b-row>
</template>

<script>
    export default {
        name: "index",
        asyncData({store, $axios, redirect}) {
            return $axios.get('/rest/selections').then(response => {
                let selections = []
                selections = response.data
                return {selections: selections}
            }).catch(er => {
                redirect('/')
            })
        },
        data() {
            return {
                fields: [
                    {key: 'id', label: 'شماره', sortable: true, sortDirection: 'desc', class: 'text-center'},
                    {key: 'title', label: 'توضیح', sortable: true, sortDirection: 'desc'},
                    {key: 'limit', label: 'تعداد مجاز', sortable: true, sortDirection: 'desc'},
                    // {key: 'fromDate', label: 'از تاریخ', sortable: true, sortDirection: 'desc'},
                    // {key: 'toDate', label: 'تا تاریخ', sortable: true, sortDirection: 'desc'},
                    {
                        sortable: true,
                        sortByFormatted: true,
                        filterByFormatted: true
                    },
                    {key: 'actions', label: 'Actions'}],
                selectionId: null,
                infoModal: {}
            }
        },
        methods: {
            hideModal(modelName) {
                this.$refs[modelName].hide()
            },
            toggleModal(modelName) {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs[modelName].toggle('#toggle-btn')
            },
            deleteSelection(modelName) {
                this.$axios.$delete('/rest/selections/' + this.selectionId).then(response => {
                    if (response) {
                        this.$axios.$get('/rest/selections').then(response => {
                            console.log("response deleted : ", response)
                            this.selections = response.data
                        })
                    }
                })
                this.hideModal(modelName)
                this.refreshTable()
            },
            refreshTable() {
                this.$refs.selectionTable.refresh()

            },

            setSelectionId(row) {
                console.log("row, ", row)
            },
            info(item, index, modelName) {
                this.infoModal.title = `Row index: ${index}`
                this.infoModal.id = index.toString()
                this.selectionId = item.id
                this.toggleModal(modelName)
            },
            resetInfo() {
                this.infoModal = {}
                this.selectionId = null
            }
        }
    }
</script>

<style>

</style>
