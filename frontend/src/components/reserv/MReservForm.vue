<template>
    <v-container>
        <!-- <v-form>태그가 들어가면 약관동의 다이얼로그가 안뜨네...왜지 그래서 일단 뺐습니다. -->
        <table style="width: 400px;">
            <tr>
                <td align="center">
                    <table v-if="Object.keys(reservationInfo).length !== 0" style="width: 400px;"> <!-- 예약자 정보 테이블 -->
                        <tr>
                            <td id="title1" colspan="2">
                                <h3>예약자 정보</h3>
                            </td>
                        </tr>
                        <tr>
                            <td id="title2">&ensp; 대표 투숙자 </td>
                            <td>&ensp; {{reservationInfo.username}} </td>
                       </tr>
                        <tr>
                            <td id="title2">&ensp; 숙소 이름 </td>
                            <td>&ensp; {{reservationInfo.hotelName}} </td>
                       </tr>
                        <tr>
                            <td id="title2">&ensp; 객실명 </td>
                            <td>&ensp; 객실 no. {{reservationInfo.roomId}}</td>
                        </tr>
                        <tr>
                            <td id="title2">&ensp; 숙박일 </td>
                            <td>&ensp; {{reservationInfo.startDate}} ~ {{reservationInfo.endDate}} </td>
                        </tr>
                        <tr>
                            <td id="title2">&ensp; 숙박 인원 </td>
                            <td>&ensp; {{reservationInfo.personnel}}명 </td>
                        </tr>
                        <tr>
                            <td id="title2">&ensp; 가격 </td>
                            <td>&ensp; {{reservationInfo.price}} 원 </td>
                        </tr>
                    </table>
                    <br>
                    
                </td>
            </tr>
    <hr>
            <tr>
                <td align="center">
                    <br>
                    <table style="width: 400px;"> <!-- 약관 안내 체크 -->
                        <tr>
                            <td id="title1" colspan="3">
                                <h3>약관 안내</h3>
                            </td>                         
                        </tr>
                        <tr>
                            <td>
                                <input class="check" type="checkbox" name="agree1" v-model="checkArray" value="checkOne">
                            </td>
                            <td> &ensp; 여행자 약관 동의 (필수) </td>
                            <td> <agree-dialog-one/> </td>
                        </tr>
                        <tr>
                            <td>
                                <input class="check" type="checkbox" name="agree2" v-model="checkArray" value="checkTwo">
                            </td>
                            <td> &ensp; 개인정보 제공 동의 (필수) </td>
                            <td> <agree-dialog-two/> </td>
                        </tr>
                        <tr>
                            <td>
                                <input class="check" type="checkbox" name="agree3" v-model="checkArray" value="checkThree">
                            </td>
                            <td> &ensp; 개인정보 수집 및 이용 동의 (필수) </td>
                            <td> <agree-dialog-three/> </td>
                        </tr>
                    </table>
                    <br>
                </td>
            </tr>
<hr>
            <tr>
                <td align="center">
                    <br>
                    <table style="width: 400px;">
                        <tr>
                            <td id="title1">
                                <h3>결제 수단</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-radio-group v-model="pay">
                                    <v-radio v-for="kinds in kindOfPay" :key="kinds" :label="`${kinds}`" :value="kinds"
                                    name="radio">
                                    </v-radio>
                                </v-radio-group>
                            </td>
                        </tr>
                    </table>
                    
                </td>
            </tr>
            <tr>
                <td align="center">
                    <br>
        <!-- 약관 안내 체크에 빠진 것이 없고 + 결제 라디오 버튼 중 한 개를 반드시 선택해야 결제가 가능하다. -->
                        <v-btn block id="button2" @click="requestPay">
                            결 제 하 기
                        </v-btn>
                </td>
            </tr>
        </table>
    </v-container>
</template>

<script>
import AgreeDialogOne from '@/components/reserv/AgreeDialogOne.vue'
import AgreeDialogThree from '@/components/reserv/AgreeDialogThree.vue'
import AgreeDialogTwo from '@/components/reserv/AgreeDialogTwo.vue'

export default {
    name: 'MReservForm',
    components: {
        AgreeDialogOne,
        AgreeDialogTwo,
        AgreeDialogThree

    },
    data() {
        return {
            pay: '',
            radioGroup:1,
            kindOfPay: [
                '신용/체크 카드',
            ],
            checkArray: []

        }
    },
    methods: {
      requestPay(){
        if (this.checkArray.length === 3 && this.pay)
            this.$emit('payRequest')
        else{
            alert("서비스 이용약관 및 결제 수단을 확인하세요")
        }
      }  
      
    },
    props: {
        reservationInfo: Object
    }
}
</script>

<style scoped>
td {
  color: rgb(34, 34, 34);
  font-size:14px;
  height: 30px;
}
#title1 {
    color:#18225c;
    padding: 10px 0px 10px 2px;
}
#title2 {
    color:#6e91b3;
    background-color: #e4f1f8;
    font-weight: bold;
    width: 95px;
}
#button2 {
    text-decoration: none;
    background-color: #54658a;
    position: relative;
    padding: 0 15px;
    color: #f8f8f8;
    font-weight: 600;
    font-size: 15px;
    line-height: 29px;
}

#button2:hover {
  background-color: #e63668;
}


.check {
  width:15px;
  height:15px;
  accent-color: #e63668;
}
.radio {
  width:300px;
  height:18px;
  accent-color: #e63668;
}

/*table, th, td{
    border-collapse:collapse;
    border: 1px solid black;
}*/

</style>