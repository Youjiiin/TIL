"use strict";

let result = document.getElementById('result');

let words = [];

// 단어 렌더링 함수
const renderHandler = (arr) => {
    let resultHTML = "<ul>";
    arr.forEach(word => {
        resultHTML += `<li>${word}</li>`
    })
    resultHTML += "</ul>";

    result.innerHTML = resultHTML;
}

// 추가 함수
const addHandler = () => {
    let word = document.getElementById('word').value;
    words.unshift(word);
    console.log(words);

    renderHandler(words);
    document.getElementById('word').value = '';
}

// 대문자 변환 함수
const mapHandler = () => {
    let words_upper = words.map(w => w.toUpperCase());

    renderHandler(words_upper);
    words = [];
}

// 조건 필터링 함수
const filterHandler = () => {
    const words_filter = words.filter(w => w.length > 5);

    renderHandler(words_filter);
    words = [];
}

// 정렬 함수
const sortHandler = () => {
    const words_sort = words.sort();

    renderHandler(words_sort);
    words = [];
}