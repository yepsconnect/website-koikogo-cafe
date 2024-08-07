export default () => {
  const cakes = [
    {
      type: "cupcake",
      title: "Капкейк",
      additional: [
        { name: "Соленая карамель и банан", price: 20 },
        { name: "Малина", price: 30 },
      ],
      fillings: ["малина", "соленая карамель", "банан"],
      options: [
        {
          price: 80,
          weight: 1,
          unit: "шт.",
        },
      ],
    },
    {
      type: "cupcake",
      title: "Кейк - попс",
      description: null,
      fillings: [],
      options: [
        {
          price: 80,
          weight: 1,
          unit: "шт.",
        },
      ],
    },
    {
      type: "cupcake",
      title: "Трафл",
      description: null,
      fillings: [],
      options: [
        {
          price: 170,
          weight: 1,
          unit: "шт.",
        },
      ],
    },
    {
      type: "cupcake",
      title: "Панна котик",
      description: null,
      fillings: [],
      options: [
        {
          price: 120,
          weight: 1,
          unit: "шт.",
        },
      ],
    },
    {
      title: "Торт 1",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      title: "Торт 2",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      title: "Торт 3",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      title: "Торт 4",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      title: "Торт 5",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      title: "Торт 6",
      description: "",
      type: "wedding",
      fillings: [],
      options: [
        {
          price: 1100,
          weight: 1,
          unit: "кг",
          size: "6-9",
        },
        {
          price: 2200,
          weight: 2,
          unit: "кг",
          size: "10-12",
        },
        {
          price: 3300,
          weight: 3,
          unit: "кг",
          size: "16-18",
        },
        {
          price: 4400,
          weight: 4,
          unit: "кг",
          size: "20-24",
        },
        {
          price: 5500,
          weight: 5,
          unit: "кг",
          size: "26-30",
        },
        {
          price: 6600,
          weight: 6,
          unit: "кг",
          size: "30-36",
        },
        {
          price: 7700,
          weight: 7,
          unit: "кг",
          size: "36-42",
        },
      ],
    },
    {
      type: "traditional",
      title: "Манговый медовик",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Наполеон малиновый",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Меренговый рулет",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт Эстерхази",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт Красный бархат",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт Шоколадно-банановый",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт Сникерс",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Чизкейк с ягодным соусом",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Шоколадный чизкейк",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Чизкейк с малиной",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт Трюфель",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Торт три шоколада",
      description: "",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      type: "traditional",
      title: "Дизайн торта",
      description:
        "Стоимость дизайна дополнительных элементов определяется индивидуально. Просто укажите ваши пожелания в комментарии при оформлении заявки и мы сориентируем вас по стоимости и подберем идеальный вариант декора",
      price: "0*",
      fillings: [],
      options: [
        { price: 1100, weight: 1, unit: "кг", size: "6-9" },
        { price: 2200, weight: 2, unit: "кг", size: "10-12" },
        { price: 3300, weight: 3, unit: "кг", size: "16-18" },
        { price: 4400, weight: 4, unit: "кг", size: "20-24" },
        { price: 5500, weight: 5, unit: "кг", size: "26-30" },
        { price: 6600, weight: 6, unit: "кг", size: "30-36" },
        { price: 7700, weight: 7, unit: "кг", size: "36-42" },
      ],
    },
    {
      title: "Бенто Торт «С днем рождения»",
      description: "",
      fillings: [
        "Торт Красный бархат",
        "Торт Шоколадно-банановый",
        "Торт Сникерс",
        "Торт Прага",
      ],
      options: [
        {
          weight: 300,
          unit: "гр",
          size: "1-3",
          price: 590,
        },
        {
          weight: 700,
          unit: "гр",
          size: "3-5",
          price: 890,
        },
        {
          weight: 1000,
          unit: "гр",
          size: "6-9",
          price: 1490,
        },
      ],
      type: "bento",
    },
    {
      title: "Бенто Торт «Ваша Надпись и Дизайн»",
      description:
        "Свою надпись или фото можно оставить в комментарии при совершении заказа",
      fillings: [
        "Торт Красный бархат",
        "Торт Шоколадно-банановый",
        "Торт Сникерс",
        "Торт Прага",
      ],
      options: [
        {
          weight: 300,
          unit: "гр",
          size: "1-3",
          price: 590,
        },
        {
          weight: 700,
          unit: "гр",
          size: "3-5",
          price: 890,
        },
        {
          weight: 1000,
          unit: "гр",
          size: "6-9",
          price: 1490,
        },
      ],
      type: "bento",
    },
    {
      title: "Бенто Торт в форме сердца «Ваша Надпись и Дизайн»",
      description:
        "Свою надпись или фото можно оставить в комментарии при совершении заказа",
      fillings: [
        "Торт Красный бархат",
        "Торт Шоколадно-банановый",
        "Торт Сникерс",
        "Торт Прага",
      ],
      options: [
        {
          weight: 300,
          unit: "гр",
          size: "1-3",
          price: 690,
        },
        {
          weight: 700,
          unit: "гр",
          size: "3-5",
          price: 990,
        },
        {
          weight: 1000,
          unit: "гр",
          size: "6-9",
          price: 1690,
        },
      ],
      type: "bento",
    },
    {
      title: "Бенто Торт со свежими ягодами",
      description:
        "Свою надпись или фото можно оставить в комментарии при совершении заказа",
      fillings: [
        "Торт Красный бархат",
        "Торт Шоколадно-банановый",
        "Торт Сникерс",
        "Торт Прага",
      ],
      options: [
        {
          weight: 300,
          unit: "гр",
          size: "1-3",
          price: 790,
        },
        {
          weight: 700,
          unit: "гр",
          size: "3-5",
          price: 1090,
        },
        {
          weight: 1000,
          unit: "гр",
          size: "6-9",
          price: 1790,
        },
      ],
      type: "bento",
    },
  ];

  return {
    cakes,
  };
};
