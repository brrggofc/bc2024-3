const { program } = require('commander');
const fs = require('fs');

// Встановлення версії програми
program.version('1.0.0');

// Додаємо опції командного рядка
program
  .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

// Парсинг аргументів командного рядка
program.parse(process.argv);

// Збереження опцій у змінній
const options = program.opts();

// Функція для обробки JSON-файлу та знаходження максимального курсу
function processJsonFile(inputPath, outputPath, display) {
  // Перевірка, чи існує вхідний файл
  if (!fs.existsSync(inputPath)) {
    console.error('Cannot find input file');
    process.exit(1);
  }

  // Читання вмісту файлу
  const fileData = fs.readFileSync(inputPath, 'utf8');
  let jsonData;
  try {
    jsonData = JSON.parse(fileData);
  } catch (error) {
    console.error("Error parsing JSON file");
    process.exit(1);
  }

  // Знаходимо максимальний курс
  const maxRate = jsonData.reduce((max, item) => item.rate > max ? item.rate : max, -Infinity);
  const result = `Максимальний курс: ${maxRate}`;

  // Виведення в консоль, якщо задано прапорець -d
  if (display) {
    console.log(result);
  }

  // Запис у файл, якщо задано шлях через -o
  if (outputPath) {
    fs.writeFileSync(outputPath, result, 'utf8');
  }
}

// Перевірка, чи задано обов’язковий параметр -i
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Викликаємо функцію з обраними параметрами
processJsonFile(options.input, options.output, options.display);
