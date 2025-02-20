import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import store from "@/store";
//mport states from "@/store/states";

import MHotelReadPage from "@/views/hotelDetail/HotelReadPage.vue";
import MReservPage from "@/views/reserv/MReservPage.vue";
import TagSearchPage from "@/views/searchpage/TagSearchPage.vue";
import CommonSearchPage from "@/views/searchpage/CommonSearchPage.vue";

import BHotelModifyPage from "@/views/hotel/HotelModifyPage.vue";
import BHotelReadPage from "@/views/hotel/HotelReadPage.vue";

import BRoomReadPage from "@/views/room/RoomReadPage.vue";
import BRoomModifyPage from "@/views/room/RoomModifyPage.vue";
import RoomRegisterPage from "@/views/room/RoomRegisterPage.vue";

import WishListPage from "@/views/mypage/WishListPage.vue";
import MyPageBooking from "@/views/mypage/MyPageBooking.vue";
import MyPageBookingReserved from "@/views/mypage/MyPageBookingReserved.vue";
import MyPageBookingPending from "@/views/mypage/MyPageBookingPending";
import MyPageBookingCancelled from "@/views/mypage/MyPageBookingCancelled.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/member/MemberLogin.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/member/MemberSignUp.vue"),
  },
  {
    path: "/oauth2/redirect",
    name: "OAuth2Redirect",
    component: () => import("../views/member/OAuth2Redirect.vue"),
  },
  {
    path: "/BHotelListPage",
    name: "BHotelListPage",
    component: () => import("../views/hotel/HotelListPage.vue"),
  },
  {
    path: "/BHotelRegisterPage",
    name: "BHotelRegisterPage",
    component: () => import("../views/hotel/HotelRegisterPage.vue"),
  },
  {
    path: "/BHotelReadPage/:hotelNo/:hotelName",
    name: "BHotelReadPage",
    components: {
      default: BHotelReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/BHotelModifyPage/:hotelNo",
    name: "BHotelModifyPage",
    components: {
      default: BHotelModifyPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/BManageReservPage",
    name: "BManageReservPage",
    component: () => import("@/views/business/ManageReservPage"),
  },
  {
    path: "/mypage",
    name: "MyPage",
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) {
        next();
      } else {
        alert("로그인이 필요한 페이지입니다");
        next({ path: "/login" });
      }
    },
    component: () => import("../views/mypage/MyPage.vue"),
  },
  {
    path: "/roomRegister",
    name: "RoomRegisterPage",
    components: {
      default: RoomRegisterPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/mHotelReadPage/:hotelNo",
    name: "MHotelReadPage",
    components: {
      default: MHotelReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/mReservPage/:no",
    name: "MReservPage",
    components: {
      default: MReservPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/TagSearchPage/:word",
    name: "TagSearchPage",
    components: {
      default: TagSearchPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/BRoomListPage",
    name: "BRoomListPage",
    component: () => import("../views/room/RoomListPage.vue"),
  },
  {
    path: "/BRoomReadPage/:roomNo/:roomType",
    name: "BRoomReadPage",
    components: {
      default: BRoomReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/BRoomModifyPage/:roomNo",
    name: "BRoomModifyPage",
    components: {
      default: BRoomModifyPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/commonSearchPage/:num/:city/:personnel",
    name: "CommonSearchPage",
    components: {
      default: CommonSearchPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: "/wishlistpage",
    name: "WishListPage",
    components: {
      default: WishListPage,
    },
  },
  {
    path: "/mypagebooking",
    name: "MyPageBooking",
    components: {
      default: MyPageBooking,
    },
  },
  {
    path: "/mypagebookingreservd",
    name: "MyPageBookingReserved",
    components: {
      default: MyPageBookingReserved,
    },
  },
  {
    path: "/mypagebookingpending",
    name: "MyPageBookingPending",
    components: {
      default: MyPageBookingPending,
    },
  },
  {
    path: "/mypagebookingcancelled",
    name: "MyPageBookingCancelled",
    components: {
      default: MyPageBookingCancelled,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  store.dispatch("validate_login");
  next();
});

export default router;
