<template>
  <nav class="navbar navbar-expand-lg bg-light navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        ><img
          id="logoUser-logo"
          src="@/assets/Register-removebg.png"
          alt="logoUserLogo"
          draggable="false"
          height="35"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link d-sm-flex align-items-sm-center" href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1239/1239267.png?w=740&t=st=1661350915~exp=1661351515~hmac=690132429e23145f53b30f8f6e8abb333ccc368e23012fdb54fc24bcde2d8811"
                class="rounded-circle"
                height="22"
                alt=""
                loading="lazy"
              />
              <strong class="ps-1">
                {{ userAuthen.firstName }} {{ userAuthen.lastName }}
              </strong>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-house-chimney" /> หน้าแรก
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listTraintUser" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-chalkboard-user" /> อบรม
            </router-link>
          </li>
          <!-- <li class="nav-item">
           
          </li> -->
          <!--  <li class="nav-item">
              <router-link :to="{ name: 'regTrainUser' }" class="nav-link">
                <font-awesome-icon
                icon="fa-solid fa-registered"
              /> ลงทะเบียน
              </router-link>
          </li> -->
          <li class="nav-item ms-3">
            <button class="btn btn-outline-danger" @click="logout">Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userAuthen: "",
    };
  },

  created() {
    /*  userAuthen */
    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.userAuthen = response.data.decoded;
      });
  },
  methods: {
    logout() {
      if (window.confirm("ออกจากระบบ")) {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
