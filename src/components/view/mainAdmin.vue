<template>
  <div class="main-purple">
   <!-- navbar -->
   <navVuebarAdmin />
   <!-- end navber -->
  

    <div class="container mt-1">
        <div class="row font-color-ad">
          <div class="col-sm">
            <h4>ยินดีต้อนรับ <font-awesome-icon icon="fa-solid fa-face-smile" /></h4>
          </div>
          <div class="col-sm"></div>
          <div class="col-sm">
            <h6>
              <font-awesome-icon icon="fa-solid fa-id-card" /> : {{ adAuthen.admintorId
              }}<br />
              <font-awesome-icon icon="fa-solid fa-user-gear" /> : {{ adAuthen.admintor }}
            </h6>
          </div>
        </div>
        <hr />

          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 g-3">
              <!--  เพิ่มรายการอบรม -->
              <div class="col">
                <div class="contain">
                  <router-link to="/createTrain" class="nav-link">
                    <div class="card-main-admin">
                      <font-awesome-icon
                        icon="fa-solid fa-circle-plus"
                        style="font-size: 40px; color: #ffb92f"
                        class="my-3"
                      />
                      เพิ่มรายการอบรม
                      <div class="overlay">
                        <div class="text-admin">
                          <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                          <h6>เพิ่มรายการอบรม</h6>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- จัดการรายการอบรม  -->
              <div class="col">
                <div class="contain">
                  <router-link to="/viewTrain" class="nav-link">
                    <div class="card-main-admin">
                      <font-awesome-icon
                        icon="fa-solid fa-file-pen"
                        style="font-size: 40px; color: #ffb92f"
                        class="my-3"
                      />
                      จัดการอบรม
                      <div class="overlay">
                        <div class="text-admin">
                          <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                          <h6>จัดการอบรม</h6>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- รายชื่อ -->
              <div class="col">
                <div class="contain">
                  <router-link :to="{ name: 'listreg' }" class="nav-link">
                    <div class="card-main-admin">
                      <font-awesome-icon
                        icon="fa-solid fa-clipboard-list"
                        style="font-size: 40px; color: #ffb92f"
                        class="my-3"
                      />
                      รายชื่อ
                      <div class="overlay">
                        <div class="text-admin">
                          <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                          <h6>รายชื่อ</h6>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>

              <!-- กราฟ -->
              <div class="col mb-5">
                <div class="contain">
                  <router-link :to="{ name: 'list_train_chart' }" class="nav-link">
                    <div class="card-main-admin">
                      <font-awesome-icon
                        icon="fa-solid fa-chart-pie"
                        style="font-size: 40px; color: #ffb92f"
                        class="my-3"
                      />
                      กราฟ
                      <div class="overlay">
                        <div class="text-admin">
                          <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
                          <h6>กราฟ</h6>
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
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";

export default {
  components: {
    navVuebarAdmin,
    /* ChartLine  */
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
      adAuthen: null,
    };
  },
  created() {
    axios
      .post("/admin-authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.adAuthen = res.data.decoded;
        if (res.data.status == "ok") {
          this.toast.success("ยินดีต้อนรับ " + this.adAuthen.admintor, {
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
          });
        } else {
          location.reload();
          /* alert("authen fail"); */
          /* localStorage.removeItem("token");
          this.$router.push('/loginAdmin') */
        }
        console.log(res);
      });
  },
  methods: {
    logout() {
      if (window.confirm("ออกจากระบบ")) {
        localStorage.removeItem("token");
        this.$router.push("/loginAdmin");
        this.$router.reload();
      }
    },
  },
};
</script>
<style>
@import "@/css/main.css";
@import "@/css/admin.css";
</style>
