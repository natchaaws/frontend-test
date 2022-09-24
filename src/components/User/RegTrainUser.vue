<template>
  <div class="main-yellow">
    <!-- Navbar -->
    <navVuebar />

    <div class="my-3">
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="col-md-8 pt-5">
            <div
              class="card my-5 py-5 px-5"
              style="background-color: #eee9fc; max-width: 1050px"
            >
              <form @submit.prevent="handleSubmitForm" >

                <div class="py-3 px-5 mb-3 CardReport">
                  <div class="row">
                    <h1>ลงทะเบียนอบรม</h1>
                  </div>
                  <hr />
                  <h6 v-if="userAuthen">
                    ไอดี : {{ userAuthen.userId }} <br />
                    E-mail : {{ userAuthen.email }} <br />
                    ชื่อ - นามสกุล : {{ userAuthen.firstName }} &nbsp;{{
                      userAuthen.lastName
                    }}
                  </h6>
                </div>

                <!-- เลือกอบรม -->
                <div class="py-3 px-5 mb-3 CardReport">
                  <div class="form-group mb-2" v-if="Trains.closeTrain != 1">
                    <label class="my-3">ชื่อเรื่องอบรม <b style="color: red">*</b></label>
                    <input
                      class="form-control"
                      list="datalistTrains"
                      placeholder="เลือกอบรมที่ต้องการ..."
                      v-model="regtrain.id_train"
                      required
                    />
                    <datalist id="datalistTrains"  >
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

                <!-- คำนำหน้า-->
                <div class="py-3 px-5 mb-3 CardReport">
                  <label class="mt-2">คำนำหน้า <b style="color: red">*</b></label>
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      v-model="regtrain.tname"
                      placeholder="คำนำหน้า"
                      require
                    />
                    <label class="floatingInput">คำนำหน้า</label>
                  </div>
                </div>
                <!-- ชื่อ - นามสกุล -->
                <div class="py-3 px-5 mb-3 CardReport">
                  <div class="row pb-3">
                    <div class="form-group col-md">
                      <label class="my-2">ชื่อ<b style="color: red">*</b></label>
                      <div class="form-floating my-3">
                        <input
                          type="text"
                          class="form-control"
                          v-model="regtrain.finame"
                          placeholder="ชื่อ"
                          require
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
                          require
                        />
                        <label class="floatingInput">นามสกุล</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- สังกัด/หน่วยงาน -->
                <div class="py-3 px-5 mb-3 CardReport">
                  <label class="mt-2">สังกัด/หน่วยงาน <b style="color: red">*</b></label>
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      v-model="regtrain.organ"
                      placeholder="สังกัด/หน่วยงาน"
                      require
                    />
                    <label class="floatingInput">สังกัด/หน่วยงาน</label>
                  </div>
                </div>

                <!-- เบอร์โทรศัพท์ -->
                <div class="py-3 px-5 mb-3 CardReport">
                  <label class="mt-2">เบอร์โทรศัพท์ <b style="color: red">*</b></label>
                  <div class="form-floating my-3">
                    <input
                      type="tel"
                      class="form-control"
                      v-model="regtrain.tel"
                      placeholder="เบอร์โทรศัพท์"
                      require
                    />
                    <label class="floatingInput">เบอร์โทรศัพท์</label>
                  </div>
                </div>

                <!-- เมล์ -->
                <div class="py-3 px-5 mb-3 CardReport">
                  <label class="mt-2">เมล์ <b style="color: red">*</b></label>
                  <div class="form-floating my-3">
                    <input
                      type="email"
                      class="form-control"
                      v-model="regtrain.mail"
                      placeholder="เมล์"
                      require
                    />
                    <label class="floatingInput">เมล์</label>
                  </div>
                </div>

                <div class="form-group mb-3 pt-3">
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

    <!-- //////////////////////////////////// -->
    <!--  <div class="contrainer mt-3 py-5 my-5">
      <div class="d-flex justify-content-center mx-5 my-3">
        <div class="col-md-6 card px-4 py-3 mb-5">
          <h3 class="my-3">ลงทะเบียนอบรม</h3>
          <h6 v-if="userAuthen">
            ไอดี : {{ userAuthen.userId }} &nbsp; 
            E-mail : {{ userAuthen.email }} 
            ชื่อ : {{ userAuthen.firstName  }} 
            นามสกุล : {{ userAuthen.lastName }}
          </h6>
          <hr />
          <form @submit.prevent="handleSubmitForm">

            <div class="py-3 px-5 mb-3 CardReport">
              <div class="form-group mb-2">
                  <label class="my-3">ชื่อเรื่องอบรม <b style="color:red">*</b></label>
                  <input 
                      class="form-control" 
                      list="datalistTrains" 
                      placeholder="เลือกอบรมที่ต้องการ..." 
                      v-model="regtrain.id_train"  
                      required>
                      <datalist id="datalistTrains">
                        <option 
                                v-for="train in Trains" 
                                :key="train" 
                                value:train.id_train
                                >
                            {{ train.id_train }} {{ train.subject }}
                          </option>
                    </datalist>
              </div>
            </div>

            <div class="mb-2">
              <input
                type="text"
                class="form-control"
                v-model="regtrain.tname"
                placeholder="คำนำหน้า"
                require
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                class="form-control"
                v-model="regtrain.finame"
                placeholder="ชื่อ"
                require
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                class="form-control"
                v-model="regtrain.laname"
                placeholder="นามสกุล"
                require
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                class="form-control"
                v-model="regtrain.organ"
                placeholder="สังกัด/หน่วยงาน"
                require
              />
            </div>
            <div class="mb-2">
              <input
                type="number"
                class="form-control"
                v-model="regtrain.tel"
                placeholder="เบอร์โทรศัพท์"
                require
              />
            </div>
            <div class="mb-2">
              <input
                type="email"
                class="form-control"
                v-model="regtrain.mail"
                placeholder="เมล์"
                require
              />
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-success"><i class="fa fa-pen"></i> ลงทะเบียน </button>
            </div>

          </form>
        </div>
      </div>
    </div> -->
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
      /*  userlg: null, */
      Trains: [],
      userAuthen: "",
      regtrain: {
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

    /* axios.get(`train/${this.$route.params.id}`).then((res) => {this.Trains = res.data})
      .catch((error) => {console.log(error)});

 */
    /*  userAuthen */
    axios
      .post("authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        this.userAuthen = response.data.decoded;
        this.regtrain.id_user = this.userAuthen.userId;
        console.log(response);
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
      axios
        .post("create-regtrain", this.regtrain)
        .then((res) => {
          this.notiSuccess = res.data.message;
          console.log(res);
          /* this.$router.push("/listTraintUser"); */
          this.regtrain = {
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
          alert(this.notiSuccess);
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
