<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand tag="h1" to="/" class="mb-0">
        <!--        <img src="../static/icon.gif" width="50px">-->
        <!--        دانشگاه شهید رجایی-->
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">home</b-nav-item>
        <b-nav-item to="/admin" v-if="!student">admin</b-nav-item>
        <b-nav-item to="/selection" v-if="enter">selection</b-nav-item>
        <b-nav-item to="/file">file</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <nuxt/>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                student: false,
                enter: true
            }
        }
    }
</script>
<style>
  html {
    /*font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',*/
    /*Roboto, 'Helvetica Neue', Arial, sans-serif;*/
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    background-color: #e0dfdf;
  }
  .card:hover ,.card:active,.card:visited{
    transition: all 0.6s cubic-bezier(0.25, 0.1, 0.05, 1.13);
    box-shadow: 2px 2px 7px #2b2525;
  }
  .card{
    transition: all 0.6s cubic-bezier(0.25, 0.1, 0.05, 1.13);
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
  .text-sm-right.dir-ltr {
    direction: rtl;
  }

  .card-border {
    border: 0.03rem solid #b1bcbdc7;
    background-color: #fff;
    overflow: hidden;
  }


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

  div.justify-content-center.text-center h5 {
    display: contents;
  }

  .ltr-table {
    direction: ltr;
  }
</style>
