<template>
  <div class="main-purple">
    <!-- navbar -->
    <navVuebarAdmin /> 
    <!-- end navber -->

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-11 my-5">
          <div
            class="card mt-4 py-5 px-5 my-5"
            style="background-color: #ffffff; max-width: 1050px"
          >
           
              <router-link to="/listreg" class="btn btn-secondary my-2 col-md-2">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-left" /> กลับ
              </router-link>
           

            <!-- Datatable -->
            <div class="contrainer">
            <h1 class="text-center">รายชื่อผู้ลงทะเบียน</h1>
            <hr />
            <h6>
              <span class="fw-bold">{{ Trains.project }}</span>
            </h6>
            <h6>
              <span class="fw-bold">{{ Trains.subject }} </span>
            </h6>
            <h6>
              วิทยากร <span class="fw-bold">{{ Trains.lecturer }}</span>
            </h6>
            <h6>
              วันที่
              <span class="fw-bold">
                {{
                  new Date(Trains.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </span>
            </h6>
            <h6>จำนวนลงทะเบียน <span class="fw-bold"> {{ RegTrains.length }} </span> คน</h6>
            <br />
            <table
              id="myTable"
              class="table table-bordered mt-5 my-3"
              style="width: 100%"
            >
              <thead class="thead-dark">
                <tr>
                  <th>รหัสนิสิต</th>
                  <th>คำนำหน้า</th>
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  <th>สาขา/สังกัด</th>
                  <!-- <th>ลงชื่อเข้า</th>
                  <th>ลงชื่อออก</th> -->
                </tr>
              </thead>
            </table>
         </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import $ from "jquery";
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";
/* import htmlToPdfmake from "html-to-pdfmake"; */

/* import $ from "jquery"; */
export default {
  components: {
    navVuebarAdmin,
  },
  data() {
    return {
      search: "",
      Trains: "",
      RegTrainsTU: null,
      RegTrains: "",
    };
  },

  mounted() {
    this.getRegTrainsTU(0);
  },
  created() {
    axios.get(`ListUserOftrain/${this.$route.params.id}`).then((res) => {
      this.RegTrains = res.data;
      console.log(res);
    });

    axios.get(`train/${this.$route.params.id}`).then((response) => {
      this.Trains = response.data[0];
    });
  },

  methods: {
    getRegTrainsTU() {
      axios
        .get(`ListUserOftrain/${this.$route.params.id}`)
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
              { data: "studentID", width: "11%" },
              { data: "tname", width: "11%" },
              { data: "finame", width: "25%" },
              { data: "laname", width: "25%" },
              { data: "organ", width: "25%" },
             /*  { data: "null", width: "25%" },
              { data: "null", width: "25%" }, */
            ],
            dom: "Bfrtip",
            buttons: [
              "colvis",
              //copy
              {
                extend: "copy",
                text: "copy",
                pageSize: "A4",
                sheetName: "Exported data",
                title: "รายชื่อนิสิตลงทะเบียน เรื่อง " + `${this.Trains.subject}`,
                messageTop: `${this.Trains.project}` ,
                exportOptions: {
                  columns: ":visible",
                },
              },
              "excel",
              "excelHtml5",
              //excel
              {
                extend: "excelHtml5",
                text: "Excel",
                pageSize: "A4",
                sheetName: "Exported data",
                title: "รายชื่อนิสิตที่ลงทะเบียน" ,
                messageTop: `${this.Trains.project}` + `${this.Trains.subject}`,
                exportOptions: {
                  columns: ":visible",
                },
              },
              // Print
              {
                extend: "print",
                text: "print",
                pageSize: "A4",
                orientation: "landscape",
                download: "open",
                title: "รายชื่อนิสิตที่ลงทะเบียน",
                messageTop: `${this.Trains.project}`,
                exportOptions: {
                  columns: ":visible",
                },customize: function (doc) {
                  doc.defaultStyle = {
                    font: 'SarabunNew',
                    fontSize: 16,
                  };},
              },
              // PDF
              {
                extend: "pdf",
                text: "PDF",
                pageSize: "A4",
                orientation: "landscape",
                download: "open",
                title: "รายชื่อนิสิตลงทะเบียน ",
                messageTop: `${this.Trains.subject}`  + `${this.Trains.project}`,
                  
                exportOptions: {
                  columns: ":visible",
                  modifier: {
                    page: "current",
                  },
                },
                
                customize: function (doc) {
                  doc.defaultStyle = {
                    font: "SarabunNew",
                    fontSize: 16,
                  };
                  
        
                 /*  doc.content[1].table.widths= [40, 80, 80, 100, 190, 190]; */
                  doc.styles.tableHeader.fontSize = 16;
                  doc.styles.title.fontSize = 20; // กำหนดขนาด font ของ header
                },
              },
              //CSV
              {
                extend: "csvHtml5",
                text: "CSV",
                pageSize: "A4",
                title: "รายชื่อนิสิตที่ลงทะเบียน",
                orientation: "landscape",
                download: "open",
                exportOptions: {
                  modifier: {
                    search: "none",
                  },
                },
              },
              
            ],
            response: true,
          });
        })
       /*  .catch((error) => {
          console.log(error);
        }); */
    },

    printDocument() {
      /* //get table html
      const pdfTable = document.getElementById("divToPrint");
      //html to pdf format
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = {
        pageSize: "A4",
        pageOrientation: "landscape",
        table: {
          widths: [ "auto", "auto","auto","auto", 50, 50 ],
          heights: [ "auto", "auto","auto","auto","auto","auto" ]
    },
        content: html,
        defaultStyle: {
          font: "SarabunNew",
        },
      }; */

      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.fonts = {
        SarabunNew: {
          normal: "THSarabunNew.ttf",
          bold: "THSarabunNewBold.ttf",
          italics: "THSarabunNewItalic.ttf",
          bolditalics: "THSarabunNewBoldItalic.ttf",
        },
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-MediumItalic.ttf",
        },
      };
      const docDefinition = {
        pageSize: "A4",
        pageOrientation: "landscape",
        content: [
          { text: "รายชื่อนิสิตที่ลงทะเบียน", fontSize: 25, bold: true },
          { text: this.Trains.project, fontSize: 16 },
          { text: this.Trains.subject, fontSize: 16 },
          { text: this.Trains.lecturer, fontSize: 16 },
          {
            text: new Date(this.Trains.date).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            fontSize: 16,
          },
          {
            table: {
              headerRows: 1,
              fontSize: 16,
              widths: [40, 80, 80, 100, 190, 190],
              body: [
                [
                  { text: "คำนำหน้า", bold: true },
                  { text: "ชื่อ", bold: true },
                  { text: "นามสกุล", bold: true },
                  { text: "สาขา/สังกัด", bold: true },
                  { text: "ลงชื่อเข้า", bold: true },
                  { text: "ลงชื่อออก", bold: true },
                ],
                /*   [this.RegTrains.tname , this.RegTrains.finame, this.RegTrains.laname , this.RegTrains.organ ,'',''],
                [
                  `${this.RegTrains[0].tname}`,
                  `${this.RegTrains[0].finame}`,
                  `${this.RegTrains[0].laname}`,
                  `${this.RegTrains[0].organ}`,
                  "",
                  "",
                ],
 */
              ],
            },
          },
        ],
        defaultStyle: {
          font: "SarabunNew",
        },
      };
      /* docDefinition.content[0].table.body.push(["tname","finame","laname","organ","",""]);
        for(var i = 0; i< this.RegTrains.length;i++){
          docDefinition.content[0].table.body.push(
            [this.RegTrains[0]["tname"]],
            [this.RegTrains[0]["finame"]],
            [this.RegTrains[0]["laname"]],
            [this.RegTrains[0]["organ"]],
            [],
            []);  
        } */

      pdfMake.createPdf(docDefinition).open();
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
</style>
