const createError = (status, message) => {
    const e = new Error();
    e.status = status;
    e.message = message;
    return e;
}

module.exports = {
    createError,
}

// Функция для создания ошибки, пример использования: createError(404, "Not found"); 
// Первый аргумент - код ошибки, второй - текст