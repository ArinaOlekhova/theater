const invoices = {
  "customer": "MDT",
  "performance": [
    {
      "playId": "Гамлет",
      "audience": 55,
      "type": "tragedy"
    },
    {
      "playId": "Ромео и Джульетта",
      "audience": 35,
      "type": "tragedy"
    },
    {
      "playId": "Отелло",
      "audience": 40,
      "type": "comedy"
    }
  ]
};

const plays = {
  'Гамлет':
  {
    name: 'Гамлет',
    type: "tragedy"
  },
  "Ромео и Джульетта":
  {
    name: 'Ромео и Джульетта',
    type: "tragedy"
  },
  "Отелло":
  {
    name: 'Отелло',
    type: "comedy"
  }
}

function statement(invoice) {
  let result = `Счет для ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("ru-RU", {
    style: "currency", currency: "RUB", minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performance) {
    // Вывод строки счета
    result += ` ${play(perf).name}: ${format(calculatePrice(perf) / 100)}`;
    result += ` (${perf.audience} мест)\n`;
  }

  result += `Итого с вас ${(format(countTotalAmount(invoices) / 100))} \n`;
  result += `Вы заработали ${countVolumeCredits(invoices)} бонусов\n`;

  return result;
}

const play = (perf) => plays[perf.playId];

function calculatePrice(perf) {
  let thisAmount = 0;

  switch (play(perf).type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error('неизвестный тип: ${play.type}');
  }

  return thisAmount;
}

function addBonus(perf) {
  let volumeCredits = 0;

  // Добавление бонусов
  volumeCredits += Math.max(perf.audience - 30, 0);

  // Дополнительный бонус за каждые 10 комедий
  if ("comedy" === play(perf).type) volumeCredits += Math.floor(perf.audience / 5);

  return volumeCredits;
}

function countTotalAmount(invoice) {
  // Итоговая сумма
  let totalAmount = 0;
  for (let perf of invoice.performance) {
    totalAmount += calculatePrice(perf);
  }
  return totalAmount;
}

function countVolumeCredits(invoice) {
  // Считаем бонусы
  for (let perf of invoice.performance) {
    volumeCredits = addBonus(perf);
  }
  return volumeCredits;
}

console.log(statement(invoices, plays));