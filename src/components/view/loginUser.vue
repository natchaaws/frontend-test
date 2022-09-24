<template>
  <div class="bg-user">
    <div class="container">
        <div class="d-flex justify-content-center">
          <div class="user_card_lg">
            <div class="d-flex justify-content-center">
              <h1 class="title">Login</h1>
            </div>
            <div class="d-flex justify-content-center form_container">
              <form @submit.prevent="handleSubmitForm">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text-lg"
                      ><i class="fas fa-user-circle"></i
                    ></span>
                  </div>
                  <input
                    v-model="email"
                    type="email"
                    class="form-control input_user"
                    placeholder="Email"
                  />
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text-lg"><i class="fas fa-key"></i></span>
                  </div>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control input_pass"
                    placeholder="Password"
                  />
                </div>

                <div class="d-flex justify-content-center login_container mt-3 ">
                  <button type="submit" name="button" class="btn login_btn">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>

              <div class="d-flex justify-content-center links mt-2">
                ยังไม่มีบัญชีใช่ไหม? <a href="/registerUser" class="ml-2">สมัคร</a>
              </div>
              <div class="d-flex justify-content-center links">
                <router-link to="/loginAdmin">Admin</router-link>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      /* error: null */
    };
  },
  methods: {
    async handleSubmitForm() {
      await axios
        .post("login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          if (res.data.status == "ok") {
            this.$router.push("/home");
          } else {
            alert("Login failed");
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
@import "@/css/login.css";
@import "@/css/main.css";
</style>
