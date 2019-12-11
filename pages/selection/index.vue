<template>
  <b-row class="candidate-box">
    <b-card
      border-variant="secondary"
      header="دانشگاه شهید رجایی"
      header-border-variant="secondary"
      align="center"
      class="col-10 pr-0 pl-0 m-3"
    >
      <b-card-text class="card-text">

        <b-col md="4" class="float-right text-right p-1 border-left"><h5>انتخابات دانشکده کامپیوتر</h5></b-col>
        <b-col md="8" class="float-left pr-3 text-right">
          <div class="vote-info col-4">
            <p> تعداد رای مجاز: {{limit}}</p>
            <p> تعداد رای باقیمانده: {{ remain}}</p>
          </div>
          <div class="votes-info col-8">
            <p class="col-5">انتخاب های شما:</p>
            <div class="votes">
              <b-badge v-for="vote in votes" :key="vote.id" variant="secondary">{{vote.student.name}}</b-badge>
            </div>
          </div>
        </b-col>

      </b-card-text>

      <b-card-body>
        <b-alert v-model="checkLimit" variant="danger" class="persianAlert" dismissible>
          {{checkLimitMessage}}
        </b-alert>
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="success"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >
          <p>رای شما با موفقیت ثبت شد. شما بعد از {{ dismissCountDown }} ثانیه به صفحه اصلی هدایت میشوید!</p>
          <b-progress
            variant="success"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
          ></b-progress>
        </b-alert>
        <template v-if="listCandidate.length>=0">
          <div class="col-md-3 col-sm-6 float-left" v-for="candidate in listCandidate" :key="candidate.id">
            <b-card
              :title="candidate.student.name"
              :img-src="baseUrl+'/rest/file/upload?file='+ (candidate.file!=null ? candidate.file.uuid : 'default')"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                {{candidate.description}}
              </b-card-text>

              <b-button href="#" class="col-md-5 col-sm-12" variant="primary" @click="addVote(candidate)">افزودن
              </b-button>
              <b-button href="#" class="col-md-5 col-sm-12" variant="danger" @click="removeVote(candidate)">کاستن
              </b-button>
            </b-card>
          </div>

        </template>

        <b-row class="submit-votes">
          <b-button @click="submitVote" :disabled="checkVoteNotEmpty" variant="info"> ثبت رای</b-button>
        </b-row>
      </b-card-body>
    </b-card>

  </b-row>

</template>

<script>

    export default {
        name: "index.vue",
        components: {},
        asyncData({store, $axios, redirect}) {
            let selectionId = store.getters.getSelectionId;
            console.log("selection page1 ",store.getters.getSelectionId)
            console.log("selection page2 ",selectionId)
            return $axios.post('/rest/candidate/selection/list',
                selectionId,
                {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then(response => {
                let outPut = {};
                console.log("selection page2 ",response)
                outPut.limit = response.data[0].selection.limit;
                outPut.listCandidate = response.data;
                return outPut
            }).catch(er => {
                console.log("selection page error : ",er)
                redirect(302, '/')
            })
        },
        // asyncData(context) {
        //     return axios.get()
        // },
        data() {
            return {
                // limit: 2,
                baseUrl: this.$axios.defaults.baseURL,
                votes: [],
                showDismissibleAlert: false,
                checkLimit: false,
                dismissSecs: 5,
                dismissCountDown: 0,
                checkLimitMessage: "",
                checkVoteNotEmpty: true,
                /* listCandidate: [
                     {
                         id: 1,
                         name: "candid 1",
                         description: "description 1 description 1 description 1 description 1 description 1 ",
                         studentId: "1",
                         selectionId: "1"
                     }, {
                         id: 2,
                         name: "candid 2candid 2candid 2",
                         description: "description 2 description 2 description 2 description 2 description 2 ",
                         studentId: "2",
                         selectionId: "2"
                     }
                 ]*/
            }
        },
        computed: {
            remain() {
                return this.limit - this.votes.length
            }
        },
        filters: {
            listSize(list) {
                return list.length - this.limit
            }
        },
        methods: {
            addVote(candidate) {
                this.checkLimit = false;
                if (this.votes.length > this.limit - 1) {
                    this.checkLimit = true;
                    this.checkLimitMessage = "حداکثر تعداد رای رعایت نشده است!";
                    return
                }
                if (this.votes.find(v => v.id === candidate.id) !== undefined) {
                    this.checkLimit = true;
                    this.checkLimitMessage = "کاندید تکراری است!";
                    return
                }
                this.votes.push(candidate);
                this.checkVoteNotEmpty = false
            },
            removeVote(candidate) {
                this.checkLimit = false;
                let index = this.votes.find(v => v.id === candidate.id);
                if (index !== undefined)
                    for (var i = 0; i < this.votes.length; i++)
                        if (this.votes[i].id === index.id)
                            this.votes.splice(i, 1);
                if (this.votes.length == 0)
                    this.checkVoteNotEmpty = true
            },
            submitVote() {
                if (this.votes.length == 0) {
                    this.checkLimit = true;
                    this.checkLimitMessage = "ابتدا یک کاندید انتخاب کنید سپس ارسال را بزنید!"
                }
                let payload = {};
                let url = '/rest/vote/list/host/'
                if (!this.$store.state.isHost) {
                    url = '/rest/vote/list/guest/'
                    payload.grade = this.$store.state.grade
                    payload.inputYear = this.$store.state.inputYear
                }
                payload.candidateId = []
                this.votes.forEach(index => {
                    payload.candidateId.push(index.id);
                });
                payload.studentId = this.$store.state.studentId
                payload.selectionId = this.$store.state.selectionId[0]

                console.log("payload ", payload)
                console.log("url ", url)
                this.$axios.post(url,
                    payload,
                    {
                        headers: {
                            'Content-type': 'application/json',
                        }
                    }).then(response => {
                    console.log("response ", response)
                    if (response.data) {
                        this.showDismissibleAlert = true
                        this.showAlert()
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 5000)
                    } else {
                        this.checkLimit = true
                        this.checkLimitMessage = 'شما قبلا رای داده اید!'
                    }

                }).catch(er => {
                    this.checkLimit = true
                    this.checkLimitMessage = 'در ثبت رای شما مشکلی به وجود آمده است لطفا مجددا امتحان کنید!'
                })
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            }
        }
    }
</script>

<style>
  .persianAlert {
    text-align: right;
    direction: rtl;

  }

  .candidate-box {
    max-width: 100%;
    justify-content: center;
    text-align: center;
    direction: rtl;
    margin: 2px;
  }

  .card-text {
    display: flex;
  }

  .vote-info {
    width: fit-content;
    float: right;
  }

  .votes-info {
    display: flex;
    float: right;
    /*margin: 0 50px;*/
    padding: 0px 10px;
  }

  .votes {
    margin: 0px 3px;
    padding: 2px 5px;
  }

  .votes span {
    margin: 0 3px;
    font-size: 15px;
  }

  .submit-votes {
    width: 100%;
    text-align: center;
    margin: 8px 0;
  }

  .submit-votes button.disabled {
    cursor: not-allowed;
  }

  .submit-votes button {
    margin: auto;
    width: 50%;

  }
</style>
