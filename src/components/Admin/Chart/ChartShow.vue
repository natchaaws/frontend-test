<template>
  <div class="main-purple">
    <!-- navbar -->
    <navVuebarAdmin />
    <!-- end navber -->
    <div class="container my-3">
      <div class="d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card-body">
          <!-- ชื่อ /จำนวน -->
          <div class="row">
            <div class="mb-1" >
              <router-link to="/list_train_chart" class="nav-link">
                <font-awesome-icon icon="fa-solid fa-angles-left" /> ย้อนกลับ
              </router-link>
            </div>
            <div class="col-md-3 card-chart m-2 pb-2">
                <div class="py-3 px-2">
                  <h5 class="card-title text-center">ลงทะเบียนทั้งหมด</h5>
                  <h1 class="card-title text-center">{{ NumTotalAll }}</h1>
                  <div class="card-text">
                    <small class="text-muted ">จำนวน : {{ UsersReg.length }} / {{ Trains.num }}
                      <span class="col alert-primary" v-if="UsersReg.length >= Trains.num">
                        เต็มแล้ว <font-awesome-icon icon="fa-solid fa-xmark" />
                      </span>
                        <span class="col alert-success" v-else>
                          ยังไม่เต็ม <font-awesome-icon icon="fa-solid fa-check" />
                        </span>
                    </small>
                  </div>
                </div>
            </div>
            <div class="col-md-8 card-chart m-2 pb-2">
                <div class="py-3 px-3">
                  <h4 class="card-title">{{ Trains.subject }}</h4>
                  <p class="card-text">{{ Trains.project }}</p>
                  <p class="card-text">วิทยากร : {{ Trains.lecturer }}</p>
                  <p class="card-text">
                    <small class="text-muted">วันที่ {{ AutofomatDate }}</small>
                  </p>
                </div>
            </div>
            <!-- จำนวนทั้งหมด -->
            <div class="col-md-6 card-chart m-2 pb-2">
              <div class="crad" style="background-color: #ffffff">
                <canvas id="RegAll"></canvas>
              </div>
            </div>
            <!--  ชั้นปี -->
            <div class="col-md-5 card-chart m-2 pb-2">
              <div class="crad" style="background-color: #ffffff">
                <canvas id="Classyear"></canvas>
              </div>
            </div>
            <div class="col-md-3 card-chart m-2 pb-2">
              <div class="crad my-3" style="background-color: #ffffff">
                <canvas id="Gender"></canvas>
              </div>
            </div>
            <div class="col-md-4 card-chart m-2 pb-2">
              <div class="crad" style="background-color: #ffffff">
                <canvas id="Degree"></canvas>
              </div>
            </div>
            <div class="col-md-4 card-chart m-2 pb-2">
              <div class="crad " style="background-color: #ffffff">
                <canvas id="Major"></canvas>
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
/* eslint-disable */
import axios from "axios";
import Chart from "chart.js/auto";
/* import ChartLine from "@/components/Admin/ChartLine.vue"; */
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";

export default {
  components: {
    navVuebarAdmin,
   
  },
  data() {
    return {
      Trains: [],
      Countmale: [],
      Countfemale: [],
      CountDegree2: [],
      NumTotalAll: [],
      UsersReg: [],
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

    axios.get(`CountAllUser/${this.$route.params.id}`).then(({ data }) => {
      this.NumTotalAll = data[0].NUM_total_all;
      
    });

    axios.get(`CountMale/${this.$route.params.id}`).then(({ data }) => {
      this.Countmale = data[0].NUM_total_male;
    });
    /* axios.get(`CountFemale/${this.$route.params.id}`).then(({ data }) => {
      this.Countfemale = data[0].NUM_total_female;
    }); */
    /* Degree */
    axios.get(`CountDegree2/${this.$route.params.id}`).then(({ data }) => {
      this.CountDegree2 = data[0].Total_degree_2;
    });
    axios.get(`CountDegree3/${this.$route.params.id}`).then(({ data }) => {
      this.CountDegree3 = data[0].Total_degree_3;
    });
    axios.get(`CountDegree4/${this.$route.params.id}`).then(({ data }) => {
      this.CountDegree4 = data[0].Total_degree_4;
    });
    axios.get(`CountDegree5/${this.$route.params.id}`).then(({ data }) => {
      this.CountDegree5 = data[0].Total_degree_5;
    });

    /* ชั้นปี Classyear */
    axios.get(`Count_Classyear_2/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Classyear_2 = data[0].Total_classyear_2;
    });
    axios.get(`Count_Classyear_3/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Classyear_3 = data[0].Total_classyear_3;
    });
    axios.get(`Count_Classyear_4/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Classyear_4 = data[0].Total_classyear_4;
    });
    axios.get(`Count_Classyear_5/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Classyear_5 = data[0].Total_classyear_5;
    });
    axios.get(`Count_Classyear_6/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Classyear_6 = data[0].Total_classyear_6;
    });

    /* สาขา Major */
    axios.get(`/Count_Major_1/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_1 = data[0].Total_Major_1;
    });
    axios.get(`/Count_Major_3/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_3 = data[0].Total_Major_3;
    });
    axios.get(`/Count_Major_4/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_4 = data[0].Total_Major_4;
    });
    axios.get(`/Count_Major_6/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_6 = data[0].Total_Major_6;
    });
    axios.get(`/Count_Major_7/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_7 = data[0].Total_Major_7;
    });
    axios.get(`/Count_Major_8/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_8 = data[0].Total_Major_8;
    });
    axios.get(`/Count_Major_9/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_9 = data[0].Total_Major_9;
    });
    axios.get(`/Count_Major_10/${this.$route.params.id}`).then(({ data }) => {
      this.Count_Major_10 = data[0].Total_Major_10;
    });
  },

  async mounted() {
    const ctx = document.getElementById("Gender");
    const ctx1 = document.getElementById("RegAll");
    const ctx2 = document.getElementById("Degree");
    const ctx3 = document.getElementById("Classyear");
    const ctx4 = document.getElementById("Major");

    /* Gender  */
    await axios.get(`CountFemale/${this.$route.params.id}`).then((res) => {
      const data = {
        labels: ["ชาย", "หญิง"],
        datasets: [
          {
            label: "เพศ",
            data: [ this.Countmale, res.data[0].NUM_total_female],
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
            hoverOffset: 4,
          },
        ],
      };
      const Gender = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "เพศ",
              font: {
                family: "Prompt",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
          },
        },
      });
      Gender;
    });

    /* จำนวนทั้งหมด */
    await axios.get(`CountAllUser/${this.$route.params.id}`).then((res) => {
      const labels = [""];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "ทั้งหมด",
            data: [res.data[0].NUM_total_all],
            backgroundColor: ["rgba(25, 64, 132, 0.8)"],
            borderColor: ["rgb(25, 99, 132)"],
            borderWidth: 1,
          },
        ],
      };
      const RegAll = new Chart(ctx1, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "จำนวนคนทั้งหมด",
              font: {
                family: "Prompt",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
          },
          scales: {
            
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      RegAll;
    });

    /* จำนวนDegree */
    await axios.get(`CountDegree1/${this.$route.params.id}`).then((res) => {
      const data = {
        labels: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก", "บัณฑิตศึกษา", "อื่นๆ"],
        datasets: [
          {
            label: "ปริญญา",
            data: [
              res.data[0].Total_degree_1,
              this.CountDegree2,
              this.CountDegree3,
              this.CountDegree4,
              this.CountDegree5,
            ],
            backgroundColor: [
              "rgb(224, 187, 228)",
              "rgb(149, 125, 173)",
              "rgb(210, 145, 188)",
              "rgb(254, 200, 216)",
              "rgb(255, 223, 211)",
            ],
          },
        ],
      };
      const Degree = new Chart(ctx2, {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "ระดับปริญญา",
              font: {
                family: "Prompt",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
          },
        },
      });
      Degree;
    });

    /* จำนวนชั้นปี */
    await axios.get(`Count_Classyear_1/${this.$route.params.id}`).then((res) => {
      const data = {
        labels: ["ชั้นปี 1", "ชั้นปี 2", "ชั้นปี 3", "ชั้นปี 4", "ชั้นปี 5-8", "อื่นๆ"],
        datasets: [
          {
            label: ["ชั้นปี"],
            data: [
              res.data[0].Total_classyear_1,
              this.Count_Classyear_2,
              this.Count_Classyear_3,
              this.Count_Classyear_4,
              this.Count_Classyear_5,
              this.Count_Classyear_6,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const Classyear = new Chart(ctx3, {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "ระดับชั้นปี",
              font: {
                family: "Prompt",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
          },
        },
      });
      Classyear;
    });

    /* สาขา  */
    await axios.get(`Count_Major_2/${this.$route.params.id}`).then((res) => {
      const data = {
        labels: [
          "เทคโนโลยีสารสนเทศ",
          "วิทยาการคอมพิวเตอร์",
          "คณิตศาสตร์",
          "สถิติ",
          "ชีววิทยา",
          "เคมี",
          "ฟิสิกส์",
          "ฟิสิกส์ประยุกต์",
          "อื่นๆ",
        ],
        datasets: [
          {
            label: "สาขา",
            data: [
              res.data[0].Total_Major_2,
              this.Count_Major_1,
              this.Count_Major_3,
              this.Count_Major_4,
              this.Count_Major_6,
              this.Count_Major_7,
              this.Count_Major_8,
              this.Count_Major_9,
              this.Count_Major_10,
            ],
            backgroundColor: [
              "rgb(138,43,226)",
              "rgb(255,140,0)",
              "rgb(0,191,255)",
              "rgb(20,50,205)",
              "rgb(64,224,208)",
              "rgb(238,130,238)",
              "rgb(255,215,0)",
              "rgb(255,0,0)",
              "rgb(176,196,222)",
            ],
            hoverOffset: 4,
          },
        ],
      };
      const Major = new Chart(ctx4, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "จำนวนสาขา",
              font: {
                family: "Prompt",
                size: 20,
                style: "normal",
                lineHeight: 1.2,
              },
            },
          },
        },
      });
      Major;
    });
  },
};
</script>
<style>
  @import "@/css/main.css";
  
  </style>
