<template>
  <div class="main-yellow">
    <!-- Navbar -->
    <navVuebar />

    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="col-md-8">
          <div class="card-body my-2 pt-3 pb-1 px-3" >
            <form @submit.prevent="handleSubmitForm">

              <section class="py-3 px-3 mb-2 CardReport">
                <div class="row">
                  <h1 class="text-center">ลงทะเบียนอบรม</h1>
                </div>
                <hr />

                <h6 >
                 <div class="text-center">
                  <div class="row">
                    <div class="col-md-2">
                      ไอดี : {{ userAuthen.userId }} <br />
                    </div>
                    <div class="col-md">
                      E-mail : {{ userAuthen.email }} <br />
                    </div>
                    <div class="col-md">
                      ชื่อ-นามสกุล : {{ userAuthen.firstName }} &nbsp;{{
                        userAuthen.lastName
                      }}
                    </div>
                   </div>
                 </div>
                </h6>
              </section>

              <!-- เลือกอบรม -->
              <div class="py-3 px-4 mb-3 CardReport">
                <div class="form-group mb-2" v-if="Trains.closeTrain != 1">
                  <label class="my-3">ชื่อเรื่องอบรม <b style="color: red">*</b></label>
                  <input
                    class="form-control"
                    list="datalistTrains"
                    placeholder="เลือกอบรมที่ต้องการ..."
                    v-model="regtrain.id_train"
                    required
                  />
                  <datalist id="datalistTrains">
                    <option v-for="train in Trains" :key="train" value:train.id_train>
                      <span v-if="train.closeTrain != 0">
                        {{ train.id_train }} {{ train.subject }}
                      </span>
                    </option>
                  </datalist>
                </div>
                <div class="mt-3" style="font-size: small">
                  <p>อบรมที่เลือก : {{ regtrain.id_train }}</p>
                </div>
              </div>
              <!--  รหัสนิสิต -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">รหัสนิสิต</label>
                <div class="form-floating my-3">
                  <input
                    type="number"
                    class="form-control"
                    v-model="regtrain.studentID"
                    placeholder="รหัสนิสิต"
                  />
                  <label class="floatingInput">รหัสนิสิต</label>
                </div>
              </div>
              <!-- คำนำหน้า-->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">คำนำหน้า <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="regtrain.tname"
                    placeholder="คำนำหน้า"
                    required
                  />
                  <label class="floatingInput">คำนำหน้า</label>
                </div>
              </div>
              <!-- ชื่อ - นามสกุล -->
              <div class="py-3 px-4 mb-3 CardReport">
                <div class="row">
                  <div class="form-group col-md">
                    <label class="my-2">ชื่อ<b style="color: red">*</b></label>
                    <div class="form-floating my-3">
                      <input
                        type="text"
                        class="form-control col"
                        v-model="regtrain.finame"
                        placeholder="ชื่อ"
                        required
                      />
                      <label class="floatingInput">ชื่อ</label>
                    </div>
                  </div>

                  <div class="form-group col-md">
                    <label class="my-2">นามสกุล <b style="color: red">*</b></label>
                    <div class="form-floating my-3">
                      <input
                        type="text"
                        class="form-control"
                        v-model="regtrain.laname"
                        placeholder="นามสกุล"
                        required
                      />
                      <label class="floatingInput">นามสกุล</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- สังกัด/หน่วยงาน -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">สังกัด/หน่วยงาน <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="regtrain.organ"
                    placeholder="สังกัด/หน่วยงาน"
                    required
                  />
                  <label class="floatingInput">สังกัด/หน่วยงาน</label>
                </div>
              </div>

              <!-- เบอร์โทรศัพท์ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">เบอร์โทรศัพท์ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="tel"
                    class="form-control"
                    v-model="regtrain.tel"
                    placeholder="เบอร์โทรศัพท์"
                    required
                  />
                  <label class="floatingInput">เบอร์โทรศัพท์</label>
                </div>
              </div>

              <!-- เมล์ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">เมล์ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="email"
                    class="form-control"
                    v-model="regtrain.mail"
                    placeholder="เมล์"
                    required
                  />
                  <label class="floatingInput">เมล์</label>
                </div>
              </div>

              <div class="form-group">
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-success">
                    <i class="fa fa-pen"></i> ลงทะเบียน
                  </button>
                </div>
              </div>
            </form>
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
      Trains: [],
      userAuthen: "",
      regtrain: {
        studentID: "",
        tname: "",
        finame: "",
        laname: "",
        organ: "",
        tel: "",
        mail: "",
        date_reg: new Date().toISOString().substring(0, 10),
        id_train: "",
        id_user: "",
      },
      Train_ID: "",
    };
  },

  created() {
    setInterval(this.getNow, 1000);
    axios
      .get("train")
      .then((res) => {
        this.Trains = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`train/${this.$route.params.id}`)
      .then((res) => {
        this.Train_ID = res.data[0];
        this.regtrain.id_train = this.Train_ID.id_train + " " + this.Train_ID.subject;
      })
      .catch((error) => {
        console.log(error);
      });

    /*  userAuthen */
    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.userAuthen = response.data.decoded;
        this.regtrain.id_user = this.userAuthen.userId;
        this.regtrain.finame = this.userAuthen.firstName;
        this.regtrain.laname = this.userAuthen.lastName;
        this.regtrain.mail = this.userAuthen.email;
      });
  },

  methods: {
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.regtrain.date_reg = dateTime;
    },
    handleSubmitForm() {
      axios.post("create-regtrain", this.regtrain).then((res) => {
        this.notiSuccess = res.data.message;
        console.log(res);
        /* this.$router.push("/listTraintUser"); */
        this.regtrain = {
          studentID: "",
          tname: "",
          finame: "",
          laname: "",
          organ: "",
          tel: "",
          mail: "",
          date_reg: "",
          id_train: "",
          id_user: "",
        };
        this.$swal
          .fire({
            icon: "success",
            title: "REG Success",
            text: "ลงทะเบียนสำเร็จ",
            confirmButtonText: "กลับหน้าแรก",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/home");
            }
          });
        /*  alert(this.notiSuccess); */
      });
      this.$swal
        .fire({
          icon: "error",
          title: "REG Error",
          text: "ลงทะเบียนไม่สำเร็จ",
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logout() {
      if (window.confirm("ออกจากระบบ")) {
        localStorage.removeItem("token");
        this.$router.push("/");
        window.location.reload;
      }
    },
  },
};
</script>
<style>
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
</style>
