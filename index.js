
const questions = [
  { key: "topic", label: "🧑‍💻 ماذا تريد أن تتعلم؟" },
  { key: "level", label: "📊 ما هو مستواك الحالي؟" },
  { key: "style", label: "📚 تفضل التعلم كيف؟" },
  { key: "time", label: "⏳ كم ساعة تستطيع أن تتعلم أسبوعياً؟" }
];

let step = 0;
let answers = {};

// عرض السؤال الحالي
function showQuestion() {
  const app = $("#app");
  const question = questions[step];

  app.innerHTML = ` 
    <div class="box">
      <h2>${question.label}</h2>
      <input id="answer" type="text" class="input"/>
      <button id="next" class="btn">
        ${step === questions.length - 1 ? "إنشاء الخطة" : "التالي"}
      </button>
    </div>`
  ; // ← دي لازم تقفل بـ backtick مش بعلامة تنصيص

  $("#next").onclick = nextStep;
}

// الانتقال للخطوة التالية أو توليد الخطة
async function nextStep() {
  const input = $("#answer").value.trim();
  if (!input) {
    alert("رجاءً أجب على السؤال");
    return;
  }

  answers[questions[step].key] = input;

  if (step < questions.length - 1) {
    step++;
    showQuestion();
  } else {
    $("#app").innerHTML = "<p>⏳ جاري إنشاء الخطة...</p>";
    try {
      const plan = await generatePlan(answers);
      $("#app").innerHTML = 
        <h2>📅 خطة التعلم الخاصة بك</h2>
        <pre>${JSON.stringify(plan, null, 2)}</pre>
      ;
    } catch (err) {
      console.error(err);
      $("#app").innerHTML = "<p>❌ حدث خطأ أثناء توليد الخطة</p>";
    }
  }
}

// بدء التشغيل
showQuestion();


