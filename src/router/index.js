import { createWebHistory, createRouter } from "vue-router";

//test
import countDown from "@/components/countDown.vue";

//admin
import LoginAdmin from "@/components/Admin/adminLogin.vue";
import CreateTrain from "@/components/Admin/Train/CreateTrain.vue";
import EditTrain from "@/components/Admin/Train/EditTrain.vue";
import ListTrain from "@/components/Admin/Train/ListTrain.vue";
import MainAdmin from "@/components/view/mainAdmin.vue";
import ListReg from "@/components/Admin/listRegTrain.vue";
import ShowListTrain from "@/components/Admin/Train/showListTrainuser.vue";
import ShowT from "@/components/Admin/Train/ShowTrain.vue";
import ChartShow from"@/components/Admin/Chart/ChartShow.vue";
/* import ChartLine from"@/components/Admin/ChartLine.vue"; */
import navVuebarAdmin from "@/components/view/navVuebarAdmin.vue";
import ListTrainChart from "@/components/Admin/Chart/ListTrainChart.vue";

//user
import LoginUser from "@/components/view/loginUser.vue";
import RegisterUser from "@/components/view/registerUser.vue";
import ListUser from "@/components/User/ListTrainUser.vue";
import MainUser from "@/components/view/mainUser.vue";
import RegTrain from "@/components/User/RegTrainUser.vue";
import RegTrainUserById from "@/components/User/RegTrainUserById.vue";
import ShowTrain from "@/components/User/ShowtrainUser.vue";
import Showhis from "@/components/User/ShowHisUser.vue";
import EditUser from "@/components/User/editUser.vue";
import navVuebarUser from "@/components/view/navVuebarUser.vue";
import ShowUser from "@/components/User/showUser.vue";

const routes = [
  {
    path: "/countDown",
    name: "countDown",
    component: countDown,
  },

  //navVuebarUser
  {
    path: "/test",
    name: "test",
    component: navVuebarUser,
  },
  //navVuebarUser
  {
    path: "/navadmin",
    name: "navadmin",
    component: navVuebarAdmin,
  },
  //Home mainUser.vue
  {
    path: "/home",
    name: "home",
    component: MainUser,
  },

  //LoginUser loginUser.vue
  {
    path: "/",
    name: "loginUser",
    component: LoginUser,
  },

  //RegisterUser สมัครบัญชี registerUser.vue
  {
    path: "/registerUser",
    name: "registerUser",
    component: RegisterUser,
  },

  //Train เพิ่มรายการอบรมขึ้นมาใหม่ หน้า admin
  {
    path: "/createTrain",
    name: "createTrain",
    component: CreateTrain,
  },
  //ดูรายการอบรม หน้า sdmin
  {
    path: "/viewTrain",
    name: "viewTrain",
    component: ListTrain,
  },
  {
    path: "/editTrain/:id",
    name: "editTrain",
    component: EditTrain,
  },
  //ListUser แสดงรายชื่ออบรมในหน้าของ User
  {
    path: "/listTraintUser",
    name: "listTrainUser",
    component: ListUser,
  },

  //RegTrain  RegTrainUser.vue
  {
    path: "/regTrainUser",
    name: "regTrainUser",
    component: RegTrain,
  },
  {
    path: "/regTrainUserByID/:id",
    name: "regTrainUserByID",
    component: RegTrainUserById,
  },

  //LoginAdmin  
  {
    path: "/loginAdmin",
    name: "loginAdmin",
    component: LoginAdmin,
  },

  //Home mainAdmin.vue
  {
    path: "/homead",
    name: "homead",
    component: MainAdmin,
  },

  //แสดงข้อมูลของ user ที่ลงทะเบียน
  {
    path: "/listreg",
    name: "listreg",
    component: ListReg,
  },
  //ListUser แสดงรายชื่ออบรมในหน้าของ User
  {
    path: "/showtrainU/:id",
    name: "showtrainU",
    component: ShowTrain,
  },
  //ShowHis แสดงรายประวัติอบรมในหน้าของ User
  {
    path: "/showhis/:id",
    name: "showhis",
    component: Showhis,
  },
  //editUser
  {
    path: "/edituser/:id",
    name: "edituser",
    component: EditUser,
  },
  //ShowListTrain
  {
    path: "/showlistTU/:id",
    name: "showlistTU",
    component: ShowListTrain,
  },
  //ShowTrain
  {
    path: "/showtrain-ad/:id",
    name: "showtrain-ad",
    component: ShowT,
  },
  //ShowUser
  {
    path: "/showuser/:id",
    name: "showuser",
    component: ShowUser,
  },

  //ChartUser
  {
    path: "/chartshow/:id",
    name: "chartshow",
    component: ChartShow,
  },

  //ListtrainChart
  {
    path: "/list_train_chart",
    name: "list_train_chart",
    component: ListTrainChart,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;