<template>
  <div class="main-purple">
    <!-- navbar -->
    <navVuebarAdmin />
    <!-- end navber -->

    <!-- Datatable -->
    <div class="contrainer pt-4 mt-4">
      <div class="card mt-4 pt-4 py-5 my-3 ms-5 me-5">
        <div class="d-flex justify-content-center">
          <div class="col-xl">
            <div class="row">
              <h1>เลือกรายการอบรมเพื่อดูรายชื่อ</h1>
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
                  <th>Action</th>
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
      Trains: null,
    };
  },
  mounted() {
    this.getTrains(0);
  },
  computed: {

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
              {
                data: "closeTrain",
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
              {
                data: "id_train",
                render: function (data) {
                  return `<a href="/showlistTU/${data}" class="btn btn-primary" id="view"> ดูรายชื่อ  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
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
