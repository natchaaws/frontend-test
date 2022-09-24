<template>
  <div class="main-yellow">
    <!-- navbar -->
    <navVuebar />
    <!-- end navbar -->
    <div class="container mt-2">
      <div class="d-flex justify-content-center">
        <div class="col-12">
          <div class="card-body p-2 m-2">
            <div class="mb-2">
              <router-link to="/home" class="btn btn-secondary">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-left" /> กลับ
              </router-link>
            </div>
            <section class="p-2 m-2 CardReport">
              <div class="text-center">
                <h1>ประวัติลงทะเบียนอบรม</h1>
                <hr />
                <h6>
                  <div class="row">
                    <div class="col-md-2">ไอดี : {{ userAuthen.userId }}<br /></div>
                    <div class="col-md">E-mail : {{ userAuthen.email }} <br /></div>
                    <div class="col-md">
                      ชื่อ-นามสกุล : {{ userAuthen.firstName }} {{ userAuthen.lastName }}
                    </div>
                  </div>
                </h6>
              </div>
            </section>

            <section class="p-2 m-2 CardReport">
              <div v-if="hisuser.length == 0" class="text-center">
                ไม่มีประวัติการลงทะเบียนอบรม
                
              </div>
              <div v-else>
                <table class="table table-striped">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col" >โครงการ</th>
                      <th scope="col" >หัวข้ออบรม</th>
                      <th scope="col" >วันที่อบรม</th>
                      <th scope="col" >วันที่ลงทะเบียน</th>
                    </tr>
                  </thead>
  
                  <tbody>
                    <tr v-for="His in hisuser" :key="His._id_user">
                      <td>{{ His.project }}</td>
                      <td>{{ His.subject }}</td>
                      <td>
                        {{
                          new Date(His.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }}
                      </td>
                      <td>
                        {{
                          new Date(His.date_reg).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import navVuebar from "@/components/view/navVuebarUser.vue";

export default {
  components: {
    navVuebar,
  },
  data() {
    return {
      hisuser: {},
      userAuthen: "",
    };
  },
  created() {
    axios.get("regtrain-train-user-id/" + this.$route.params.id).then((res) => {
      this.hisuser = res.data;
      console.log(res);
    });

    /* userAuthen */
    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.userAuthen = response.data.decoded;
        console.log(response);
      });
  },
  computed: {
    autoformat() {
      return moment(this.Trains.date).format("MM/DD/YYYY");
    },
    autoformatdate() {
      return moment(this.Trains.date_reg).format("MM/DD/YYYYThh:mm");
    },
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

<style>
@import "@/css/user.css";
@import "@/css/main.css";
</style>
