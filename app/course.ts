export type Lesson = {
  title: string;
  subtitle: string;
  tag: string;
  minutes: number;
  intro: string;
  concepts: string[];
  code: string;
  output: string;
  exercise: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
};
export const lessons: Lesson[] = [
  {
    title: "ก้าวแรกกับ Python",
    subtitle: "ตัวแปร ชนิดข้อมูล และเงื่อนไข",
    tag: "PYTHON BASICS",
    minutes: 35,
    intro:
      "Python เป็นภาษาที่ใช้บอกคอมพิวเตอร์ให้ทำงานทีละขั้น ก่อนสร้าง AI เราจะเริ่มจากการเก็บข้อมูลและตัดสินใจด้วยเงื่อนไข เปิด Python 3 หรือ notebook ที่คุณใช้ แล้วลองพิมพ์ตัวอย่างด้วยตัวเอง",
    concepts: [
      "ตัวแปรใช้ชื่ออ้างถึงข้อมูล เช่น minutes = 45 โดยไม่ต้องประกาศชนิดล่วงหน้า",
      "str คือข้อความ, int คือจำนวนเต็ม, float คือทศนิยม และ bool คือ True หรือ False",
      "if / else เลือกทำงานตามเงื่อนไข บรรทัดภายในต้องเยื้อง 4 ช่องว่าง",
      "print() แสดงผล ส่วน # ใช้เขียนคำอธิบายที่ Python ไม่รัน",
    ],
    code: 'name = "นักสร้าง AI"\nminutes = 45\ngoal = 60\n\nprint(f"สวัสดี {name}")\nif minutes >= goal:\n    print("ครบเป้าหมายแล้ว")\nelse:\n    print(f"เรียนเพิ่มอีก {goal - minutes} นาที")',
    output: "สวัสดี นักสร้าง AI\nเรียนเพิ่มอีก 15 นาที",
    exercise:
      "เปลี่ยน minutes เป็น 75 แล้วรันอีกครั้ง จากนั้นสร้างตัวแปร weekly_goal = 300 และคำนวณเวลาเรียนที่ยังขาด โดยไม่แสดงค่าติดลบ",
    question: "ชนิดข้อมูลใดเหมาะสำหรับเก็บว่าเรียนจบแล้วหรือยัง?",
    choices: ["str — ข้อความ", "bool — จริงหรือเท็จ", "float — ทศนิยม"],
    answer: 1,
    explanation:
      "bool มีค่า True หรือ False จึงเหมาะกับสถานะที่มีสองทาง เช่น เรียนจบหรือยังไม่จบ",
  },
  {
    title: "เขียนโค้ดให้เป็นระบบ",
    subtitle: "List, Dictionary และ Function",
    tag: "CLEAN FOUNDATIONS",
    minutes: 45,
    intro:
      "ข้อมูล AI มักมีหลายรายการ List ช่วยเก็บรายการ ส่วน Dictionary เก็บข้อมูลเป็นคู่ชื่อและค่า ฟังก์ชันช่วยรวมขั้นตอนที่ใช้ซ้ำให้เรียกใช้งานได้สะดวก",
    concepts: [
      "List เรียงลำดับข้อมูลและเริ่มตำแหน่งที่ 0 เช่น scores[0]",
      'Dictionary เข้าถึงค่าผ่าน key เช่น student["name"]',
      "def สร้างฟังก์ชัน และ return ส่งผลลัพธ์กลับให้ผู้เรียก",
      "ตรวจรายการว่างก่อนหารด้วย len() เพื่อป้องกันการหารด้วยศูนย์",
    ],
    code: 'def average(scores):\n    if not scores:\n        return 0\n    return sum(scores) / len(scores)\n\nstudent = {"name": "Mai", "scores": [70, 80, 90]}\nprint(student["name"])\nprint(average(student["scores"]))',
    output: "Mai\n80.0",
    exercise:
      "สร้างข้อมูลนักเรียน 3 คน ใช้ for วนแสดงชื่อและคะแนนเฉลี่ย ทดลองส่ง [] เข้าฟังก์ชัน และคิดว่าการคืน 0 ต่างจากการไม่มีข้อมูลอย่างไร",
    question: "รายการ [70, 80, 90] มีค่าอะไรที่ตำแหน่ง 0?",
    choices: ["70", "80", "90"],
    answer: 0,
    explanation: "Python เริ่มนับ index ที่ 0 ดังนั้นตำแหน่งแรกคือ 70",
  },
  {
    title: "เปลี่ยนข้อมูลดิบให้พร้อมใช้",
    subtitle: "ตารางข้อมูล ค่าว่าง และข้อมูลซ้ำ",
    tag: "DATA PREPARATION",
    minutes: 50,
    intro:
      "คุณภาพข้อมูลส่งผลต่อโมเดลโดยตรง เราจะใช้ pandas จัดการตาราง ลบรายการซ้ำ และตรวจค่าว่าง ก่อนเริ่มให้ติดตั้งด้วย python -m pip install pandas ใน terminal ของสภาพแวดล้อมที่ใช้เรียน",
    concepts: [
      "DataFrame เป็นตารางที่มีแถวและคอลัมน์ สร้างจาก dictionary หรืออ่านด้วย pd.read_csv()",
      "isna().sum() นับค่าว่างเพื่อให้เห็นปัญหาก่อนแก้ไข",
      "drop_duplicates() ลบแถวที่ซ้ำกันทั้งหมด ส่วน fillna() เติมค่าว่าง",
      "ในงานโมเดลจริงต้องแบ่งข้อมูลก่อน และคำนวณค่าที่ใช้เติมจากชุดฝึกเท่านั้น เพื่อป้องกันข้อมูลรั่ว",
    ],
    code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "hours": [1, 2, 2, None],\n    "score": [50, 65, 65, 80]\n})\ndf = df.drop_duplicates()\nprint("แถวหลังลบซ้ำ:", len(df))\nprint("ค่าว่าง hours:", df["hours"].isna().sum())',
    output: "แถวหลังลบซ้ำ: 3\nค่าว่าง hours: 1",
    exercise:
      "เพิ่มแถวที่มี hours = 4 และ score = 90 ตรวจค่าว่าง แล้วลองเติม hours ด้วยค่ามัธยฐาน อธิบายว่าเหตุใดจึงไม่ควรเติมค่าทุกคอลัมน์ด้วย 0 เสมอไป",
    question: "ก่อนจัดการค่าว่าง ควรทำอะไรก่อน?",
    choices: [
      "แทนทุกช่องด้วย 0",
      "ลบข้อมูลทั้งหมด",
      "ตรวจจำนวนและความหมายของค่าว่าง",
    ],
    answer: 2,
    explanation:
      "ค่าว่างอาจหมายถึงไม่ทราบค่า หรือไม่เกี่ยวข้อง ต้องเข้าใจข้อมูลก่อนเลือกวิธีจัดการ",
  },
  {
    title: "อ่านเรื่องราวจากข้อมูล",
    subtitle: "สถิติ เวกเตอร์ และการสำรวจข้อมูล",
    tag: "DATA EXPLORATION",
    minutes: 45,
    intro:
      "ก่อนเลือกโมเดล ลองดูว่าข้อมูลบอกอะไร ค่าเฉลี่ยสรุปค่ากลางได้ แต่ค่าผิดปกติอาจดึงค่าเฉลี่ยออกจากข้อมูลส่วนใหญ่ เวกเตอร์คือกลุ่มตัวเลขที่ใช้แทนคุณลักษณะของตัวอย่างหนึ่งรายการ",
    concepts: [
      "ค่าเฉลี่ยคือผลรวมหารจำนวน ค่า median คือค่ากึ่งกลางเมื่อเรียงข้อมูล",
      "ค่าผิดปกติอาจเป็นข้อผิดพลาดหรือเหตุการณ์จริง ต้องตรวจที่มา",
      "Feature vector เช่น [พื้นที่, จำนวนห้อง] ใช้แทนบ้านหนึ่งหลัง",
      "ความสัมพันธ์ไม่ได้แปลว่าเป็นเหตุเป็นผล และกราฟต้องดูหน่วยกับขนาดตัวอย่างเสมอ",
    ],
    code: 'from statistics import mean, median\n\nincomes = [20, 22, 23, 25, 200]\nprint("mean:", mean(incomes))\nprint("median:", median(incomes))\nprint("ช่วงข้อมูล:", max(incomes) - min(incomes))',
    output: "mean: 58\nmedian: 23\nช่วงข้อมูล: 180",
    exercise:
      "เปลี่ยน 200 เป็น 26 แล้วเปรียบเทียบ mean กับ median เขียนข้อสรุปว่าค่าใดอธิบายรายได้ของคนส่วนใหญ่ได้ดีกว่าในตัวอย่างแรก",
    question: "ค่าใดถูกดึงด้วยค่าที่สูงผิดปกติได้มากในตัวอย่างนี้?",
    choices: ["ค่าเฉลี่ย (mean)", "ค่ามัธยฐาน (median)", "จำนวนรายการ"],
    answer: 0,
    explanation:
      "ค่าเฉลี่ยใช้ค่าทุกตัวในการรวม จึงได้รับผลจากค่า 200 มากกว่าค่ามัธยฐาน",
  },
  {
    title: "สร้างโมเดลแรกของคุณ",
    subtitle: "Feature, Label และ Regression",
    tag: "MACHINE LEARNING",
    minutes: 60,
    intro:
      "Machine Learning เรียนรู้ความสัมพันธ์จากตัวอย่าง Feature คือข้อมูลที่ใช้ทำนาย ส่วน Label คือคำตอบที่มีไว้ฝึก ติดตั้งเครื่องมือด้วย python -m pip install scikit-learn ก่อนทดลอง",
    concepts: [
      "Regression ทำนายตัวเลข เช่น คะแนน ส่วน Classification ทำนายประเภท",
      "X เป็นตาราง feature และ y เป็นคำตอบที่ตรงกับแต่ละแถว",
      "fit() ฝึกโมเดล ส่วน predict() ทำนายจากข้อมูลใหม่",
      "ข้อมูลตัวอย่างนี้มีน้อยและเป็นข้อมูลสมมติ ใช้เรียนรู้ขั้นตอน ไม่ใช่หลักฐานว่าโมเดลแม่นกับคนจริง",
    ],
    code: "from sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4]]\ny = [50, 60, 70, 80]\nmodel = LinearRegression()\nmodel.fit(X, y)\n\nprediction = model.predict([[5]])\nprint(round(float(prediction[0]), 1))",
    output: "90.0",
    exercise:
      "เปลี่ยนคะแนนของชั่วโมงที่ 4 จาก 80 เป็น 65 แล้วสังเกตผลทำนาย ลองทำนายที่ 20 ชั่วโมงและอธิบายว่าทำไมการทำนายนอกช่วงข้อมูลจึงต้องระวัง",
    question: "ถ้าทำนายราคาบ้าน Label คืออะไร?",
    choices: ["จำนวนห้อง", "ราคาบ้านที่ทราบจริง", "พื้นที่บ้าน"],
    answer: 1,
    explanation:
      "Label คือคำตอบที่ต้องการให้โมเดลเรียนรู้ ในงานนี้คือราคาบ้าน ส่วนพื้นที่และจำนวนห้องเป็น feature",
  },
  {
    title: "วัดผลให้เชื่อถือได้",
    subtitle: "ชุดทดสอบ Baseline และ Data Leakage",
    tag: "MODEL EVALUATION",
    minutes: 55,
    intro:
      "ผลที่ดีบนข้อมูลฝึกยังไม่บอกว่าโมเดลทำงานกับข้อมูลใหม่ได้ดี เราต้องเก็บชุดทดสอบแยกไว้ และเปรียบเทียบกับวิธีง่าย ๆ ที่เรียกว่า baseline",
    concepts: [
      "แยก train กับ test ก่อนเตรียมข้อมูลด้วยสถิติที่เรียนรู้จากข้อมูล",
      "MAE คือค่าเฉลี่ยของความคลาดเคลื่อนแบบค่าสัมบูรณ์ ยิ่งต่ำยิ่งดีสำหรับงานเดียวกัน",
      "Precision วัดความถูกต้องของรายการที่ทำนายว่าเป็นบวก ส่วน Recall วัดว่าพบรายการบวกจริงได้ครบแค่ไหน",
      "Overfitting คือการจำข้อมูลฝึกมากเกินไป อย่าปรับโมเดลตามชุดทดสอบซ้ำ ๆ ควรใช้ validation แยกต่างหาก",
    ],
    code: 'from sklearn.metrics import mean_absolute_error\n\nactual = [100, 150, 200]\npredicted = [110, 140, 230]\nbaseline = [150, 150, 150]\n\nprint("model MAE:", round(mean_absolute_error(actual, predicted), 2))\nprint("baseline MAE:", round(mean_absolute_error(actual, baseline), 2))',
    output: "model MAE: 16.67\nbaseline MAE: 33.33",
    exercise:
      "คำนวณ MAE ด้วยมือ แล้วเปลี่ยน predicted ให้ทุกค่าตรงกับ actual ลองอธิบายว่าคะแนนสมบูรณ์แบบอาจบ่งบอกข้อมูลรั่วได้อย่างไร",
    question: "ควรใช้ข้อมูลชุดใดวัดผลสุดท้าย?",
    choices: [
      "ชุดฝึกที่โมเดลเห็นแล้ว",
      "ชุดทดสอบที่กันไว้",
      "ชุดที่ได้คะแนนดีที่สุดหลังลองหลายรอบ",
    ],
    answer: 1,
    explanation:
      "ชุดทดสอบที่กันไว้ช่วยประเมินความสามารถกับข้อมูลที่ไม่เคยใช้ฝึกหรือเลือกโมเดล",
  },
  {
    title: "จาก Neural Network สู่ LLM",
    subtitle: "น้ำหนัก Loss และผลลัพธ์แบบ JSON",
    tag: "AI APPLICATIONS",
    minutes: 60,
    intro:
      "Neural Network รวมตัวเลขด้วยน้ำหนักแล้วแปลงผ่าน activation ระหว่างฝึก ระบบปรับน้ำหนักเพื่อลด loss ส่วนการใช้งาน LLM ผ่าน API คือเรียกโมเดลที่ฝึกมาแล้ว ไม่ใช่ฝึกโมเดลใหม่ ตัวอย่างนี้จำลองผลลัพธ์ API เพื่อเรียนรู้การตรวจข้อมูลโดยไม่ต้องมีคีย์",
    concepts: [
      "Tensor คือโครงสร้างข้อมูลตัวเลขหลายมิติ เวกเตอร์และเมทริกซ์เป็นกรณีย่อย",
      "Loss วัดความผิดพลาด ส่วน gradient บอกทิศทางการเปลี่ยนน้ำหนักที่ส่งผลต่อ loss",
      "แอปที่เรียก API ควรเก็บคีย์บนเซิร์ฟเวอร์ จัดการ timeout และจำกัดค่าใช้จ่าย",
      "ผลลัพธ์ LLM อาจผิด แม้แปลงเป็น JSON ได้ก็ยังต้องตรวจ schema และค่าที่อนุญาต",
    ],
    code: 'import json\n\n# จำลองข้อความตอบกลับจาก API\nresponse = \'{"category": "question", "summary": "สอบถามเวลาเรียน"}\'\nresult = json.loads(response)\nallowed = {"praise", "complaint", "question"}\n\nif result.get("category") not in allowed:\n    raise ValueError("หมวดหมู่ไม่ถูกต้อง")\nprint(result["category"])\nprint(result["summary"])',
    output: "question\nสอบถามเวลาเรียน",
    exercise:
      "เปลี่ยน category เป็น unknown แล้วสังเกตข้อผิดพลาด เพิ่มการตรวจว่า summary เป็นข้อความและไม่ใช่ข้อความว่าง จากนั้นลอง JSON ที่ไม่สมบูรณ์และจัดการ JSONDecodeError",
    question: "การเรียก LLM ผ่าน API หมายถึงอะไร?",
    choices: [
      "ฝึกโมเดลใหม่ทุกครั้ง",
      "ใช้โมเดลที่ฝึกไว้แล้วประมวลผล",
      "ผลลัพธ์ถูกต้องเสมอ",
    ],
    answer: 1,
    explanation:
      "การเรียกใช้งานทั่วไปคือ inference โมเดลใช้สิ่งที่เรียนรู้มาแล้วสร้างผลลัพธ์ ซึ่งยังต้องตรวจสอบ",
  },
  {
    title: "โปรเจกต์: ผู้ช่วยจัดหมวดข้อความ",
    subtitle: "เชื่อมข้อมูล โมเดล และการประเมินผล",
    tag: "FINAL PROJECT",
    minutes: 90,
    intro:
      "สร้างตัวจำแนกคำชม คำร้องเรียน และคำถาม เริ่มจาก baseline ตามกฎ แล้วพัฒนาโมเดลจากข้อความที่ติดป้ายกำกับด้วยตัวเอง เป้าหมายคือกระบวนการที่ตรวจสอบได้ ไม่ใช่ตัวเลขความแม่นยำที่ดูดีเพียงอย่างเดียว",
    concepts: [
      "เก็บข้อความหลายรูปแบบและติดป้าย praise / complaint / question ให้สม่ำเสมอ",
      "แยกข้อความซ้ำและข้อความใกล้เคียงให้อยู่ชุดเดียวกันก่อนแบ่ง train/test",
      "สำหรับขั้นต่อยอด ใช้ TfidfVectorizer แบบ char n-gram และ LogisticRegression ใน Pipeline เพื่อฝึกกับข้อความไทย",
      "รายงานผลแยกแต่ละหมวด ตรวจตัวอย่างที่ผิด และระบุว่าข้อมูลขนาดเล็กยังสรุปคุณภาพทั่วไปไม่ได้",
    ],
    code: 'def classify(text):\n    if "ไม่ดี" in text or "เสีย" in text:\n        return "complaint"\n    if "ไหม" in text or "?" in text:\n        return "question"\n    if "ดี" in text or "ชอบ" in text:\n        return "praise"\n    return "unknown"\n\nfor text in ["บริการดี", "สินค้าเสีย", "เปิดวันอาทิตย์ไหม"]:\n    print(classify(text))',
    output: "praise\ncomplaint\nquestion",
    exercise:
      "รวบรวมข้อความอย่างน้อยหมวดละ 20 รายการ แบ่งชุดทดสอบไว้ 20% เปรียบเทียบ baseline นี้กับ Pipeline ของคุณ ส่งโค้ด ตารางผลลัพธ์ ตัวอย่างทำนายผิด 5 ข้อ และข้อจำกัดของข้อมูล",
    question: "โปรเจกต์ที่พร้อมส่งควรมีอะไรนอกจากโค้ด?",
    choices: [
      "ผลประเมินและข้อจำกัด",
      "เฉพาะชื่อโมเดล",
      "เฉพาะภาพผลลัพธ์ที่ถูก",
    ],
    answer: 0,
    explanation:
      "ผลประเมินที่ทำซ้ำได้และข้อจำกัดช่วยให้ผู้อื่นเข้าใจว่าโมเดลใช้งานได้ดีในเงื่อนไขใด",
  },
];
