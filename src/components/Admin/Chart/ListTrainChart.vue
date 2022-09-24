<template>
  <div class="main-or">
    <navVuebarAdmin />
    <!-- Datatable -->
    <section class="container">
      <div class="my-2">
        <div class="card-body p-2">
        <div class="card">
          <div class="text-center p-2">
            <h1>รายการอบรม</h1>
            <h5 class="text-muted">เลือกดู Chart</h5>
          </div>

          <div class="p-3">
            <table id="myTable" class="table table-hover">
              <thead class="table-dark">
                <tr>
                  <!-- <th>รหัสอบรม</th> -->
                  <th>โครงการ</th>
                  <th>ชื่ออบรม</th>
                  <th>วันที่</th>
                  <th>ดู</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      </div>
    </section>
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
            data: res.data,
            columns: [
              /* { data: "id_train" }, */
              { data: "project" },
              { data: "subject" },
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
              /* ปุ่มดูรายละเอียด */
              {
                data: "id_train",
                render: function (data) {
                  return `<a href="/chartshow/${data}" class="btn btn-primary" id="view"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
                      <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                      <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"/>
                    </svg>
                            </a>`;
                },
              },
            ],
            Response: true,
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
