document.getElementById('add-button').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText.trim() !== "") {
        const todoList = document.getElementById('todo-list');
        
        // 새 할일 항목 생성
        const newItem = document.createElement('li');
        newItem.textContent = todoText;
        
        // 항목 클릭 시 삭제
        newItem.addEventListener('click', function() {
            todoList.removeChild(newItem);
        });

        // 첫번째 줄에 항목 추가
        todoList.insertBefore(newItem, todoList.firstChild);
        
        // 입력 필드 비우기
        todoInput.value = "";
    }
});
