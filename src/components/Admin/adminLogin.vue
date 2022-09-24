<template>
  <div class="bg-admin">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="admin-card-login">
          <div class="d-flex justify-content-center">
            <h1 class="title">Admin Login</h1>
            <hr />
          </div>

          <div class="d-flex justify-content-center form_container">
            <form @submit.prevent="handleSubmitForm">
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text-ad"><i class="fas fa-user"></i></span>
                </div>
                <input
                  v-model="admintor"
                  type="text"
                  class="form-control input_admintor"
                  placeholder="admin"
                />
              </div>
              <!--  password -->
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text-ad"><i class="fas fa-key"></i></span>
                </div>
                <input
                  v-model="password"
                  type="password"
                  class="form-control input_pass"
                  placeholder="Password"
                />
              </div>

              <div class="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" class="btn login_btn_ad">
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>

            <div class="d-flex justify-content-center links mt-2">
              เข้าสู่ระบบ&nbsp;<router-link to="/">Users</router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  setup() {
    /* reload */
    /*  (function () {
      if (window.localStorage) {
        if (!localStorage.getItem("firstLoad")) {
          localStorage["firstLoad"] = true;
          window.location.reload();
        } else localStorage.removeItem("firstLoad");
      }
    })(); */
    /* end reload */
  },
  data() {
    return {
      admintor: "",
      password: "",
      /* error: null */
    };
  },
  methods: {
    async handleSubmitForm() {
      await axios
        .post("/adlogin", {
          admintor: this.admintor,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          if (response.data.status == "ok") {
            this.$router.push("/homead");
          } else {
            alert("Login admin failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import "@/css/admin.css";
</style>
