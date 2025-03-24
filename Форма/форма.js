document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращает перезагрузку страницы
    
    // Очистите поля формы
    this.reset();
    
    // Соберите данные из формы (если нужно отправить их)
    var formData = new FormData(this);
    
    // Отправьте данные на сервер (если нужно)
    fetch('/your-endpoint', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
});
