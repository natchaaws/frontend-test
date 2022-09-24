<template>
  <div class="main-yellow">
    <!-- Navbar -->
    <navVuebar />
    <!-- Navbar -->

    <section class="container my-2">
      <div class="d-flex justify-content-center">
        <div class="col-md-8">
          <div class="card-body p-3">
            <form @submit.prevent="handleUpdateForm">
              <div class="CardReport mb-3">
                <h3>แก้ไขข้อมูลส่วนตัว</h3>
                <h6>ไอดี {{ users.id_user }} {{ users.fname }} {{ users.lname }}</h6>
                <hr />
              </div>
              <!-- //ชื่อ -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">ชื่อ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="users.fname"
                    placeholder="ชื่อ"
                    required
                  />
                  <label class="floatingInput">ชื่อ</label>
                </div>
              </div>
              <!-- นามสกุล -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">นามสกุล <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="users.lname"
                    placeholder="นามสกุล"
                    required
                  />
                  <label class="floatingInput">นามสกุล</label>
                </div>
              </div>
              <!-- เพศ -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">เพศ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <select
                    v-model="users.genderId"
                    type="text"
                    class="form-control input_majorId"
                  >
                    <option
                      selected
                      v-for="gender in Gender"
                      :key="gender.genderId"
                      v-bind="{ value: gender.genderId }"
                    >
                      {{ gender.genderId }} {{ gender.gender }}
                    </option>
                  </select>
                  <label class="floatingInput">เพศ</label>
                </div>
              </div>
              <!-- สาขา -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">สาขา <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <select
                    v-model="users.majorId"
                    type="text"
                    class="form-control input_majorId"
                  >
                    <option
                      selected
                      v-for="major in Major"
                      :key="major.majorId"
                      v-bind="{ value: major.majorId }"
                    >
                      {{ major.majorId }} {{ major.major }}
                    </option>
                  </select>
                  <label class="floatingInput">สาขา</label>
                </div>
              </div>
              <!-- ระดับปริญญา -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">ระดับปริญญา <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <select
                    v-model="users.degreeId"
                    type="text"
                    class="form-control input_degreeId"
                  >
                    <option
                      selected
                      v-for="degree in Degree"
                      :key="degree.degreeId"
                      v-bind="{ value: degree.degreeId }"
                    >
                      {{ degree.degreeId }} {{ degree.degree }}
                    </option>
                  </select>
                  <label class="floatingInput">ระดับปริญญา</label>
                </div>
              </div>
              <!-- ชั้นปี -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">ชั้นปี <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <select v-model="users.classId" type="text" class="form-control">
                    <option
                      selected
                      v-for="classyear in ClassY"
                      :key="classyear.classId"
                      v-bind="{ value: classyear.classId }"
                    >
                      {{ classyear.classId }} {{ classyear.classYear }}
                    </option>
                  </select>
                  <label class="floatingInput">ชั้นปี </label>
                </div>
              </div>
              <!-- สถาบันการศึกษา  -->
              <div class="py-3 px-3 mb-3 CardReport">
                <label class="mt-2">สถาบันการศึกษา <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="users.university"
                    placeholder="สถาบันการศึกษา "
                    required
                  />
                  <label class="floatingInput">สถาบันการศึกษา </label>
                </div>
              </div>

              <div class="form-group">
                <div class="d-flex justify-content-center">
                  <button class="btn btn-success">แก้ไข</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
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
      ClassY: [],
      Gender: [],
      Major: [],
      Degree: [],
      users: {},
    };
  },

  created() {
    axios.get("get-users/" + this.$route.params.id).then((res) => {this.users = res.data[0];})
      .catch((error) => {
        console.log(error);
      });

    axios.get("classyear").then((res) => {this.ClassY = res.data.results;})
      .catch((error) => {
        console.log(error);
      });

    axios.get("gender").then((res) => { this.Gender = res.data.results; })
      .catch((error) => {
        console.log(error);
      });

    axios.get("major").then((res) => {this.Major = res.data.results;})
      .catch((error) => {
        console.log(error);
      });

    axios.get("degree").then((res) => {this.Degree = res.data.results;})
      .catch((error) => {
        console.log(error);
      });

    /*  userAuthen */
    axios.post("authen", { headers: { Authorization: "Bearer " + localStorage.getItem("token") }, })
      .then((res) => { this.userAuthen = res.data.decoded; this.users.id_user = this.userAuthen.userId; });
  },

  methods: {
    handleUpdateForm() {
      axios
        .put(`edituser/${this.$route.params.id}`, this.users)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
