<template>
  <div class="main-yellow">
    <!-- Navbar -->
    <navVuebar />
    <!-- Navbar -->

    <div class="container">
      <div class="my-2">
        <div class="d-flex justify-content-center">
          <div class="col-md-6">
            <div class="card-body py-3 px-3">
              <div class="mb-3 CardReport">
                <div >
                  <h2>
                    <font-awesome-icon icon="fa-solid fa-address-card" /> ข้อมูลส่วนตัว
                  </h2>
                  <hr />
                </div>
              </div>
              <div class="mb-3 CardReport">
                <div >
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">ชื่อ : </span> {{ Users.fname }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">นามสกุล : </span> {{ Users.lname }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">เพศ : </span> {{ formatSex }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">ชั้นปี : </span> {{ formartClassYear }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">สาขา : </span> {{ formatMajor }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">ปริญญา : </span> {{ formatDegree }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">มหาวิทยาลัย : </span> {{ Users.university }}
                  </div>
                  <div class="mt-2 pb-2">
                    <span class="fw-bold">Email : </span> {{ Users.email }}
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between my-2">
                <router-link to="/home" class="btn btn-secondary ">
                  <font-awesome-icon icon="fa-solid fa-circle-chevron-left" /> กลับ
                </router-link>
                <router-link
                  :to="{ name: 'edituser', params: { id: userAuthen.userId } }"
                  class="btn btn-warning "
                >
                  <font-awesome-icon icon="fa-solid fa-user-pen" /> แก้ไข
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
import navVuebar from "@/components/view/navVuebarUser.vue";

export default {
  components: {
    navVuebar,
  },
  data() {
    return {
      Users: [],
      userAuthen: "",
    };
  },
  computed: {
    formatSex() {
      const sex = this.Users.genderId;
      if (sex == 1) {
        return "Male";
      }
      return "Female";
    },
    formartClassYear() {
      const classYear = this.Users.classId;
      if (classYear == 1) {
        return "ชั้นปี 1";
      } else if (classYear == 2) {
        return "ชั้นปี 2";
      } else if (classYear == 3) {
        return "ชั้นปี 3";
      } else if (classYear == 4) {
        return "ชั้นปี 4";
      } else if (classYear == 5) {
        return "ชั้นปี 5-8";
      }
      return "-";
    },
    formatDegree() {
      const degree = this.Users.degreeId;
      if (degree == 1) {
        return "ปริญญาตรี";
      } else if (degree == 2) {
        return "ปริญญาโท";
      } else if (degree == 3) {
        return "ปริญญาเอก";
      }
      return "บัณฑิตศึกษา";
    },
    formatMajor() {
      const Major = this.Users.majorId;
      if (Major == 1) {
        return "สาขาวิชาวิทยาการคอมพิวเตอร์";
      } else if (Major == 2) {
        return "สาขาวิชาเทคโนโลยีสารสนเทศ";
      } else if (Major == 3) {
        return "สาขาคณิตศาสตร์";
      } else if (Major == 4) {
        return "สาขาสถิติ";
      } else if (Major == 6) {
        return "สาขาชีววิทยา";
      } else if (Major == 7) {
        return "สาขาเคมี";
      } else if (Major == 8) {
        return "สาขาฟิสิกส์";
      } else if (Major == 9) {
        return "สาขาฟิสิกส์ประยุกต์";
      }
      return "-";
    },
  },

  created() {
    axios.get(`get-users/${this.$route.params.id}`).then((res) => {
      this.Users = res.data[0];
      console.log(res);
    });
    /*  userAuthen */
    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.userAuthen = response.data.decoded;
        this.Users.id_user = this.userAuthen.userId;
        console.log(response);
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
