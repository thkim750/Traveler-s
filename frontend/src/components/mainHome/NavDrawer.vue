<template>
  <v-col>
    <v-col id="profile">
      <v-col>
        <!--<img v-if="userInfo.profile_path" :src="require(`@/assets/img/${this.userInfo.profile_path}`)"
                  id="imageBefore" class="proimg" />-->
        <v-img
          v-if="userInfo.profile_path"
          :src="require(`@/assets/img/${this.userInfo.profile_path}`)"
          id="imageBefore"
          class="proimg"
        />
      </v-col>
      <v-card-title id="profileName">{{ userInfo.name }}</v-card-title>
    </v-col>
    <v-divider></v-divider>
    <v-col v-for="(index, i) in userInfo.roles" :key="i">
      <v-list v-if="index.name == 'ROLE_CEO'">
        <v-list-group
          v-for="(item, n) in items"
          :key="n"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-list v-else>
        <v-list-group
          v-for="(item2, n) in items2"
          :key="n"
          v-model="item2.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item2.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <template>
            <v-list-item
              v-for="subItem2 in item2.subItems2"
              :key="subItem2.title"
              :to="subItem2.to"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem2.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-group sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <a href="/mypagebooking">
                  <v-list-item-title>예약 내역 확인</v-list-item-title>
                </a>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="subItem3 in item2.subItems3"
              :key="subItem3.title"
              :to="subItem3.to"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem3.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-col>
  </v-col>
</template>

<script>
export default {
  name: "NavDrawer",

  props: {
    userInfo: [],
  },

  data() {
    return {
      drawer: false,
      items: [
        {
          title: "회원 메뉴",
          active: true,
          subItems: [
            { title: "마이페이지", to: "/mypage" },
            { title: "위시리스트", to: "/wishlistpage" },
            { title: "예약 내역 확인", to: "/mypagebooking" },
          ],
        },
        {
          title: "관리자 메뉴",
          subItems: [
            { title: "관리자 메뉴얼", to: "" },
            { title: "예약관리", to: "/BManageReservPage" },
            { title: "숙소관리", to: "/BHotelListPage" },
            { title: "객실관리", to: "/BRoomListPage" },
          ],
        },
      ],
      items2: [
        {
          title: "회원 메뉴",
          active: true,
          subItems2: [
            { title: "마이페이지", to: "/mypage" },
            { title: "위시리스트", to: "/wishlistpage" },
          ],
          subItems3: [
            { title: "RESERVED", to: "/mypagebookingreservd" },
            { title: "PENDING", to: "/mypagebookingpending" },
            { title: "CANCELLED", to: "/mypagebookingcancelled" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.proimg {
  width: 130px;
  height: 130px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 70%;
}
#profileName {
  width: auto;
  font-size: 20px;
  font-weight: 600;
  padding: 10px 2px 0px;
  font-family: "NanumSquareRound";
}
</style>
