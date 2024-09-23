"use strict";

// message 객체 생성
let message = {
    profileImg: '',
    name: '',
    date: '',
    text: '',
    emojiType: '',
    emojiNum: 0,

    // 출력 메서드
    addMessage: function(profileImg, name, date, text, emojiType, emojiNum) {
        this.profileImg = profileImg;
        this.name = name;
        this.date = date;
        this.text = text;
        this.emojiType = emojiType;
        this.emojiNum = emojiNum;

        console.log(this);
    }
};

// 메서드 호출
message.addMessage('졸린오리', '12. 장유진', '2024.09.04 오전 10:32', '디버깅 용도로 많이 사용합니다.', 'Thumbs Up', 9);