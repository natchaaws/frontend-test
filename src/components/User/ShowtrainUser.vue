<template>
  <div>
    <div class="main-yellow">
      <!-- Navbar -->
      <navVuebar />
      <!-- Navbar -->

      <!-- <div v-if="showForm != AutofomatDateCloseorm "> -->
      <div class="container my-3">
        <section class="d-flex justify-content-center">
          <div class="col-md-10">
            <div class="card-white-train p-3 mb-3">
              <div class="font-color">
                <h1>รายการอบรม</h1>
                <h5 style="">{{ Trains.subject }}</h5>
              </div>
            </div>
          </div>
        </section>
        <!-- แจ้งเตือนฟอร์มปิด -->
        <span
          v-if="UsersReg.length >= Trains.num"
          v-show="
            this.$swal
              .fire({
                title: 'ฟอร์มนี้ปิดรับแล้ว',
                text: 'กดปุ่มย้อนกลับเพื่อดูรายการอื่น',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ย้อนกลับ',
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.$router.push('/listTraintUser');
                }
              })
          "
        >
        </span>

        <section class="d-flex justify-content-center" v-else>
          <div class="col-md-10">
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="my-3">
                  <font-awesome-icon
                    icon="fa-solid fa-book-open-reader"
                    style="font-size: 100px"
                  />
                </div>
              </div>

              <div class="mx-3">
                <ul class="list-group">
                  <li class="list-group-item">
                    เงื่อนไขผู้ลงทะเบียน :
                    <div
                      class="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <font-awesome-icon
                        icon="fa-solid fa-triangle-exclamation"
                        class="pe-3"
                      />
                      <div>
                        <span class="fw-bold"> {{ Trains.condition }} </span>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    รหัสอบรม: <span class="fw-bold">{{ Trains.id_train }} </span>
                  </li>
                  <li class="list-group-item">
                    โครงการ : <span class="fw-bold">{{ Trains.project }} </span>
                  </li>
                  <li class="list-group-item">
                    หัวข้ออบรม :
                    <span class="fw-bold">{{ Trains.subject }} </span>
                  </li>
                  <li class="list-group-item">
                    วันที่ : <span class="fw-bold"> {{ AutofomatDate }} </span>
                  </li>
                  <li class="list-group-item">
                    เวลาเริ่ม :
                    <span class="fw-bold">{{ this.Trains.time_s }} น.</span>
                  </li>
                  <li class="list-group-item">
                    เวลาสิ้นสุด :
                    <span class="fw-bold">{{ this.Trains.time_e }} น.</span>
                  </li>
                  <li class="list-group-item">
                    สถานที่จัดการอบรม :
                    <span class="fw-bold">{{ Trains.place }} </span>
                  </li>
                  <li class="list-group-item">
                    วิทยากร : <span class="fw-bold"> {{ Trains.lecturer }} </span>
                  </li>
                  <li class="list-group-item">
                    รายละเอียดของวิทยากร :
                    <span class="fw-bold"> {{ Trains.lec_study }} </span>
                  </li>
                  <li class="list-group-item">
                    จัดขึ้นโดย :
                    <span class="fw-bold"> {{ Trains.by_train }} </span>
                  </li>
                  <li class="list-group-item">
                    ชั่วโมงสหกิจ :
                    <span class="fw-bold"> {{ Trains.hours_coop }} </span>
                  </li>
                  <li class="list-group-item">
                    หมายเหตุ : <span class="fw-bold"> {{ Trains.note }} </span>
                  </li>
                  <li class="list-group-item">
                    รับจำนวน :
                    <span class="fw-bold"
                      >{{ UsersReg.length }} / {{ Trains.num }} ที่นั่ง
                    </span>
                    <span v-if="UsersReg.length >= Trains.num">ปิดรับแล้ว</span>
                    <span class="alert-success" v-else>ยังเปิดรับอยู่</span>
                  </li>

                  <div class="d-flex justify-content-between my-2">
                    <router-link to="/listTraintUser" class="btn btn-secondary">
                      <font-awesome-icon icon="fa-solid fa-circle-chevron-left" />
                      กลับ
                    </router-link>

                    <router-link
                      :to="{
                        name: 'regTrainUserByID',
                        params: { id: Trains.id_train },
                      }"
                      class="btn btn-success"
                    >
                      <i class="fa fa-pen"></i> ลงทะเบียน
                    </router-link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
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
      UsersReg: [],
      userAuthen: "",
      showForm: false,
      dateTimeNow: new Date(),
    };
  },
  computed: {
    AutofomatDate() {
      try {
        if (this.Trains.date == null) {
          return "-";
        }
        return new Date(this.Trains.date).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return "-";
      }
    },
  },
  created() {
    axios.get(`train/${this.$route.params.id}`).then((res) => {
      this.Trains = res.data[0];
    });

    axios.get(`regtrain-users/${this.$route.params.id}`).then((res) => {
      this.UsersReg = res.data;
    });
    /* userAuthen */
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
        window.location.reload;
      }
    },
  },
};
</script>

<style>
@import "@/css/main.css";

.swal2-title,
.swal2-text {
  font-family: "Prompt", sans-serif;
}

.swal2-popup {
  font-family: "Prompt", sans-serif;
}
</style>
