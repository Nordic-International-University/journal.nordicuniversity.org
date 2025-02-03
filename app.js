import axios from "axios";

const faqData = [
  {
    key: "1",
    label: "Maqolani qabul qilish bo‘yicha qanday talablar mavjud?",
    children: "Maqola IMRAD talablari asosida qabul qilinadi.",
  },
  {
    key: "2",
    label: "Maqola topshirish pullikmi?",
    children: "Maqolani chop etish narxi 400 000 so'm",
  },
  {
    key: "3",
    label: "Maqolani topshirish muddati qachongacha?",
    children: "Har chorakda maqolalar yangi sonlar uchun qabul qilanadi",
  },
  {
    key: "4",
    label: "Jurnal OAK ro‘yxatiga kiruvchi jurnallar qatoridan o‘rin olganmi?",
    children:
      'Oliy attestatsiya komissiyasi (OAK) rayosati qaroriga ko‘ra, "Nordik" ilmiy-amaliy elektron jurnali milliy nashrlar ro‘yxatiga kiritilgan',
  },
  {
    key: "5",
    label: "Jurnalga kimlar maqola berishi mumkin?",
    children:
      "Jurnal barcha uchun ochiq, bu bo‘yicha hech qanday cheklovlar yo‘q.",
  },
  {
    key: "6",
    label:
      "Jurnalning bitta soniga ikki yoki undan ko‘p maqola berish mumkinmi?",
    children:
      "Bitta son uchun bitta eng dolzarb maqola berish tavsiya etiladi, agar maqolalar ikki va undan ortiq bo‘lsa keyingi sonlarda chiqarilishi mumkin.",
  },
  {
    key: "7",
    label:
      "Agar tahririyat tomonidan maqola nashr uchun tavsiya etilmasa nima qilish mumkin?",
    children:
      "Taqrizchi tomonidan maqola mazmuni va formati maqul deb topilmasa, muallifga kamchiliklarni tuzatish uchun qayta yuboriladi. Agar maqola belgilangan muddatlarda tahririyatga qayta kelib tushmasa, jurnalning keyingi sonlarida nashr qilishga tavsiya etadi.",
  },
];

const apiUrl = "https://journal2.nordicun.uz/about/faq";

async function postFAQ() {
  for (const item of faqData) {
    const payload = {
      question: item.label,
      answer: item.children,
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzZThiZDU5LTZhODQtNDNkNC1iMWRkLTk4MjU1ZTNmYzk0OSIsInVzZXJuYW1lIjoiQWJkdXJhdWYiLCJmaXJzdE5hbWUiOiJBYmR1cmF1ZiIsImlhdCI6MTczNzQ1NjYzMH0.cd2n8F3vSGBWfkiXBj8Rvd5Km6FFRvofeO_Ipo8E68Y",
        },
      });
      console.log(`✅ Successfully added: ${item.label}`);
    } catch (error) {
      console.error(
        `❌ Error adding: ${item.label}`,
        error.response?.data || error.message,
      );
    }
  }
}

postFAQ();
