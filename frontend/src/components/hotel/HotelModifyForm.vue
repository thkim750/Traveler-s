<template>
    <form @submit.prevent="onSubmit">

    <!-- 기본정보 -->
    <div class="hotelName">
        <h3>기본정보</h3>
        <hr>
        <label class="hotelNameLabel">* 숙소명</label>
        <input type="text" class="hotelNameBox" v-model="hotelName"/><br>
        <label class="hotelNameLabel">* 소개글</label>
        <input type="text" class="hotelNameBox" v-model="hotelIntro"/>
    </div>
    
    <!-- 시설정보 -->
    <div class="hotelInfo">
        <h3>시설정보</h3>
        <hr>
        <div class="hotelInfobox">
        <label v-for="(info, idx) in infos" :key="idx">
            <input type="checkbox" name="roominfo" v-model="hotelInfo" :value="info">{{info}}
        </label>
        </div>
    </div>

    <!-- 위치정보 -->
    <div class="hotelAddress">
        <h3>위치정보</h3>
        <hr>
        <div class="adApi">
            <label>우편번호</label>
                <input type="text" id="postcode" :value="bmHotel.postcode" readonly/><br>
                <label>주소</label>
                <input type="text" id="address" :value="bmHotel.totalAddress" readonly/>
        </div>
    </div>

    <!-- 이미지 -->
    <div class="hotelImg">
        <h3>이미지</h3>
        <hr>
        <p class="hotelImgLabel">* 숙소이미지</p>
    
    <div v-if="fileNum < 9">
        <input type="file" id="files" ref="files" 
                        multiple v-on:change="handleFilesUpload()" hidden />
        <v-btn @click="chooseFile"  class="vbtn">
            이미지 업로드
        </v-btn>
        <span>최대 9장까지 등록 가능합니다.</span>
    </div>

    <div v-else class="cancelFile">
        <v-btn @click="cancelFile">
            전체 취소
        </v-btn> 
    </div>
    <div>
         <table>
            <tr>
                <td v-for="(none, index) in notImage" :key="index" > 
                    <div v-if="oldFiles[index] == null && files[index-oldFiles.length] == null">
                        <v-icon>
                            mdi-image
                        </v-icon>
                    </div>
                    <div v-else>
                        <div v-if="index<oldFiles.length">
                            <img :src="require(`@/assets/hotelImg/${oldFiles[index]}`)" class="preview" width="100px" height="100px"/>
                            <v-icon @click="oldImgCancel(index)">
                            mdi-close
                            </v-icon>
                        </div>
                        <div v-else>
                            <img :src="files[index-oldFiles.length].preview" class="preview" width="100px" height="100px"/>
                            <v-icon @click="imgCancel(index-oldFiles.length)">
                            mdi-close
                            </v-icon>
                        </div>
                        
                    </div>
                </td>
            </tr>
        </table>
    </div>
    </div>
    
   <v-btn type="submit" class="btn1">저장하기</v-btn>
    <router-link :to="{ name: 'BHotelReadPage',
                                    params: { hotelNo: bmHotel.hotelNo.toString(), hotelName: bmHotel.hotelName } }">
                    취소
                </router-link>

</form>
</template>

<script>

export default {
    
name: 'HotelModifyForm',
props: {
    bmHotel: {
        type: Object,
        required: true
    }
},
data () {
    return {
        hotelName: '',
        hotelInfo: this.bmHotel.hotelInfo,
        hotelIntro: '',
        files: [],
        notImage: ['','','','','','','','',''],
        fileNum: 0,
        infos : [
            "오션뷰",
            "테라스",
            "수영장",
            "전기차충전",
            "공항근처",
            "골프장",
            "무료주차",
            "바베큐그릴",
            "반려동물",
            "온천"
        ],
        oldFiles: [],
    }
},
methods: {
    onSubmit () {
        if(this.fileNum < 5){
                alert('사진은 5장 이상 첨부해주세요')
            } else {
        const { hotelName, hotelInfo, hotelIntro, postcode, totalAddress,  files, oldFiles } = this
        this.$emit('submit', { hotelName, hotelInfo, hotelIntro, postcode, totalAddress, files, oldFiles })
        }
    },
    handleFilesUpload () {

            if(this.fileNum + this.$refs.files.files.length > 9){
                alert("최대 9장 까지 가능 합니다")
                this.$refs.files.value = ''
                return
            }

            if(this.fileNum + this.$refs.files.files.length < 10){
                        for (let i = 0; i < this.$refs.files.files.length; i++) {
                            this.files = [
                                ...this.files,
                                {
                                    file: this.$refs.files.files[i],
                                    preview: URL.createObjectURL(this.$refs.files.files[i])
                                }
                            ]
                        }
                        this.fileNum += this.$refs.files.files.length       
                     
            }else{
                alert("최대 9장 까지 가능 합니다")
                console.log(this.fileNum)
                //this.fileNum -= this.$refs.files.files.length
                this.$refs.files.value = ''
            }  
           },
           chooseFile() {
                document.getElementById("files").click()
        },
        cancelFile() {
            this.files = ''
            this.oldFiles = ''
            this.fileNum = 0
        },
        imgCancel(index) {
            //인덱스 어디부터 하나 삭제
            this.files.splice(index,1)
            this.fileNum -= 1
            console.log(this.files)
        },
        oldImgCancel(index){
            this.oldFiles.splice(index, 1)
            this.fileNum -= 1
            console.log(this.oldFiles)
        }
    },
 created () {
    this.hotelName = this.bmHotel.hotelName
    this.hotelInfo = this.bmHotel.hotelInfo
    this.hotelIntro = this.bmHotel.hotelIntro
    for (let i =0; i<this.bmHotel.hotelImages.length; i++){
            this.oldFiles.push(this.bmHotel.hotelImages[i])
        }
    this.fileNum = this.oldFiles.length
}
}
</script>

<style scoped>
form {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
a {
    text-decoration: none;
}
h3 {
    margin: 10px;
}
.hotelName {
    margin: 50px 50px 10px 50px;
}
.hotelNameP {
    position: absolute;
    top: 5%;
    left: 88%;
    font-size: 12px;
}
.hotelNameLabel {
    font-size: 14px;
    margin-left: 50px;
}
.hotelNameBox, .hotelNameBox:focus {
    width: 400px;
    padding: 5px 8px;
    margin: 30px;
    font-size: 13px;
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt grey;
    outline: none;
    transition: .1s;
}
.hotelInfo {
    margin: 30px 50px 0px 50px;
}
.hotelInfobox {
    padding: 50px 0px 0px 0px;
    text-align: center;
    word-spacing: 50px;
    letter-spacing: 1px;
    font-size: 14px;
}
input[name="hotelinfo"] {
    position: relative;
    right: 5px;
    top: 1px;
}
.hotelAddress {
    margin: 50px 50px 10px 50px;
}
.adApi {
    padding: 0px 0px 0px 50px;
    font-size: 14px;
    line-height: 50px;
}
input[id="postcode"] {
    width: 100px;
    padding: 5px 8px;
    margin: 30px 0px 0px 35px;
    font-size: 14px;
    font-weight: bold;
    outline: none;
}
input[id="address"] {
    width: 700px;
    padding: 5px 8px;
    margin: 0px 0px 0px 35px;
    font-size: 14px;
    font-weight: bold;
    outline: none;
}
.hotelImg {
    margin: 50px 50px 10px 50px;
}
.hotelImgLabel  {
    font-size: 14px;
    position: relative;
    left: 50px;
    top: 30px;
}
.btn1 {
    margin-left: 40%;
    margin-bottom: 30px;
    text-align: center;
    word-spacing: 15px;
    border: none;
    border-radius: 10px;
    padding: 10px 35px;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
}
.btn2 {
    margin-left: 10px;
    margin-bottom: 30px;
    text-align: center;
    word-spacing: 15px;
    border: none;
    border-radius: 10px;
    padding: 10px 35px;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
}
.vbtn {
    position: relative;
    left: 86%;
    bottom: 5px;
}
.cancelFile {
    position: relative;
    left: 87%;
    bottom: 5px;
}
table {
    position: relative;
    bottom: 50px;
    left: 140px;
    border-collapse: separate;
    border-spacing: 10px;
}
td {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    text-align: center;
}
#files {
    margin: 30px;
}
span {
    position: relative;
    left: 77%;
    top: 30px;
    font-size: 12px;
}
</style>