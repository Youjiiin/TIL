document.getElementById('signupBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    
    // 취미
    const hobbies = [];
    if (document.getElementById('travel').checked) {
        hobbies.push('여행');
    }
    if (document.getElementById('cooking').checked) {
        hobbies.push('요리');
    }
    
    // 성별
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';

    // 결과 출력
    const resultDiv = document.getElementById('result');
    if (name && gender) {
        resultDiv.innerHTML = `<p>name: ${name}</p><p>취미: ${hobbies.join(' ')}</p><p>성별: ${gender}</p>`;
    } else {
        resultDiv.innerHTML = `<p>이름과 성별을 입력하세요!</p>`;
    }
});

document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('signupForm').reset();

    document.getElementById('result').innerHTML = '';
});
