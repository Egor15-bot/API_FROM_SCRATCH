const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // Импортируем функцию uuidv4 из библиотеки

const app = express();
const port = process.env.PORT || 3000;

// здесь мы должны добавить валидатор чтобы просмто проверять что и куда добавляем якобы по маске
const validateData = (req, res, next) => {
  const allowedKeys = ["id", "name"];
  const requestData = req.body;

  for (const key in requestData) {
    if (!allowedKeys.includes(key)) {
      return res.status(400).json({ message: `Ключ "${key}" не разрешен` });
    }
  }

  next();
};

const isAuthorized = (req, res, next) => {
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    return res.status(402).json({ message: "No auth token provided" });
  } else if (apiKey !== "12345678") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};


// Поддержка парсинга JSON-данных
app.use(bodyParser.json());

// Массив элементов (замените его на свою логику данных)
const items = [];

const methods = {
  GET: "Получить данные",
  POST: "Создать новые данные",
  PUT: "Обновить существующие данные",
  DELETE: "Удалить данные",
  OPTIONS: "Получить доступные методы",
  WEB_DOC: "https://github.com/Egor15-bot/API_FROM_SCRATCH/tree/master",
};
// GET для получения данных
app.get("/api/items", isAuthorized, (req, res) => {
  res.json(items); // Отправляем массив элементов в ответ на GET-запрос
});

app.options("/api/items", isAuthorized, (req, res) => {
  res.json(methods); // Отправляем массив элементов в ответ на GET-запрос
});

// POST для создания новых данных
app.post("/api/items", validateData, isAuthorized, (req, res) => {
  const newItemData = req.body; // Получаем данные из тела POST-запроса

  if ("id" in newItemData) {
    res.status(400).json({
      message: "Поле ID не разрешено и генерируется автоматически ",
      hint: "Используйте формат { name: ваше_значение }",
    });
    return;
  }
  const newItem = {
    id: uuidv4(),
    name: newItemData.name,
  };

  items.push(newItem); // Добавляем новый элемент в массив
  res.json(newItem); // Возвращаем созданный элемент в ответе
});

// PUT для обновления данных
app.put("/api/items/:id", isAuthorized, (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemToUpdate = items.find((item) => item.id === itemId);

  if (itemToUpdate) {
    // Обновляем данные элемента
    itemToUpdate.name = updatedItem.name;
    res.json(itemToUpdate); // Возвращаем обновленный элемент
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

app.head("/api/items", isAuthorized, (req, res) => {
  res.status(200).json({
    totalItems: items.length,
    lastModified: new Date().toISOString(), // Время последнего изменения коллекции
    description: "This is a collection of items.", // Описание коллекции
    createdBy: "Bondar Egor", // Автор коллекции
    version: "1.0", // Версия коллекции
    tags: ["tag1", "tag2", "tag3"], // Теги или метки для коллекции
    documentationURL: "myownapi.ru", // URL документации по API
    license: "MIT License", // Лицензия, которая применяется к API
    rateLimit: "1000 requests per hour", // Ограничение на количество запросов
    customMetadata: { key1: "value1", key2: "value2" },
  });
});

// DELETE для удаления данных
app.delete("/api/items/:id", isAuthorized, (req, res) => {
  const encodedId = req.params.id;
  const decodedId = decodeURIComponent(encodedId); // Декодируем URL-кодированный ID

  const itemIndex = items.findIndex((item) => item.id === decodedId);

  if (itemIndex !== -1) {
    // Удаляем элемент из массива
    items.splice(itemIndex, 1);
    res.json({ message: "Элемент удален" });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

// Обработчик корневого URL
app.get("/", (req, res) => {
  res.send("Добро пожаловать на ваш сервер!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
