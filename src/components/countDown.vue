<template>
  <p>
    {{ diff.year }} years, {{ diff.month }} months, {{ diff.day }} days,<br>
    {{ diff.hour }} hours, {{ diff.minute }} minute, {{ diff.second }} seconds
    until
    {{ formatDate(futureDate) }}
  </p>
</template>
<script>
import axios from 'axios'

const futureDate = new Date();
const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds(),
  };
};
export default {
  name: "App",
  data() {
    return {
      futureDate,
      diff: {},
      timer: undefined,
      Trains:''
    };
  },
  created(){
    axios.get(`train/24}`).then((res) => {
      this.Trains = res.data[0];
    });
  },
  computed:{
   
  },
  methods: {
    formatDateOpen() {
    return new Date(this.Trains.showForm).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    },
    getDiff() {
      this.diff = getDateDiff(new Date(), futureDate);
    },
    formatDate(date) {
      let d = new Date(date),
        month = (d.getMonth() + 1).toString(),
        day = d.getDate().toString(),
        year = d.getFullYear().toString();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
  },
  beforeMount() {
    this.timer = setInterval(this.getDiff, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>