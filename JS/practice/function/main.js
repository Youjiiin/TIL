function calcBonus(name, position, salary) {
    let bonusPercentage;

    // 직책에 따른 보너스 비율 설정
    if (position === 'A') {
        bonusPercentage = 0.3;
    } else if (position === 'B') {
        bonusPercentage = 0.2;
    } else if (position === 'C') {
        bonusPercentage = 0.1;
    } else {
        console.log("잘못된 직책입니다.");
        return;
    }

    const bonus = salary * bonusPercentage;

    console.log(`${name}의 추석 보너스는 ${bonus} 입니다.`);
}

calcBonus("홍길동", 'A', 1000);
calcBonus("김길동", 'B', 500);