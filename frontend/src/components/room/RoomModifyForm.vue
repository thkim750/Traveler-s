<template>
    <form @submit.prevent="onSubmit">

    <!-- 기본정보 -->
    <div class="room">
        <div>
            <h3>기본정보</h3>
            <hr>
            <label class="roomTypeLabel">* 객실유형</label>
            <input type="text" class="roomTypeBox" v-model="roomType" placeholder="객실유형을 입력해주세요."/>
        </div>
         <div>
            <label class="roomNameLabel">* 객실가격</label>
            <input type="text" class="roomNameBox" v-model="price" placeholder="가격을 입력해주세요."/>
        </div>
        <div>
            <label class="perssonel"> *객실인원</label> 
            <input class="numberBox" v-model="personnel" type="number" min="1" max="100" step="1">
        </div>
    </div>
  
    <!-- 시설정보 -->
    <div class="roomInfo">
        <h3>시설정보</h3>
        <hr>
        <div class="roomInfobox">
        <label v-for="(info, idx) in infos" :key="idx">
            <input type="checkbox" name="roominfo" v-model="roomInfo" :value="info">{{info}}
        </label>
        </div>
    </div>

    <!-- 이미지 -->
    <div class="roomImg">
        <h3>이미지</h3>
        <hr>
        <p class="roomImgLabel">* 숙소이미지</p>
    </div>

    <div v-if="fileNum < 9">
        <input type="file" id="files" ref="files" 
                        multiple v-on:change="handleFilesUpload()" hidden />
        <div class="vbtn">
        <v-icon>
            mdi-image-plus 
        </v-icon>
        <v-btn @click="chooseFile" text>
            이미지 첨부
        </v-btn> 
        </div>
    </div>  
    <div v-else>
        <v-icon>
            mdi-close
        </v-icon>
        <v-btn @click="cancelFile" text>
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
                            <img :src="require(`@/assets/roomImg/${oldFiles[index]}`)" class="preview" width="100%" height="165px"/>
                            <v-icon @click="oldImgCancel(index)">
                            mdi-close
                            </v-icon>
                        </div>
                        <div v-else>
                            <img :src="files[index-oldFiles.length].preview" class="preview" width="100%" height="165px"/>
                            <v-icon @click="imgCancel(index-oldFiles.length)">
                            mdi-close
                            </v-icon>
                        </div>
                    </div>
                </td>
            </tr>

        </table>
    </div>
    
    <v-btn type="submit" class="btn1">저장하기</v-btn>
    <router-link :to="{ name: 'BRoomListPage' }" ><v-btn class="btn2">취소</v-btn></router-link>


</form>
</template>

<script>
export default {
    name: 'RoomRegisterForm',
     props: {
        bmRoom: {
            type: Object,
            require: true,
        },
    },
    data () {
        return {
            roomType: this.bmRoom.roomType,
            roomInfo: this.bmRoom.roomInfo,
            price: this.bmRoom.price,
            files: [],
            notImage: ['','','','','','','','',''],
            fileNum: 0,
            totalAddress:'',
            personnel: this.bmRoom.personnel,
            infos: [
                "욕조",
                "주방",
                "와이파이",
                "주차장",
                "세탁기",
                "건조기",
                "샤워실",
                "TV",
                "드라이기",
                "소화기"
            ],
            oldFiles: [],
        }
    },
    methods: {
        onSubmit () {
            if(this.fileNum < 5){
                alert('사진은 5장 이상 첨부해주세요')
            }else{
                const { price, roomType, personnel,roomInfo, files, oldFiles } = this
                this.$emit('submit', { price, roomType, personnel, roomInfo, files, oldFiles })
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
    watch: {
        price : function (){
            
            return this.price = this.price.replace(/[^0-9]/, '')
            }
    },
    created() {
        for (let i =0; i<this.bmRoom.roomImage.length; i++){
            this.oldFiles.push(this.bmRoom.roomImage[i])
        }
        this.fileNum = this.oldFiles.length
    }
}
</script>

<style scoped>
h3 {
    margin: 10px;
}
.room {
    margin: 50px 50px 10px 50px;
}
.roomName {
    position: absolute;
    top: 8%;
    left: 87%;
    font-size: 12px;
}
.roomNameLabel,
.roomTypeLabel,
.perssonel,
.hotelNameLabel
 {
    font-size: 14px;
    margin-left: 50px;
}
.roomNameBox, .hotelNameBox:focus,
.roomTypeBox, .roomTypeBox:focus {
    width: 400px;
    padding: 5px 8px;
    margin: 30px;
    font-size: 13px;
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt grey;
    outline: none;
    transition: .1s;
}
.numberBox, .numberBox:focus{
    width: 60px;
    padding: 5px 8px;
    margin: 30px;
    font-size: 13px;
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt grey;
    outline: none;
    transition: .1s;
}
.roomInfo {
    margin: 30px 50px 0px 50px;
}
.roomInfobox {
    padding: 50px 0px 0px 0px;
    text-align: center;
    word-spacing: 50px;
    letter-spacing: 1px;
    font-size: 14px;
}
input[name="roominfo"] {
    position: relative;
    right: 5px;
    top: 1px;
}
.hotelAddress {
    margin: 50px 50px 10px 50px;
}
.roomImg {
    margin: 50px 50px 10px 50px;
}
.roomImgLabel  {
    font-size: 14px;
    position: relative;
    left: 50px;
    top: 30px;
}
.btn {
    text-align: center;
    word-spacing: 10px;
}
table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: separate;
    border-spacing: 10px;
}

td {
    border: 1px solid black;
    width: 200px;
    height: 200px;
    text-align: center;
    
}
#files {
    margin: 30px
}
.btn1 {
    margin-left: 40%;
    margin-bottom: 30px;
    margin-top: 30px;
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
    margin-top: 30px;
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
.hotel-select{
    margin-top: 10px;
    margin-left: 30px;
    width: 200px;
    height: 30px;
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt grey;
    outline: none;
    transition: .1s;

}

.vbtn {
    margin-left: 85%;
}
</style>