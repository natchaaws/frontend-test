<template>
  <div class="main-yellow">
    <navVuebar />

    <div class="contrainer">
      <div class="d-flex justify-content-center">
        <div class="card mx-2 my-2 card-body">
          <!-- header -->
          <section id="section1" class="mb-2">
              <router-link to="/home" class="btn btn-outline-secondary">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-left" /> <!-- กลับ -->
              </router-link>
            <div class="d-flex justify-content-center my-3">
              <div class="col-sm-8 header">
                <h1 class="text-center">รายการอบรมที่เปิดรับ</h1>
                <div class="input-group">
                  <input
                    type="search"
                    class="form-control"
                    placeholder="ค้นหา อบรม โครงการ"
                    v-model="search"
                  />
                  <span class="input-group-text border-0" style="background:#0d6efd;color:white" id="search-addon">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- body -->
          <section id="section2">
            <table class="table table-light">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">เงื่อนไข</th>
                  <th scope="col">โครงการ</th>
                  <th scope="col">หัวข้ออบรม</th>
                  <th scope="col">วันที่อบรม</th>
                  <th scope="col">จำนวน</th>
                  <th scope="col">button</th>
                </tr>
              </thead>

              <tbody v-for="(Train, index) in filteredData" :key="index._id_train">
                <tr v-if="Train.closeTrain != 0">
                  <td>{{ Train.condition }}</td>
                  <td>{{ Train.project }}</td>
                  <td>{{ Train.subject }}</td>

                  <td>
                    {{
                      new Date(Train.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </td>
                  <td>{{ Train.num }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'showtrainU', params: { id: Train.id_train } }"
                      class="btn btn-primary mb-2"
                    >
                      ดูรายละเอียด
                      <font-awesome-icon icon="fa-solid fa-circle-info" />
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
           
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import navVuebar from "@/components/view/navVuebarUser.vue";

export default {
  /*  setup() {
    
    (function () {
      if (window.localStorage) {
        if (!localStorage.getItem("firstLoad")) {
          localStorage["firstLoad"] = true;
          window.location.reload();
        } else localStorage.removeItem("firstLoad");
      }
    })();
  }, */
  components: {
    navVuebar,
  },
  data() {
    return {
      search: "",
      Trains: [],
      /* UsersReg: [], */
      userAuthen: "",
      CloseTrainEvent: "",
    };
  },
  computed: {
    filteredData() {
      return this.Trains.filter(({ project, subject }) =>
        [project, subject].some((val) => val.toLowerCase().includes(this.search))
      );
    },
    autoformat() {
      return moment(this.Trains.date).format("MM/DD/YYYYThh:mm");
    },
  },

  created() {
    axios.get("train").then((res) => {
      this.Trains = res.data;
    });

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

<style>
@import "@/css/main.css";
</style>
