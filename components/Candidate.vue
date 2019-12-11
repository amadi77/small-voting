<template>
  <div>

    <h1>candidate component</h1>
    <div class="col">
      <b-card
        :title="candidate.name"
        img-src="../static/pp.jpeg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          {{candidate.description}}
        </b-card-text>

        <b-button href="#" variant="primary" @click="addVote">افزودن</b-button>
        <b-button href="#" variant="danger">کاستن</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Candidate",
        data() {
            return {}
        },
        fetch(context) {

        },
        props: {
            candidate:
                {
                    type: Object,
                    default: {}
                }
        },
        methods: {
            ...mapActions(
                "addVote",
                "removeVote"
            )
        }
    }
</script>

<style scoped>

</style>
