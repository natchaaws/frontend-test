<template>
  <div class="main-purple">
   <!-- navbar -->
   <navVuebarAdmin /> 
   <!-- end navber -->

    <div class="my-2 mt-2 pt-2 py-2">
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="col-md-9">
          <div
            class="card py-3 px-3"
            style="background-color: #f2f2f2; max-width: 1050px"
          >
            <form @submit.prevent="handleUpdateForm">
              <div class="py-3 px-5 mb-3 CardReport">
                <div class="row">
                  <h1>แก้ไขรายการอบรม</h1>
                  <h6> {{ train.id_train }} {{ train.subject}} </h6>
                </div>
                <hr />
              </div>
              <!-- โครงการ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">โครงการ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.project"
                    placeholder="โครงการ"
                    required
                  />
                  <label class="floatingInput">โครงการ</label>
                </div>
              </div>
              <!-- อบรม -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">หัวข้ออบรม <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.subject"
                    placeholder="หัวข้ออบรม"
                    required
                  />
                  <label class="floatingInput">หัวข้ออบรม</label>
                </div>
              </div>

              <!-- วันที่ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">วันที่ <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="date"
                    class="form-control"
                    v-model="train.date"
                    placeholder="วันที่"
                    required
                  />
                  <label class="floatingInput">วันที่</label>
                </div>
              </div>
            
              <!-- เวลา -->
              <div class="py-3 px-3 mb-3 CardReport">
                <div class="row pb-3">
                  <div class="form-group col-md">
                    <label class="my-2">เวลาเริ่มต้น<b style="color: red">*</b></label>
                      <div class="form-floating my-3">
                        <input
                            type="time"
                            class="form-control"
                            v-model="train.time_s"
                            placeholder="เวลาเริ่มต้น"
                            required
                        />
                      <label class="floatingInput">เวลาเริ่มต้น</label>
                    </div>
                  </div>
                  <div class="form-group col-md">
                    <label class="my-2">เวลาสิ้นสุด <b style="color: red">*</b></label>
                    <div class="form-floating my-3">
                    <input
                        type="time"
                        class="form-control"
                        v-model="train.time_e"
                        placeholder="เวลาสิ้นสุด"
                        required
                    />
                    <label class="floatingInput">เวลาสิ้นสุด</label>
                  </div>
                  </div>
                </div>
              </div>

              <!-- สถานที่จัดการอบรม -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">สถานที่จัดการอบรม <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.place"
                    placeholder="สถานที่จัดอบรม"
                    required
                  />
                  <label class="floatingInput">สถานที่จัดอบรม</label>
                </div>
              </div>

              <!-- วิทยากร -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">วิทยากร <b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.lecturer"
                    placeholder="วิทยากร"
                    required
                  />
                  <label class="floatingInput">วิทยากร</label>
                </div>
              </div>

               <!-- รายละเอียดของวิทยากร -->
               <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">รายละเอียดของวิทยากร<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.lec_study"
                    placeholder="รายละเอียดของวิทยากร"
                    required
                  />
                  <label class="floatingInput">รายละเอียดของวิทยากร</label>
                </div>
              </div>

              <!-- จัดขึ้นโดย -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">จัดขึ้นโดย<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.by_train"
                    placeholder="จัดขึ้นโดย"
                    required
                  />
                  <label class="floatingInput">จัดขึ้นโดย</label>
                </div>
              </div>

              <!-- จำนวน -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">จำนวน<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.num"
                    placeholder="จำนวน"
                    required
                  />
                  <label class="floatingInput">จำนวน</label>
                </div>
              </div>

              <!-- เงื่อนไข -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">เงื่อนไข<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.condition"
                    placeholder="เงื่อนไข"
                    required
                  />
                  <label class="floatingInput">เงื่อนไข</label>
                </div>
              </div>

              <!-- หมายเหตุ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">หมายเหตุ<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.note"
                    placeholder="หมายเหตุ"
                    required
                  />
                  <label class="floatingInput">หมายเหตุ</label>
                </div>
              </div>

              <!-- ชั่วโมงสหกิจ -->
              <div class="py-3 px-4 mb-3 CardReport">
                <label class="mt-2">ชั่วโมงสหกิจ<b style="color: red">*</b></label>
                <div class="form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="train.hours_coop"
                    placeholder="ชั่วโมงสหกิจ"
                    required
                  />
                  <label class="floatingInput">ชั่วโมงสหกิจ</label>
                </div>
              </div>
                      
              <!-- สถานะ -->
              <div class="row" style="font-size: 16px">
                <div class="input-group mb-2 d-flex justify-content-center">
                  <div style="font: bold">แสดงหรือซ่อนจากผู้ใช้ </div>
                </div>
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
                    <label class="form-check-label" for="inlineRadio1">แสดง <font-awesome-icon icon="fa-solid fa-eye"/></label>
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
                    <label class="form-check-label" for="inlineRadio1">ซ่อน <font-awesome-icon icon="fa-solid fa-eye-slash" /></label>
                  </div>
                </div>
              </div>

              <div class="form-group mb-3 pt-3">
                <div class="d-flex justify-content-center">
                  <button class="btn btn-success btn-block">แก้ไข</button>
                </div>
              </div>
            </form>
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

export default {
  components: {
    navVuebarAdmin,
  },
  data() {
    return {
      train: {},
    };
  },

  created() {
    axios.get(`train/${this.$route.params.id}`).then((res) => {
      this.train = res.data[0];
    });
  },

  methods: {
    handleUpdateForm() {
      axios
        .put(`train/${this.$route.params.id}`, this.train)
        .then((res) => {
          console.log(res);
          this.$router.push("/viewTrain");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      if (window.confirm("ออกจากระบบ")) {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
