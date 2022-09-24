<template>
  <div class="main-yellow">
    <section class="container my-2">
      <div class="d-flex justify-content-center">
        <div class="user_card_reg p-3">
          <h1 class="text-center">Register</h1>

          <form @submit.prevent="handleSubmitForm">
            <div class="row">
              <div style="opacity: 0.5; font-size: 12px">รายละเอียดผู้สมัคร</div>
              <!-- //ชื่อ -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"><i class="fas fa-user-alt"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ชื่อ"
                    v-model="users.fname"
                  />
                </div>
              </div>
              <!--  //นามสกุล -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"><i class="fas fa-user-alt"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="นามสกุล"
                    v-model="users.lname"
                  />
                </div>
              </div>
              <!--  //เพศ -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"
                    ><font-awesome-icon icon="fa-solid fa-mars-and-venus"
                  /></span>
                  <!-- <input type="text" class="form-control" placeholder="เพศ" v-model="users.genderId"> -->
                  <select v-model="users.genderId" type="text" class="form-control">
                    <option disabled selected value="">เพศ</option>
                    <option
                      v-for="gender in Gender"
                      :key="gender.genderId"
                      v-bind="{value:gender.genderId}"
                    >
                     {{ gender.gender }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <!-- /สาขา -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"
                    ><font-awesome-icon icon="fa-solid fa-chalkboard-user"
                  /></span>
                  <select
                    v-model="users.majorId"
                    type="text"
                    class="form-control input_majorId"
                  >
                    <option disabled selected value="">สาขา</option>
                    <option
                      v-for="major in Major"
                      :key="major.majorId"
                      v-bind="{value:major.majorId}"
                    >
                       {{ major.major }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- ระดับปริญญา -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"
                    ><font-awesome-icon icon="fa-solid fa-graduation-cap"
                  /></span>
                  <select
                    v-model="users.degreeId"
                    type="text"
                    class="form-control input_degreeId"
                  >
                    <option disabled selected value="">ระดับปริญญา</option>
                    <option
                      v-for="degree in Degree"
                      :key="degree.degreeId"
                      v-bind="{value:degree.degreeId}"
                    >
                       {{ degree.degree }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <!-- ชั้นปี -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"
                    ><font-awesome-icon icon="fa-solid fa-book-open-reader"
                  /></span>
                  <select
                    v-model="users.classId"
                    type="text"
                    class="form-control input_degreeId"
                  >
                  <option disabled selected value="">ชั้นปี</option>
                    <option
                      v-for="item in ClassY"
                      :key="item.classId"
                      v-bind="{value:item.classId}"
                    >
                      {{ item.classYear }}
                    </option>
                  </select>
                </div>
                
              </div>
              <!-- สถาบันการศึกษา -->
              <div class="col-md">
                <div class="input-group mb-2">
                  <span class="input-group-text-1"
                    ><font-awesome-icon icon="fa-solid fa-building-columns"
                  /></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="สถาบันการศึกษา"
                    v-model="users.university"
                  />
                </div>
              </div>
            </div>
            <hr />

            <div class="row">
              <div style="opacity: 0.5; font-size: 12px">รายละเอียดเข้าสู่ระบบ</div>
              <!-- Email -->
              <div class="col-md">
                <div class="form-floating input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text-1"
                      ><i class="fas fa-user-circle"></i
                    ></span>
                  </div>
                  <input v-model="users.email" type="email" class="form-control" required />
                  <label style="padding-left: 3.2rem">email</label>
                </div>
              </div>
              <!-- password -->
              <div class="col-md">
                <div class="form-floating input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text-1"><i class="fas fa-key"></i></span>
                  </div>
                  <input
                    v-model="users.password"
                    type="password"
                    class="form-control input_pass"
                    required
                  />
                  <label style="padding-left: 3.2rem">Password</label>
                </div>
              </div>
            </div>

            <!--   status -->
            <div class="row" style="font-size: 14px">
              <div class="input-group mb-2 d-flex justify-content-center">
                คุณอยู่สาขา CSIT หรือไม่?
              </div>
              <div class="d-flex justify-content-center">
                <div class="form-check form-check-inline">
                  <input
                    v-model="users.status"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    required
                  />
                  <label class="form-check-label" for="inlineRadio1">Yes</label>
                </div>

                <div class="form-check form-check-inline">
                  <input
                    v-model="users.status"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="0"
                    required
                  />
                  <label class="form-check-label" for="inlineRadio1">No</label>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" class="btn login1_btn">สมัคร</button>
            </div>
          </form>

          <div class="mt-1">
            <div class="d-flex justify-content-center links">
              มีบัญชีผู้ใช้แล้ว? <a href="/" class="ml-3">เข้าสู่ระบบ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ClassY: [],
      Gender: [],
      Major: [],
      Degree: [],
      users: {
        fname: "",
        lname: "",
        genderId: "",
        email: "",
        password: "",
        majorId: "",
        degreeId: "",
        classId: "",
        university: "",
        status: "",
      },
    };
  },

  created() {
    axios
      .get("classyear")
      .then((res) => {
        this.ClassY = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("gender")
      .then((res) => {
        this.Gender = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("major")
      .then((res) => {
        this.Major = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("degree")
      .then((res) => {
        this.Degree = res.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    handleSubmitForm() {
      axios
        .post("register", this.users)
        .then(() => {
          this.$router.push("/");
          this.users = {
            fname: "",
            lname: "",
            genderId: "",
            email: "",
            password: "",
            majorId: "",
            degreeId: "",
            classId: "",
            university: "",
            status: "",
          };
          alert("register success");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
@import "@/css/register.css";
@import "@/css/main.css";
</style>
