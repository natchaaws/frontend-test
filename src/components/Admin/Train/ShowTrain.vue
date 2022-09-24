<template>
  <div>
    <div class="main-purple">
      <!-- navbar -->
      <navVuebarAdmin />
      <!-- end navber -->

      <div class="my-2">
        <div class="container">
          <div class="d-flex justify-content-center">
            <div class="col-md-10">
              <div
                class="card py-4 px-3"
                style="background-color: #eee9fc; max-width: 1050px"
              >
                <div class="py-1 px-1 mb-3 CardReport">
                  <div class="row">
                    <h3 class="text-center">{{ Trains.project }}</h3>
                    <h5 class="text-muted text-center">{{ Trains.subject }}</h5>
                  </div>
                </div>
                <div class="py-1 px-1 mb-3 CardReport">
                  <div class="row">
                    <p><span class="fw-bold">เงื่อนไข : </span> {{ Trains.condition }}</p>
                    <p><span class="fw-bold">รหัสอบรม : </span> {{ Trains.id_train }}</p>
                    <p><span class="fw-bold">วันที่ : </span> {{ AutofomatDate }}</p>
                    <p>
                      <span class="fw-bold">เวลาเริ่ม : </span>
                      {{ this.Trains.time_s }} น.
                    </p>
                    <p>
                      <span class="fw-bold">เวลาสิ้นสุด: </span>
                      {{ this.Trains.time_e }} น.
                    </p>
                    <p><span class="fw-bold">วิทยากร : </span>{{ Trains.lecturer }}</p>
                    <p>
                      <span class="fw-bold">รายละเอียดของวิทยากร : </span
                      >{{ Trains.lec_study }}
                    </p>
                    <p>
                      <span class="fw-bold">สถานที่จัดการอบรม : </span>{{ Trains.place }}
                    </p>
                    <p><span class="fw-bold">จัดขึ้นโดย : </span>{{ Trains.by_train }}</p>
                    <p><span class="fw-bold">หมายเหตุ : </span>{{ Trains.note }}</p>
                    <p>
                      <span class="fw-bold">ชั่วโมงสหกิจ : </span>{{ Trains.hours_coop }}
                    </p>
                    <label><span class="fw-bold">รับจำนวน : </span> {{ UsersReg.length }} / {{ Trains.num }} ที่นั่ง
                      <span class="col alert-primary" v-if="UsersReg.length >= Trains.num">
                        ลงทะเบียนครบแล้ว <font-awesome-icon icon="fa-solid fa-xmark" />
                      </span>
                        <span class="col alert alerT" v-else>
                          ยังไม่เต็ม <font-awesome-icon icon="fa-solid fa-check" />
                        </span>
                    </label>
                    

                    <!-- status -->
                    <p class="fw-bold border-bottom text-muted">สถานะ : </p>
                    <span class="alert alert-info" role="alert" v-if="Trains.closeTrain != 0"
                        ><b>แสดง</b> <font-awesome-icon icon="fa-solid fa-eye"
                      /></span>

                      <span class="alert alert-danger" v-else
                        ><b>ซ่อน</b> <font-awesome-icon icon="fa-solid fa-eye-slash"
                      /></span>
                  </div>
                </div>

                <!-- Btn -->
                <div class="d-flex justify-content-between">
                  <!--  กลับ -->
                  <router-link to="/viewTrain" class="btn btn-secondary">
                    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" /> กลับ
                  </router-link>
                  <!-- Button แสดง/ซ่อน -->
                  <button
                    class="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    แก้ไขสถานะ <font-awesome-icon icon="fa-solid fa-circle-half-stroke" />
                  </button>

                  <!-- Modal แก้ไขสถานะ -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            เลือกแก้ไขสถานะ
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form @submit.prevent="handleUpdateForm">
                          <div class="modal-body">
                            <div class="d-flex justify-content-center">
                              <div class="form-check form-check-inline">
                                <input
                                  v-model="train.closeTrain"
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="1"
                                  required
                                />
                                <label class="form-check-label" for="inlineRadio1"
                                  >แสดง <font-awesome-icon icon="fa-solid fa-eye"
                                /></label>
                              </div>

                              <div class="form-check form-check-inline">
                                <input
                                  v-model="train.closeTrain"
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio3"
                                  value="0"
                                  required
                                />
                                <label class="form-check-label" for="inlineRadio1"
                                  >ซ่อน <font-awesome-icon icon="fa-solid fa-eye-slash"
                                /></label>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              ปิด
                            </button>
                            <button type="submit" class="btn btn-primary">บันทึก</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <router-link
                    :to="{ name: 'editTrain', params: { id: Trains.id_train } }"
                    class="btn btn-warning"
                    >แก้ไข
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                  </router-link>
                </div>
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
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";
/* import moment from "moment"; */

export default {
  components: {
    navVuebarAdmin,
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
    /* end reload */ ("");
  },
  data() {
    return {
      /* search: "", */
      train: {},
      Trains: [],
      UsersReg: [],
      userAuthen: "",
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
    /* closeTrain สถานะ */
    axios.get(`train/${this.$route.params.id}`).then((res) => {
      this.train.closeTrain = res.data[0].closeTrain;
    });
    axios.get(`regtrain-users/${this.$route.params.id}`).then((res) => {
      this.UsersReg = res.data;
      /* console.log(res); */
    });
    /* userAuthen */
    axios
      .post("admin-authen", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.userAuthen = res.data.decoded;
        /* console.log(res); */
      });
  },
  methods: {
    /* closeTrain สถานะ อัพเดตข้อมูล */
    handleUpdateForm() {
      axios
        .put(`train-closeTrain/${this.$route.params.id}`, this.train)
        .then((res) => {
          console.log(res);
          location.reload();
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
@import "@/css/main.css";

.swal2-title,
.swal2-text {
  font-family: "Prompt", sans-serif;
}

.swal2-popup {
  font-family: "Prompt", sans-serif;
}
.alerT {
  color: #0f5132;
  background: #d1e7dd;
  
  border-color: #0f5132;
  border-radius: 5px;
  padding: 10px 15px 10px 15px;
  cursor:context-menu;
}
</style>
