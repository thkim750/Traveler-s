<template>
  <div align="center" style="display: inline-block">
    <img src="@/assets/mypagereservbackimg.jpg"/>
    <v-container>
      <table style="width: 800px">
        <tr>
          <td align="left" colspan="2">
            <h2 class="pageTit">나의 예약 내역</h2>
          </td>
        </tr>

        <tr>
          <td align="left">
            <span class="page-count">전체</span>
          </td>
          <td>
            <v-row>
              <v-spacer></v-spacer>
              <span>환불 및 위약금 규정</span>
              <payment-dialog/>
              &ensp;
            </v-row>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <v-row>
              <v-col>
                <my-page-booking-list
                  :bookingLists="bookingLists"
                ></my-page-booking-list>
              </v-col>
            </v-row>
          </td>
        </tr>
      </table>
    </v-container>
  </div>
</template>

<script>
//import MyPageLeftMenu from "@/components/mypage/MyPageLeftMenu.vue";
import MyPageBookingList from "@/components/mypage/MyPageBookingList.vue";
import PaymentDialog from '@/components/mypage/PaymentDialog.vue';

import { mapActions, mapState } from "vuex";

export default {
  name: "MyBookingList",
  components: {
    //MyPageLeftMenu,
    MyPageBookingList,
    PaymentDialog,
  },
  data() {
    return {};
  },

  computed: {
    ...mapState(["user"]),
    ...mapState(["bookingLists"]),
  },
  methods: {
    ...mapActions(["setUser"]),
    ...mapActions(["fetchBookingLists"]),

    getStatusList(event) {
      this.status = event.target.value;
      this.fetchBookingLists(this.hotelNo);
      console.log(this.status);
    },
  },
  mounted() {
    this.setUser();
    this.fetchBookingLists();
  },
};
</script>

<style scoped>
/*table, th, td{
    border-collapse:collapse;
    border: 1px solid black;
}*/

div {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
}
h2 {
  padding: 50px 0px 30px 0px;
}
.pageTit {
  padding: 50px 0px 30px 0px;
  font-family: "NanumSquareRound";
  font-size: 2rem;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #202020;
  font-weight: 900;
}
.pageTit:after {
  content: "";
  display: inline-block;
  width: 4px;
  height: 4px;
  margin-bottom: 24px;
  border-radius: 50%;
  background-color: #e63668;
}
.page-count {
  margin-left: 15px;
  border: 1px;
  border-bottom: 5px solid #e63668;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  color: #18225c;
  -webkit-text-stroke: 0.7px #18225c;
}
.btn {
  position: sticky;
  left: 90%;
  text-decoration: none;
}
.reservation-select {
  margin-top: 10px;
  margin-left: 30px;
  width: 200px;
  height: 30px;
  border-radius: 2pt;
  box-shadow: 0 0 0 1pt grey;
  outline: none;
  transition: 0.1s;
}
.reservationNameLabel {
  font-size: 14px;
  margin-left: 50px;
}

  img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  /*
  background: linear-gradient(
            to bottom,
            rgba(255,255,255,0) 10%,
            rgba(255,255,255,0.5) 25%,
            rgba(255,255,255,0.7) 40%,
            rgba(255,255,255,1) 50%,
            rgba(255,255,255,1) 100%
          ), url(@/assets/hotelbackimg.jpg);
  background-repeat: no-repeat;*/
  
  }
</style>
