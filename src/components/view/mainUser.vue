<template>
  <div class="main-yellow">
    <!-- Navbar -->
    <navVuebar />
    <!-- Navbar -->

    <div class="container">
      <section class="card-white-main">
        <div class="font-color-user my-2">
          <div class="p-3">
            <h1>ยินดีต้อนรับ <font-awesome-icon icon="fa-solid fa-face-smile-beam" /></h1>
            <h6>
              <font-awesome-icon icon="fa-solid fa-id-card-clip" /> :
              {{ userAuthen.userId }}<br />
              <font-awesome-icon icon="fa-solid fa-envelope" /> : {{ userAuthen.email }}
              <br />
              <font-awesome-icon icon="fa-solid fa-user" /> :
              {{ userAuthen.firstName }}&nbsp;{{ userAuthen.lastName }}
            </h6>
          </div>
        </div>
      </section>

      <div class="py-2">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 g-3">

            <!-- ดูหลักสูตรอบรม -->
            <div class="col">
              <div class="contain">
                <router-link to="/listTraintUser" class="nav-link">
                  <div class="card-main-user">
                    <font-awesome-icon
                      icon="fa-solid fa-chalkboard-user"
                      style="font-size: 50px; color: #6733e2"
                      class="my-3"
                    />

                    ดูหลักสูตรอบรม
                    <div class="overlay">
                      <div class="text">
                        <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                        <h6>ดูหลักสูตรอบรม</h6>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- ประวัติลงทะเบียนอบรม  -->
            <div class="col">
              <div class="contain">
                <router-link
                  :to="{ name: 'showhis', params: { id: userAuthen.userId } }"
                  class="nav-link"
                >
                  <div class="card-main-user">
                    <font-awesome-icon
                      icon="fa-solid fa-clock-rotate-left"
                      style="font-size: 50px; color: #6733e2"
                      class="my-3"
                    />
                    ประวัติลงทะเบียนอบรม
                    <div class="overlay">
                      <div class="text">
                        <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                        <h6>ประวัติลงทะเบียนอบรม</h6>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- ข้อมูลส่วนตัว -->
            <div class="col">
              <div class="contain">
                <router-link
                  :to="{ name: 'showuser', params: { id: userAuthen.userId } }"
                  class="nav-link"
                >
                  <div class="card-main-user">
                    <font-awesome-icon
                      icon="fa-solid fa-address-card"
                      style="font-size: 50px; color: #6733e2"
                      class="my-3"
                    />
                    ข้อมูลส่วนตัว
                    <div class="overlay">
                      <div class="text">
                        <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                        <h6>ข้อมูลส่วนตัว</h6>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import navVuebar from "@/components/view/navVuebarUser.vue";

export default {
  components: {
    navVuebar,
  },
  setup() {
    /* reload */
    (function () {
            if (window.localStorage) {
              if (!localStorage.getItem("firstLoad")) {
                localStorage["firstLoad"] = true;
                window.location.reload();
              } else localStorage.removeItem("firstLoad");
            }
          })();
          /* end reload */
    // Get toast interface
    const toast = useToast();

    return { toast };
  },

  data() {
    return {
      userAuthen: null,
      Users: [],
    };
  },
  created() {

    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.userAuthen = res.data.decoded;
        if (res.data.status == "ok") {
          this.toast.success(
            "ยินดีต้อนรับคุณ" + ' ' +
              this.userAuthen.firstName +
              " " +
              this.userAuthen.lastName,
            {
              position: "bottom-left",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            }
          );
        } else {
          /* reload */
          (function () {
            if (window.localStorage) {
              if (!localStorage.getItem("firstLoad")) {
                localStorage["firstLoad"] = true;
                window.location.reload();
              } else localStorage.removeItem("firstLoad");
            }
          })();
          /* end reload */
          this.$router.push("/");
        }
      });
  },
  methods: {
    logout() {
      if (window.confirm("ออกจากระบบ")) {
        localStorage.removeItem("token");
        this.$router.push("/");
        this.$router.reload();
      }
    },
  },
};
</script>

<style>
@import "@/css/main.css";
</style>
