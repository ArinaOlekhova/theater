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
    'Гамлет' :
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

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Счет для ${invoice.customer}\n`; // `` вместо ''

  const format = new Intl.NumberFormat("ru-RU", {  // Intl вместо Inti
    style: "currency", 
    currency: "RUB", 
    minimumFractionDigits: 2 
  }).format;
  
  for (let perf of invoice.performance) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch (play.type) {
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

  // Добавление бонусов
  volumeCredits += Math.max(perf.audience - 30, 0); // Math вместо math

  // Дополнительный бонус за каждые 10 комедий
  if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5); // Math вместо math

  // Вывод строки счета
  result += ` ${play.name}: ${format(thisAmount / 100)}`; // `` вместо ''
  result += ` (${perf.audience} мест)\n`; // `` вместо ''
  totalAmount += thisAmount;
  } // Пропущена }

  result += `Итого с вас ${(format(totalAmount / 100))} \n`; // `` вместо ''
  result += `Вы заработали ${volumeCredits} бонусов\n`; // `` вместо ''
  
  return result; 
}