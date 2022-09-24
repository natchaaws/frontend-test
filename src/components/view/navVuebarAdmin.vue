<template>
 <!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-light navbar-light">
    <div class="container">
      <!-- กลับหน้าแรก -->
      <router-link class="navbar-brand" to="/homead"
        ><img
          id="logoUser-logo"
          src="@/assets/logoAdmin-removebg.png"
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
              <strong class="d-none d-sm-block ms-1">
               {{ adAuthen.admintor }}
              </strong>
            </a>
          </li>
          <!--  หน้าแรก -->
          <li class="nav-item">
            <router-link to="/homead" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-house" /> หน้าแรก
            </router-link>
          </li>
          <!--  เพิ่มรายการอบรม -->
          <li class="nav-item">
            <router-link to="/createTrain" class="nav-link">
            <font-awesome-icon icon="fa-solid fa-circle-plus" /> เพิ่มอบรม 
            </router-link>
          </li>
          <!-- จัดการรายการอบรม -->
          <li class="nav-item">
            <router-link to="/viewTrain" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-file-pen" /> จัดการอบรม 
            </router-link>
          </li>
          <!-- รายชื่อ -->
          <li class="nav-item">
            <router-link to="/listreg" class="nav-link">
            <font-awesome-icon icon="fa-solid fa-clipboard-list"  /> รายชื่อ 
            </router-link>
          </li>
          <!-- กราฟ -->
          <li class="nav-item">
            <router-link to="/list_train_chart" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-chart-pie" /> กราฟ 
            </router-link>
          </li>
         <!--  Login -->
          <li class="nav-item ms-3">
            <button class="btn btn-outline-danger" @click="logout">Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Navbar -->   
</template>

<script>
    import axios from "axios";
    export default {
      data() {
        return {
          adAuthen: '',
        };
      },
      created() {
        axios
          .post("admin-authen", { headers: { Authorization: "Bearer " + localStorage.getItem("token") }, })
          .then((res) => {
            this.adAuthen = res.data.decoded;
          });
      },
      methods: {
        logout() {
          if (window.confirm("ออกจากระบบ")) {
            localStorage.removeItem("token");
            this.$router.push("/loginAdmin");
          }
        },
      },
    };
    
    </script>
