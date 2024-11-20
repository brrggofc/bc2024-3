const { program } = require('commander');
const fs = require('fs');


program
  .requiredOption('-i, --input <path>', 'шлях до файлу JSON для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);
const options = program.opts();


if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

try {
  
  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  
  const rates = data.map(item => item.rate).filter(rate => typeof rate === 'number');
  const maxRate = Math.max(...rates);

  const result = `Максимальний курс: ${maxRate}`;

  
  if (options.display) {
    console.log(result);
  }


  if (options.output) {
    fs.writeFileSync(options.output, result);
  }

  if (options.output && options.display) {
    console.log(`Максимальний курс також записано у файл: ${options.output}`);
  }

} catch (error) {
  console.error('Помилка при читанні або парсингу файлу:', error.message);
  process.exit(1);
}
//qq