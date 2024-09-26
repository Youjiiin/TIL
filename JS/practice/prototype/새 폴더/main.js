"use strict"

// School 생성자 함수
function School(kor, eng) {
    this.kor = kor;
    this.eng = eng;
}

// sum 메서드 프로토타입에 저장
School.prototype.sum = function() {
    return this.kor + this.eng;
}


// avg 메서드 프로토타입에 저장
School.prototype.avg = function() {
    return (this.kor + this.eng) / 2;
}

let school1 = new School(100, 85);
console.log("school sum: " + school1.sum());
console.log("school avg: " + Math.round(school1.avg()));

// HighSchool 생성자 함수
function HighSchool(kor, eng) {
    // School 생성자 호출
    School.apply(this, [kor, eng]);
}

// HighSchool이 School의 프로토타입을 상속
HighSchool.prototype = new School();

// grade 메서드
HighSchool.prototype.grade = function() {
    const avgScore = this.avg();
    if (avgScore >= 90) {
        return 'A';
    } else if (avgScore >= 80) {
        return 'B';
    } else if (avgScore >= 70) {
        return 'C';
    } else if (avgScore >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

let high1 = new HighSchool(90, 75);
console.log("highschool sum: " + high1.sum());
console.log("highschool avg: " + Math.round(high1.avg()));
console.log("highschool grade: " + high1.grade());