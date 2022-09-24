<template>
  <div class="main-or">
    <!-- navbar -->
    <navVuebarAdmin /> 
    <!-- end navber -->

    <!-- Datatable -->
    <div class="contrainer pt-4 mt-4">
      <div class="card mt-4 pt-4 py-5 my-3 ms-5 me-5">
        <div class="d-flex justify-content-center">
          <div class="col-xl">
            <div class="row">
              <h1>จัดการอบรม</h1>
            </div>
            <hr />

            <table id="myTable" class="table table-striped table-bordered mt-5">
              <thead class="thead-dark">
                <tr>
                  <th>รหัสอบรม</th>
                  <th>โครงการ</th>
                  <th>ชื่ออบรม</th>
                  <th>วิทยากร</th>
                  <th>วันที่</th>
                  <th>สถานะแสดง</th>
                  <th>ดู</th>
                  <th>แก้ไข</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";

export default {

  components: {
    navVuebarAdmin,
  },
  
  data() {
    return {
      search: "",
      Trains: [],
    };
  },
  mounted() {
    this.getTrains(0);
  },
  created() {
    axios.get("train").then((res) => {
      this.Trains = res.data;
    });
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

  methods: {
    getTrains() {
      axios
        .get("train")
        .then((res) => {
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.fonts = {
            SarabunNew: {
              normal: "THSarabunNew.ttf",
              bold: "THSarabunNewBold.ttf",
              italics: "THSarabunNewItalic.ttf",
              bolditalics: "THSarabunNewBoldItalic.ttf",
            },
          };
          $("#myTable").DataTable({
            responsive: true,
            data: res.data,
            columns: [
              { data: "id_train" },
              { data: "project" },
              { data: "subject" },
              { data: "lecturer" },
              {
                data: "date",
                render: function (data) {
                  return new Date(data).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                },
              },
              {data: "closeTrain",
                render: function (data) {
                  const statusUser = data;
                  if (statusUser == 1) {
                    return `<span class="alert-danger">
                                  Show
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                  </svg> 
                                </span>`;
                  }
                  return `<span class="alert-dark">
                                  Hide
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                  </svg>
                            </span>`;
                },
              },
              /* ปุ่มดูรายละเอียด */
              { data: "id_train",
                render: function (data) {
                  return `<a href="/showtrain-ad/${data}" class="btn btn-primary" id="view"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-exclamation-fill" viewBox="0 0 16 16">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
                          </a>`;
                },
              },
              /* ปุ่มแก้ไข */
              { data: "id_train",
                render: function (data) {
                  return `<a href="/editTrain/${data}" class="btn btn-warning" id="edit"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                          </a>`;
                },
              },
            ],
            dom: "Bfrtip",
            buttons: [
              "colvis",
              "copy",
              "csv",
              "excel",
              "print",
              {
                extend: "pdf",
                text: " PDF",
                pageSize: "A4",
                orientation: "landscape",
                download: "open",
                title: "รายการอบรม",

                exportOptions: {
                  columns: ":visible",
                },
                customize: function (doc) {
                  doc.defaultStyle.font = "SarabunNew";
                },
              },
            ],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteTrain(id) {
      let indexOfArrayItem = this.Trains.findIndex((i) => i.id_train === id);

      if (window.confirm("ต้องการลบรายการอบรมนี้ใช่ไหม?")) {
        axios
          .delete( `train/${id}`)
          .then(() => {
            this.Trains.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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

<style>
@import "@/css/listad.css";
@import "@/css/main.css";
</style>
