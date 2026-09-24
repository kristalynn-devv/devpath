import type { Lesson } from "./course";
export type Course = {
  id: number;
  track?: "python" | "javascript" | "node" | "nextjs";
  title: string;
  subtitle: string;
  prerequisite: string;
  project: string;
  groups: string[];
  sources: { title: string; url: string }[];
  lessons: Lesson[];
};
export const advancedCourses: Course[] = [
  {
    id: 2,
    title: "Machine Learning เชิงลึก",
    subtitle: "จากข้อมูลสู่การทดลองที่เชื่อถือได้",
    prerequisite: "จบคอร์ส 1 หรือเขียนฟังก์ชัน Python และจัดการตารางได้",
    project: "ระบบทำนายพร้อมรายงานการทดลอง",
    groups: [
      "คณิตศาสตร์ของโมเดล",
      "Pipeline และ validation",
      "ประเมินและปรับโมเดล",
      "วิเคราะห์และส่งมอบ",
    ],
    sources: [
      {
        title: "scikit-learn: Common pitfalls",
        url: "https://scikit-learn.org/stable/common_pitfalls.html",
      },
      {
        title: "scikit-learn: Pipeline",
        url: "https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html",
      },
    ],
    lessons: [
      {
        title: "เวกเตอร์และโมเดลเชิงเส้น",
        subtitle: "Dot product, shape และ prediction",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "โมเดลเชิงเส้นรวม feature ด้วยน้ำหนักและ bias ความเข้าใจเรื่องมิติช่วยตรวจข้อผิดพลาดก่อนฝึกโมเดล ตัวอย่างนี้ใช้ Python มาตรฐาน ไม่ต้องติดตั้งไลบรารี",
        concepts: [
          "เวกเตอร์ x และ w ต้องมีจำนวนสมาชิกเท่ากันก่อนคูณแบบ dot product",
          "สมการ y = w·x + b เป็นการแปลง feature ไปเป็นค่าทำนาย",
          "หน่วยของ feature ต่างกันทำให้ขนาดน้ำหนักเทียบกันตรง ๆ ไม่ได้",
        ],
        code: "x = [2, 3]\nw = [4, -1]\nb = 5\nassert len(x) == len(w)\ny = sum(a * c for a, c in zip(x, w)) + b\nprint(y)",
        output: "10",
        exercise:
          "สร้างฟังก์ชันทำนายที่ตรวจมิติและปฏิเสธเวกเตอร์ขนาดไม่เท่ากัน ทดสอบค่าเป็นลบและเวกเตอร์ศูนย์ พร้อมอธิบายผลของ bias",
        question: "ก่อนทำ dot product ต้องตรวจอะไร?",
        choices: ["ชื่อของตัวแปร", "จำนวนสมาชิกเท่ากัน", "ข้อมูลทุกตัวเป็นบวก"],
        answer: 1,
        explanation:
          "การจับคู่สมาชิกต้องมีมิติเท่ากัน zip จะตัดส่วนเกินเงียบ ๆ จึงควรตรวจมิติก่อน",
      },
      {
        title: "อนุพันธ์และ Gradient Descent",
        subtitle: "ปรับน้ำหนักเพื่อลดความผิดพลาด",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "อนุพันธ์บอกอัตราการเปลี่ยนแปลงของ loss เมื่อเปลี่ยนน้ำหนัก เราเดินสวน gradient เพื่อลด loss ในบริเวณนั้น ไม่ได้รับประกันว่าจะถึงคำตอบดีที่สุดสำหรับทุกฟังก์ชัน",
        concepts: [
          "สำหรับ L=(w−3)² จะได้ gradient 2(w−3)",
          "Learning rate ใหญ่เกินไปทำให้แกว่งหรือ diverge เล็กเกินไปฝึกช้า",
          "ติดตามค่า loss และหยุดเมื่อไม่ดีขึ้น แทนการดูเพียงจำนวนรอบ",
        ],
        code: "w = 0.0\nrate = 0.1\nfor step in range(3):\n    gradient = 2 * (w - 3)\n    w -= rate * gradient\n    print(step + 1, round(w, 3))",
        output: "1 0.6\n2 1.08\n3 1.464",
        exercise:
          "ทดลอง rate 0.01, 0.1 และ 1.1 เป็นเวลา 30 รอบ บันทึก loss ทุกครั้ง วาดกราฟและอธิบายว่ากรณีใดไม่ลู่เข้า",
        question: "Gradient descent ปรับ w อย่างไร?",
        choices: [
          "ลบ learning rate คูณ gradient",
          "บวก gradient เสมอ",
          "ตั้ง w เป็นศูนย์ทุกครั้ง",
        ],
        answer: 0,
        explanation:
          "เราลบ gradient เพื่อเดินไปทิศที่ลด loss ในบริเวณใกล้เคียง โดยขนาดก้าวขึ้นกับ learning rate",
      },
      {
        title: "Pipeline ที่ป้องกันข้อมูลรั่ว",
        subtitle: "Imputation, scaling และ estimator",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "ติดตั้ง numpy และ scikit-learn ด้วย python -m pip install numpy scikit-learn จากนั้นรวม preprocessing กับโมเดลใน Pipeline เพื่อให้ขั้นตอนที่ต้องเรียนรู้สถิติใช้เฉพาะข้อมูลฝึก",
        concepts: [
          "fit เรียนรู้ median และ mean จาก train ส่วน transform ใช้ค่าเดิมกับข้อมูลใหม่",
          "Pipeline คุมลำดับ แต่ยังรั่วได้หาก feature มีคำตอบจากอนาคต",
          "การบันทึก pipeline ทั้งชุดช่วยให้ตอนทำนายใช้ preprocessing เดียวกับตอนฝึก",
        ],
        code: "from sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(), StandardScaler(), LogisticRegression())\nprint([type(step).__name__ for step in model.named_steps.values()])",
        output: "['SimpleImputer', 'StandardScaler', 'LogisticRegression']",
        exercise:
          "ใช้ชุดข้อมูล breast_cancer ที่มากับ sklearn แบ่ง train/test ก่อน fit และเปรียบเทียบ Pipeline กับ DummyClassifier โดยใช้ข้อมูลเพื่อฝึกวิธีประเมินเท่านั้น",
        question: "ควร fit scaler บนข้อมูลใด?",
        choices: ["train และ test รวมกัน", "test เท่านั้น", "train เท่านั้น"],
        answer: 2,
        explanation:
          "การใช้ test คำนวณสถิติก่อนประเมินทำให้ข้อมูลที่กันไว้ไหลเข้า preprocessing",
      },
      {
        title: "เลือกวิธีแบ่งข้อมูลให้ตรงโลกจริง",
        subtitle: "Stratified, group และ time split",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "การสุ่มแถวใช้ได้เมื่อข้อสมมติเรื่องความเป็นอิสระเหมาะสม หากผู้ใช้หนึ่งคนมีหลายแถว หรือข้อมูลมาจากหลายช่วงเวลา การแบ่งแบบสุ่มอาจทำให้คะแนนดูดีเกินจริง",
        concepts: [
          "Stratified split รักษาสัดส่วนคลาส แต่ไม่ได้แก้การซ้ำกันของผู้ใช้",
          "Group split กันคนหรืออุปกรณ์เดียวกันออกจากคนละชุด",
          "ข้อมูลอนาคตต้องไม่ถูกใช้ฝึกเพื่อทำนายอดีต พิจารณา gap หาก feature ใช้หน้าต่างเวลา",
        ],
        code: "from sklearn.model_selection import GroupKFold\nX = [[i] for i in range(6)]\ny = [0, 1, 0, 1, 0, 1]\ngroups = [1, 1, 2, 2, 3, 3]\nfor train, test in GroupKFold(3).split(X, y, groups):\n    overlap = set(groups[i] for i in train) & set(groups[i] for i in test)\n    print(len(overlap))",
        output: "0\n0\n0",
        exercise:
          "จำลองข้อมูลลูกค้า 10 คน คนละ 5 แถว เปรียบเทียบ KFold กับ GroupKFold แล้วเขียนว่า split ใดตอบโจทย์ทำนายลูกค้าใหม่ได้ตรงกว่า",
        question: "ถ้าคนเดียวมีหลายแถวและต้องทำนายคนใหม่ ควรแบ่งตามอะไร?",
        choices: ["หมายเลขแถว", "กลุ่มบุคคล", "เรียง label แล้วตัดครึ่ง"],
        answer: 1,
        explanation:
          "ต้องกันตัวอย่างของคนเดียวกันไว้ชุดเดียวกัน เพื่อไม่ให้โมเดลเห็นลักษณะเฉพาะของคนในชุดทดสอบ",
      },
      {
        title: "Metric และ Threshold",
        subtitle: "Precision, Recall, F1 และต้นทุน",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "ตัวทำนายความน่าจะเป็นกับเกณฑ์ตัดสินใจเป็นคนละเรื่อง ในคลาสไม่สมดุล accuracy อาจดูสูงแม้ไม่ตรวจพบคลาสสำคัญเลย",
        concepts: [
          "Precision = TP/(TP+FP) ส่วน recall = TP/(TP+FN)",
          "Threshold ที่ลดลงมักเพิ่ม recall แต่เพิ่ม false positive ด้วย",
          "เลือก threshold บน validation โดยดูต้นทุนของความผิดพลาด ไม่เลือกจาก test",
        ],
        code: "from sklearn.metrics import precision_score, recall_score\ny = [1, 1, 0, 0]\nprob = [0.9, 0.4, 0.6, 0.1]\nfor t in [0.5, 0.3]:\n    pred = [int(p >= t) for p in prob]\n    print(t, round(precision_score(y, pred), 2), recall_score(y, pred))",
        output: "0.5 0.5 0.5\n0.3 0.67 1.0",
        exercise:
          "สร้างตาราง confusion matrix ที่ threshold 0.2 ถึง 0.8 กำหนดต้นทุน FN=5 และ FP=1 แล้วเลือก threshold บน validation",
        question: "Accuracy สูงเพียงอย่างเดียวเพียงพอไหมในคลาสไม่สมดุล?",
        choices: [
          "ไม่ ต้องดู metric และต้นทุนร่วมกัน",
          "เพียงพอเสมอ",
          "ใช้จำนวน epoch แทนได้",
        ],
        answer: 0,
        explanation:
          "ความผิดพลาดคนละชนิดมีผลต่างกัน และการทายคลาสใหญ่ทุกครั้งก็อาจได้ accuracy สูง",
      },
      {
        title: "Tuning โดยไม่หลอกตัวเอง",
        subtitle: "Cross-validation และ search budget",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "เลือก hyperparameter ด้วย cross-validation ภายในชุดฝึก ก่อนประเมินชุดทดสอบครั้งสุดท้าย กำหนดงบการค้นหาไว้ก่อนเพื่อไม่ไล่คะแนนตาม noise",
        concepts: [
          "ทุก fold ต้อง fit preprocessing ใหม่ จึงควรส่ง Pipeline ให้ตัวค้นหา",
          "การลองหลายแบบบน test คือการเลือกโมเดลจาก test แม้ไม่ได้เรียก fit บนนั้น",
          "รายงานค่าเฉลี่ยและความแปรปรวนของ fold พร้อมจำนวนการทดลอง",
        ],
        code: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import GridSearchCV\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nX, y = load_iris(return_X_y=True)\npipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))\nsearch = GridSearchCV(pipe, {'logisticregression__C': [0.1, 1, 10]}, cv=3)\nsearch.fit(X, y)  # ตัวอย่างนี้สาธิต CV; ยังไม่มี final holdout\nprint(len(search.cv_results_['params']))",
        output: "3",
        exercise:
          "เพิ่ม final holdout 20% ก่อนรัน search บน 80% ที่เหลือ เก็บค่า best_params, CV score และ test score อธิบายเมื่อ CV กับ test ต่างกันมาก",
        question: "ชุด test ใช้เลือก C ได้ไหม?",
        choices: [
          "ได้ถ้าไม่ใช้ fit",
          "ได้ถ้าลองแค่สองค่า",
          "ไม่ได้ ควรเลือกบน validation/CV",
        ],
        answer: 2,
        explanation:
          "การใช้คะแนน test เลือกค่าทำให้ test มีส่วนในการตัดสินใจและไม่เป็นการประเมินอิสระอีกต่อไป",
      },
      {
        title: "Error Analysis และความไม่แน่นอน",
        subtitle: "Slice analysis และข้อจำกัดของตัวอย่าง",
        tag: "PROJECT",
        minutes: 75,
        intro:
          "ค่าเฉลี่ยอาจซ่อนกลุ่มที่โมเดลผิดมาก ตรวจผลแยกกลุ่มที่สัมพันธ์กับการใช้งาน และรายงานจำนวนตัวอย่างเสมอ ก่อนสรุปความแตกต่าง",
        concepts: [
          "กลุ่มที่มี 2 ตัวอย่างไม่น่าเชื่อถือเท่ากลุ่มที่มี 2,000 ตัวอย่าง",
          "ตรวจ label ผิดและข้อมูลขาดก่อนเปลี่ยนสถาปัตยกรรม",
          "ความสัมพันธ์ของ feature importance ไม่ใช่หลักฐานเชิงเหตุผล",
        ],
        code: "rows = [('short', True), ('short', False), ('long', False)]\nfor group in ['short', 'long']:\n    results = [ok for name, ok in rows if name == group]\n    print(group, len(results), sum(results) / len(results))",
        output: "short 2 0.5\nlong 1 0.0",
        exercise:
          "แบ่งข้อผิดพลาดของโมเดลจากบทก่อนตามช่วง feature หนึ่งตัว รายงาน n และ error rate ต่อกลุ่ม พร้อมสมมติฐานและข้อมูลที่จะเก็บเพิ่ม",
        question: "เมื่อกลุ่มหนึ่งมีเพียง 1 ตัวอย่าง ควรทำอย่างไร?",
        choices: [
          "ยืนยันว่ากลุ่มนั้นแย่เสมอ",
          "รายงานจำนวนและเก็บข้อมูลเพิ่ม",
          "ซ่อนกลุ่มนั้น",
        ],
        answer: 1,
        explanation:
          "จำนวนตัวอย่างน้อยทำให้ผลแปรปรวนสูง ต้องแสดงความไม่แน่นอนและเก็บหลักฐานเพิ่ม",
      },
      {
        title: "โปรเจกต์: การทดลอง ML ที่ทำซ้ำได้",
        subtitle: "Baseline → validation → final report",
        tag: "PROJECT",
        minutes: 180,
        intro:
          "เลือกข้อมูลตารางที่มีสิทธิ์ใช้งาน ระบุโจทย์ ผู้ใช้ และต้นทุนความผิดพลาดก่อนเริ่ม คุณต้องส่งทั้งผลที่ดีและข้อผิดพลาดที่ยังแก้ไม่ได้",
        concepts: [
          "ส่งสคริปต์เตรียมข้อมูลและฝึกที่รันซ้ำได้พร้อม random seed",
          "เทียบ Dummy baseline กับอย่างน้อยสองโมเดลโดยใช้ split เดียวกัน",
          "ส่งผล holdout, slice analysis และ data/model card; ไม่เลือกโมเดลจาก test",
        ],
        code: "import json\nexperiment = {\n    'seed': 42, 'split': 'group-by-customer',\n    'metric': 'f1', 'baseline': 'most-frequent',\n    'test_used_for_selection': False\n}\nprint(json.dumps(experiment, sort_keys=True))",
        output:
          '{"baseline": "most-frequent", "metric": "f1", "seed": 42, "split": "group-by-customer", "test_used_for_selection": false}',
        exercise:
          "ส่ง repository ที่มีคำสั่งรันครบ รายงาน baseline/CV/holdout ตารางข้อผิดพลาด 10 ตัวอย่าง และข้อจำกัด เกณฑ์ผ่าน: split ไม่มี leakage, รันซ้ำได้, metric ตรงโจทย์ และไม่อ้างเกินหลักฐาน",
        question: "หลักฐานที่สำคัญที่สุดในการส่งงานคืออะไร?",
        choices: [
          "คะแนนสูงอย่างเดียว",
          "จำนวนโมเดลที่ลอง",
          "ขั้นตอนทำซ้ำได้และผลประเมินที่เป็นอิสระ",
        ],
        answer: 2,
        explanation:
          "ผู้ตรวจต้องทำซ้ำและตรวจที่มาของคะแนนได้ จึงจะเชื่อผลและข้อจำกัดของระบบได้",
      },
    ],
  },
  {
    id: 3,
    title: "Deep Learning ด้วย PyTorch",
    subtitle: "เข้าใจการเรียนรู้จาก gradient ถึง attention",
    prerequisite: "คอร์ส 2 และเข้าใจเวกเตอร์ gradient และ train/test split",
    project: "โมเดลภาพพร้อมการทดลอง ablation",
    groups: [
      "Tensor และ gradient",
      "ฝึกและตรวจโมเดล",
      "CNN และ attention",
      "Checkpoint และโปรเจกต์",
    ],
    sources: [
      {
        title: "PyTorch: Learn the Basics",
        url: "https://docs.pytorch.org/tutorials/beginner/basics/index.html",
      },
    ],
    lessons: [
      {
        title: "Tensor และ Broadcasting",
        subtitle: "Shape, dtype และ batch dimension",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "ติดตั้ง PyTorch ตามตัวเลือก CPU/GPU ของเครื่องจากเอกสาร PyTorch ก่อนเรียน ตัวอย่างพื้นฐานใช้ CPU ได้ทั้งหมด Tensor เก็บตัวเลขหลายมิติและดำเนินการเป็นชุด",
        concepts: [
          "batch dimension แทนหลายตัวอย่าง เช่น (32, 10) คือ 32 ตัวอย่าง 10 feature",
          "Broadcasting เทียบขนาดจากมิติท้าย มิติต้องเท่ากันหรือด้านหนึ่งมีขนาด 1",
          "การคูณ * เป็น elementwise ส่วน @ เป็น matrix multiplication",
        ],
        code: "import torch\nx = torch.tensor([[1., 2.], [3., 4.]])\nbias = torch.tensor([10., 20.])\nprint((x + bias).tolist())\nprint(list(x.shape))",
        output: "[[11.0, 22.0], [13.0, 24.0]]\n[2, 2]",
        exercise:
          "ทดลอง x + tensor ขนาด (2,1) และ (3,) อธิบายว่าอันไหนสำเร็จ จากนั้นคำนวณ x @ x และตรวจด้วยมือ",
        question: "เครื่องหมาย @ สำหรับ tensor สองมิติคืออะไร?",
        choices: ["Matrix multiplication", "คูณตำแหน่งเดียวกัน", "บวก bias"],
        answer: 0,
        explanation:
          "@ รวมผลคูณตามมิติด้านใน ส่วน * คูณสมาชิกตามตำแหน่งและกฎ broadcasting",
      },
      {
        title: "Autograd และกราฟคำนวณ",
        subtitle: "Backward และ gradient accumulation",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "Autograd บันทึกการดำเนินการเพื่อนำกฎลูกโซ่มาคำนวณ gradient การเรียก backward หลายครั้งโดยไม่ล้าง gradient จะสะสมค่า ซึ่งอาจตั้งใจใช้หรือกลายเป็นบั๊ก",
        concepts: [
          "requires_grad=True เปิดติดตาม gradient ของ tensor",
          "backward() คำนวณอนุพันธ์ของ scalar loss ต่อพารามิเตอร์",
          "zero_grad() ควรอยู่ก่อน backward ของรอบใหม่ เว้นแต่ตั้งใจสะสม gradient",
        ],
        code: "import torch\nw = torch.tensor(2., requires_grad=True)\nloss = (3 * w - 9) ** 2\nloss.backward()\nprint(loss.item())\nprint(w.grad.item())",
        output: "9.0\n-18.0",
        exercise:
          "เปลี่ยน w เป็น 0, 2, 3 แล้วตรวจ gradient ด้วยมือ เพิ่มการทดลองกราฟใหม่ที่ใช้ w เดิมและดูผลหากไม่ล้าง w.grad",
        question: "ทำไมต้อง zero_grad ในแต่ละรอบฝึกทั่วไป?",
        choices: [
          "ลบข้อมูลฝึก",
          "ป้องกัน gradient สะสมโดยไม่ตั้งใจ",
          "รีเซ็ตน้ำหนักเป็นศูนย์",
        ],
        answer: 1,
        explanation:
          "PyTorch สะสมค่า gradient ลง .grad การล้าง gradient ไม่ได้ล้างน้ำหนักของโมเดล",
      },
      {
        title: "Training Loop ที่ครบขั้นตอน",
        subtitle: "Forward, loss, backward และ optimizer",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "วงรอบฝึกเชื่อมข้อมูลกับโมเดลและตัวปรับน้ำหนัก ตัวอย่างนี้เรียนรู้ y=2x ด้วยหนึ่งน้ำหนัก เป็นการสาธิต ไม่ใช่การประเมินความสามารถกับข้อมูลจริง",
        concepts: [
          "ลำดับคือ zero_grad → forward → loss → backward → step",
          "Loss ต้องสัมพันธ์กับโจทย์ เช่น MSE สำหรับ regression",
          "ตรวจ loss ที่เป็น NaN และ gradient ที่ผิดปกติก่อนเพิ่มความซับซ้อน",
        ],
        code: "import torch\nw = torch.nn.Parameter(torch.tensor(0.))\noptimizer = torch.optim.SGD([w], lr=0.1)\nx, y = torch.tensor(1.), torch.tensor(2.)\nfor _ in range(3):\n    optimizer.zero_grad()\n    loss = (w * x - y) ** 2\n    loss.backward()\n    optimizer.step()\nprint(round(w.item(), 3))",
        output: "0.976",
        exercise:
          "ขยายเป็น batch x=[1,2,3] ใช้ mean loss และทดลอง learning rate หลายค่า รายงานกราฟ train/validation พร้อมเกณฑ์หยุด",
        question: "optimizer.step ทำหน้าที่อะไร?",
        choices: ["คำนวณ label", "แบ่งข้อมูล", "ปรับพารามิเตอร์จาก gradient"],
        answer: 2,
        explanation:
          "backward คำนวณ gradient ส่วน optimizer.step ใช้ gradient และกฎของ optimizer ปรับพารามิเตอร์",
      },
      {
        title: "Train Mode กับ Evaluation",
        subtitle: "Dropout, validation และ reproducibility",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "บางชั้นทำงานต่างกันตอนฝึกและทดสอบ การตั้ง eval ไม่ได้ปิด autograd และ no_grad ก็ไม่ได้เปลี่ยนพฤติกรรม dropout จึงต้องใช้ให้ถูกหน้าที่",
        concepts: [
          "model.train() เปิดพฤติกรรมฝึกของ dropout และ batch normalization",
          "model.eval() ตั้งพฤติกรรมประเมิน แต่ยังสร้างกราฟได้",
          "torch.no_grad() ลดการเก็บกราฟเมื่อไม่ต้องใช้ backward; seed อย่างเดียวไม่รับประกัน deterministic ทุกอุปกรณ์",
        ],
        code: "import torch\nlayer = torch.nn.Dropout(p=0.5)\nlayer.eval()\nwith torch.no_grad():\n    result = layer(torch.ones(4))\nprint(result.tolist())",
        output: "[1.0, 1.0, 1.0, 1.0]",
        exercise:
          "สร้าง MLP ที่มี dropout บันทึก validation loss ด้วย eval และ no_grad ทดลองลืม eval แล้วอธิบายความแปรปรวนที่เห็น",
        question: "eval() ปิด gradient อัตโนมัติหรือไม่?",
        choices: [
          "ไม่ ต้องใช้ no_grad หรือ inference_mode เมื่อต้องการ",
          "ปิดเสมอ",
          "ปิดเฉพาะ CPU",
        ],
        answer: 0,
        explanation:
          "eval เปลี่ยนโหมดของชั้น ส่วนการติดตาม gradient เป็นอีกกลไกหนึ่ง",
      },
      {
        title: "CNN สำหรับภาพ",
        subtitle: "Channel, convolution และ spatial features",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "CNN ใช้ kernel เดียวกันเลื่อนไปตามตำแหน่งเพื่อเรียนรู้ pattern ในภาพ Tensor ภาพของ PyTorch โดยทั่วไปเรียง N,C,H,W",
        concepts: [
          "Kernel sharing ลดพารามิเตอร์เมื่อเทียบกับเชื่อมทุก pixel กับทุก neuron",
          "Padding และ stride เปลี่ยนขนาด spatial output ต้องตรวจ shape ทุกช่วง",
          "Augmentation ทำเฉพาะ train และต้องไม่เปลี่ยนความหมายของ label",
        ],
        code: "import torch\nlayer = torch.nn.Conv2d(1, 4, kernel_size=3)\nimages = torch.zeros(2, 1, 8, 8)\nfeatures = layer(images)\nprint(list(features.shape))",
        output: "[2, 4, 6, 6]",
        exercise:
          "เพิ่ม padding=1 แล้ว stride=2 ตรวจ shape ด้วยสูตร จากนั้นออกแบบ CNN เล็กสำหรับชุดภาพที่อนุญาตใช้ แยกแหล่งภาพไม่ให้ซ้ำข้าม split",
        question: "เลข 4 ใน output ของตัวอย่างหมายถึงอะไร?",
        choices: ["จำนวนภาพ", "จำนวน output channel", "ความกว้างภาพเดิม"],
        answer: 1,
        explanation:
          "ชั้น Conv2d สร้าง 4 feature maps ต่อภาพ ตาม out_channels=4",
      },
      {
        title: "Attention แบบคำนวณด้วยมือ",
        subtitle: "Query, Key, Value และ softmax",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "Attention เลือกผสมข้อมูลจากหลายตำแหน่งตามความเข้ากันของ query กับ key ตัวอย่างนี้เป็นหนึ่ง query กับสองตำแหน่ง ไม่ใช่ Transformer เต็มตัว",
        concepts: [
          "คะแนน attention คือ QKᵀ / sqrt(d_k) ก่อน softmax",
          "น้ำหนัก softmax รวมเป็น 1 ตามแกน key แล้วนำไปถ่วง value",
          "Causal mask ป้องกัน token มองอนาคตตอนฝึกโมเดลทำนาย token ถัดไป",
        ],
        code: "import torch\nq = torch.tensor([[1., 0.]])\nk = torch.tensor([[1., 0.], [0., 1.]])\nv = torch.tensor([[10.], [20.]])\na = torch.softmax(q @ k.T / (2 ** 0.5), dim=-1)\nprint(round(a.sum().item(), 2))\nprint(list((a @ v).shape))",
        output: "1.0\n[1, 1]",
        exercise:
          "พิมพ์น้ำหนักแต่ละตำแหน่ง เปลี่ยน q เป็น [0,1] แล้วอธิบายผล ถัดไปสร้าง causal mask สำหรับลำดับยาว 4 และตรวจว่าอนาคตได้ weight 0",
        question: "Causal mask ใช้ทำอะไร?",
        choices: [
          "ลบ gradient ทั้งหมด",
          "เพิ่มจำนวนพารามิเตอร์",
          "ป้องกันการมอง token อนาคต",
        ],
        answer: 2,
        explanation:
          "งานทำนาย token ถัดไปต้องไม่เห็นคำตอบล่วงหน้า mask จึงตัดตำแหน่งอนาคตก่อน softmax",
      },
      {
        title: "Checkpoint และ Transfer Learning",
        subtitle: "State dict, freezing และ recovery",
        tag: "PROJECT",
        minutes: 75,
        intro:
          "บันทึกน้ำหนักพร้อมโครงสร้างโมเดลและข้อมูลการฝึกเพื่อกู้คืนการทดลอง ถ้าจะฝึกต่อควรเก็บ optimizer state ด้วย โหลดเฉพาะ artifact ที่เชื่อถือได้",
        concepts: [
          "state_dict มีพารามิเตอร์และ buffer แต่ไม่ใช่คำอธิบายสถาปัตยกรรมทั้งหมด",
          "Freeze บางชั้นด้วย requires_grad=False เพื่อลดพารามิเตอร์ที่ฝึก",
          "เลือก checkpoint จาก validation และประเมิน test หลังเลือกเสร็จ",
        ],
        code: "import torch\nmodel = torch.nn.Linear(2, 1)\nstate = {k: v.clone() for k, v in model.state_dict().items()}\ncopy = torch.nn.Linear(2, 1)\ncopy.load_state_dict(state)\nprint(all(torch.equal(state[k], copy.state_dict()[k]) for k in state))",
        output: "True",
        exercise:
          "เขียนการ save/load ผ่านไฟล์ เก็บ seed, epoch, optimizer และ config ฝึก 10 รอบแล้วเทียบกับหยุดรอบ 5 และ resume โดยระบุเงื่อนไข randomness",
        question: "ถ้าต้องการ resume การฝึก ควรเก็บอะไรเพิ่มจากน้ำหนัก?",
        choices: [
          "optimizer state และข้อมูลรอบฝึก",
          "เฉพาะชื่อผู้สร้าง",
          "แค่รูป loss",
        ],
        answer: 0,
        explanation:
          "optimizer อาจมี momentum หรือสถิติสะสมที่มีผลต่อการอัปเดต จึงต้องเก็บเพื่อฝึกต่ออย่างสอดคล้อง",
      },
      {
        title: "โปรเจกต์: Image Classifier และ Ablation",
        subtitle: "พิสูจน์ว่าการเปลี่ยนแปลงช่วยจริง",
        tag: "PROJECT",
        minutes: 180,
        intro:
          "สร้าง classifier ภาพขนาดเล็กด้วย PyTorch ตั้ง baseline ก่อนทดลอง augmentation หรือ dropout เปลี่ยนครั้งละปัจจัยเพื่ออธิบายผลได้",
        concepts: [
          "แยก train/validation/test และตรวจภาพซ้ำหรือแหล่งข้อมูลซ้ำ",
          "เปรียบเทียบ configuration ด้วย split และงบฝึกใกล้กัน",
          "รายงานหลาย seed, per-class metric, ตัวอย่างผิด และข้อจำกัดด้านอุปกรณ์",
        ],
        code: "runs = [\n    {'setting': 'baseline', 'seed': 1},\n    {'setting': 'dropout', 'seed': 1},\n    {'setting': 'baseline', 'seed': 2},\n    {'setting': 'dropout', 'seed': 2},\n]\nprint(len(runs))",
        output: "4",
        exercise:
          "ส่ง train/evaluate scripts, checkpoint, ตาราง ablation อย่างน้อย 2 seed และ confusion matrix เกณฑ์ผ่าน: รันโหลดโมเดลทำนายได้จริง แยก test ชัด และอธิบาย failure cases อย่างน้อย 10 ภาพ",
        question: "Ablation ที่ดีควรเปลี่ยนอะไร?",
        choices: [
          "ทุกอย่างพร้อมกัน",
          "ปัจจัยที่ต้องการวัด โดยควบคุมอย่างอื่น",
          "ชุด test ทุกครั้ง",
        ],
        answer: 1,
        explanation:
          "การควบคุมปัจจัยอื่นช่วยแยกว่าการเปลี่ยนแปลงใดสัมพันธ์กับผลที่ดีขึ้น",
      },
    ],
  },
  {
    id: 4,
    title: "LLM & RAG Applications",
    subtitle: "สร้างผู้ช่วยที่ค้นข้อมูลและตรวจคำตอบได้",
    prerequisite: "คอร์ส 3 โดยเฉพาะ attention และเข้าใจการประเมินโมเดล",
    project: "ผู้ช่วยค้นเอกสารพร้อมชุดประเมิน",
    groups: [
      "Token และ embeddings",
      "Retrieval และ context",
      "Evaluation และ tool use",
      "ปรับโมเดลและโปรเจกต์",
    ],
    sources: [
      {
        title: "Hugging Face: LLM Course",
        url: "https://huggingface.co/learn/llm-course/en/chapter1/1",
      },
      {
        title: "scikit-learn: Text feature extraction",
        url: "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction",
      },
    ],
    lessons: [
      {
        title: "Token และ Context Budget",
        subtitle: "ข้อความไม่เท่ากับจำนวน token",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "Tokenizer แบ่งข้อความเป็นหน่วยที่โมเดลใช้ โดยภาษาไทยและอังกฤษอาจมีสัดส่วนอักขระต่อ token ต่างกัน ตัวอย่างนี้ใช้จำนวน token สมมติเพื่อฝึกวางงบ ไม่ใช่ตัวนับ token ของโมเดล",
        concepts: [
          "ต้องใช้ tokenizer ของโมเดลจริงเมื่อต้องการนับอย่างแม่นยำ",
          "งบ context ต้องเผื่อคำสั่ง ประวัติ เอกสาร และผลลัพธ์",
          "Context ยาวไม่ได้รับประกันว่าโมเดลจะใช้หลักฐานทุกส่วนได้ดี",
        ],
        code: "budget = 4096\nsystem = 300\nhistory = 900\noutput_reserve = 600\navailable = budget - system - history - output_reserve\nprint(available)",
        output: "2296",
        exercise:
          "เลือก tokenizer ของโมเดลที่สนใจ นับข้อความไทย 10 ตัวอย่างและอังกฤษ 10 ตัวอย่าง แล้วเปรียบเทียบกับจำนวนอักขระ ห้ามใช้ len(text) อ้างเป็นจำนวน token",
        question: "len(text) คือจำนวน token ของ LLM เสมอหรือไม่?",
        choices: ["ไม่ ขึ้นกับ tokenizer", "ใช่ทุกภาษา", "ใช่เฉพาะข้อความยาว"],
        answer: 0,
        explanation:
          "len(text) ของ Python นับ Unicode code points ซึ่งไม่เท่ากับการแบ่ง token ของแต่ละโมเดล",
      },
      {
        title: "Embeddings และ Similarity",
        subtitle: "Cosine similarity และ vector search",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "Embedding แทนข้อมูลเป็นเวกเตอร์ที่เรียนรู้มาแล้ว Cosine วัดทิศทางที่คล้ายกัน ไม่ได้พิสูจน์ว่าข้อความมีความหมายเหมือนกันทั้งหมด ตัวอย่างใช้เวกเตอร์สมมติ",
        concepts: [
          "เวกเตอร์ต้องมาจาก embedding model และมิติที่เข้ากัน",
          "Cosine หารด้วย norm จึงต้องจัดการเวกเตอร์ศูนย์",
          "ประเมิน retrieval ด้วย query จริง ไม่เลือก embedding จาก leaderboard อย่างเดียว",
        ],
        code: "from math import sqrt\ndef cosine(a, b):\n    assert len(a) == len(b)\n    norm = sqrt(sum(x*x for x in a) * sum(y*y for y in b))\n    return sum(x*y for x, y in zip(a, b)) / norm if norm else 0.0\nprint(round(cosine([1, 0], [1, 1]), 3))",
        output: "0.707",
        exercise:
          "เพิ่มการทดสอบเวกเตอร์ศูนย์และมิติไม่ตรงกัน จากนั้นใช้ embedding model กับเอกสารไทย 20 ชิ้นและ query 10 ข้อ ตรวจ top-3 ด้วยมนุษย์",
        question: "ควรผสมเวกเตอร์จากคนละ embedding model ตรง ๆ ไหม?",
        choices: [
          "ควรเพราะเพิ่มความหลากหลาย",
          "ไม่ควร เพราะพื้นที่เวกเตอร์อาจไม่เข้ากัน",
          "ได้เมื่อชื่อไฟล์เหมือนกัน",
        ],
        answer: 1,
        explanation:
          "แม้มีจำนวนมิติเท่ากัน ความหมายของแกนและพื้นที่เวกเตอร์อาจต่างกัน ต้องใช้ representation ที่สอดคล้องกัน",
      },
      {
        title: "Chunking และ Retrieval Baseline",
        subtitle: "เริ่มจาก lexical search ก่อนเพิ่มความซับซ้อน",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "สร้าง baseline ด้วย TF-IDF แล้ววัดก่อนเปลี่ยนเป็น vector database ตัวอย่างใช้ข้อความอังกฤษเพื่อให้เห็นการแยกคำง่าย สำหรับภาษาไทยลอง char n-gram หรือ tokenizer ที่เหมาะสม",
        concepts: [
          "เก็บ source ID และตำแหน่งของทุก chunk เพื่ออ้างอิงกลับได้",
          "Chunk เล็กเกินไปขาดบริบท ใหญ่เกินไปดึงข้อมูลไม่เกี่ยวข้องมามาก",
          "เอกสารที่ไม่มีสิทธิ์เข้าถึงต้องถูกกรองก่อนส่งให้โมเดล ไม่ใช่เพียงซ่อนใน UI",
        ],
        code: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\ndocs = ['python data arrays', 'garden water plants', 'python machine learning']\nv = TfidfVectorizer()\nmatrix = v.fit_transform(docs)\nscores = cosine_similarity(v.transform(['machine learning']), matrix)[0]\nprint(int(scores.argmax()))",
        output: "2",
        exercise:
          "สร้างเอกสาร 30 ชิ้นพร้อม ID และชุด query ที่มีคำตอบอ้างอิง 15 ข้อ เปรียบเทียบ chunk 2 ขนาดและรายงาน Recall@3 โดยไม่เปลี่ยนชุดประเมินระหว่างทดลอง",
        question: "ข้อมูลใดควรอยู่กับ chunk?",
        choices: [
          "เฉพาะข้อความอย่างเดียว",
          "เฉพาะเวลาเรียกโมเดล",
          "source ID และข้อมูลอ้างอิงกลับ",
        ],
        answer: 2,
        explanation:
          "Source ID ทำให้ตรวจหลักฐาน แสดง citation และติดตามข้อผิดพลาดในการดึงข้อมูลได้",
      },
      {
        title: "ประกอบ Context และตอบเมื่อมีหลักฐาน",
        subtitle: "Grounding, abstention และ prompt injection",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "RAG ส่งหลักฐานที่ค้นได้ให้โมเดลตอบ แต่ไม่ได้รับประกันความถูกต้อง ข้อความในเอกสารอาจมีคำสั่งแฝง ต้องถือเป็นข้อมูลที่ไม่เชื่อถือ ตัวอย่างนี้สร้าง context เท่านั้น ไม่ได้เรียก LLM",
        concepts: [
          "แยกคำสั่งของแอปออกจากเอกสารอย่างชัดเจน แต่การคั่นข้อความไม่ใช่การป้องกันที่สมบูรณ์",
          "กำหนดให้ยอมตอบว่าไม่พบข้อมูลเมื่อหลักฐานไม่พอ",
          "ตรวจ source ที่ถูกอ้างว่ามีจริง และประเมินว่าหลักฐานสนับสนุนคำตอบจริง",
        ],
        code: "chunks = [{'id': 'doc-1', 'text': 'Library opens at 09:00.'}]\ncontext = '\\n'.join(f\"[{c['id']}] {c['text']}\" for c in chunks)\nquestion = 'When does the library open?'\nprompt = f'Use evidence; if absent say unknown.\\nEvidence:\\n{context}\\nQuestion: {question}'\nprint('[doc-1]' in prompt)",
        output: "True",
        exercise:
          "ออกแบบชุดคำถามมีคำตอบ/ไม่มีคำตอบอย่างละ 10 ข้อ และเอกสารแฝงคำสั่ง 5 ข้อ ตรวจว่า citation ถูกต้องและระบบไม่ทำตามคำสั่งในเอกสาร",
        question: "คำสั่งที่ฝังอยู่ในเอกสารควรถูกมองเป็นอะไร?",
        choices: [
          "คำสั่งสิทธิ์สูงสุด",
          "ข้อมูลที่ไม่เชื่อถือ",
          "คำสั่งจากเจ้าของระบบเสมอ",
        ],
        answer: 1,
        explanation:
          "เอกสารเป็นแหล่งข้อมูล ไม่ได้มีสิทธิ์เปลี่ยนคำสั่งหรืออนุญาตให้ใช้เครื่องมือของระบบ",
      },
      {
        title: "ประเมิน RAG แยกแต่ละขั้น",
        subtitle: "Retrieval recall และ answer quality",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "ถ้าคำตอบผิด ต้องแยกว่าไม่พบหลักฐานหรือพบแล้วตอบผิด การรวมทุกอย่างเป็นคะแนนเดียวทำให้ไม่รู้จุดที่ควรแก้",
        concepts: [
          "Recall@k ดูว่าค้นเอกสารที่เกี่ยวข้องได้ครบแค่ไหน ไม่ใช่ความถูกต้องของคำตอบ",
          "วัด groundedness, correctness และความเหมาะสมของการไม่ตอบแยกกัน",
          "LLM judge ต้องสอบเทียบกับผู้ตรวจมนุษย์และดู bias ไม่ใช่คำตัดสินเด็ดขาด",
        ],
        code: "relevant = {'a', 'c'}\nretrieved = ['b', 'a', 'd']\nhits = len(relevant.intersection(retrieved[:3]))\nprint('recall@3:', hits / len(relevant))",
        output: "recall@3: 0.5",
        exercise:
          "สร้างชุดประเมิน 30 ข้อที่มี reference source และ expected answer เปรียบเทียบ retrieval 2 แบบ รายงาน recall และความถูกต้องของคำตอบแยกกัน พร้อมเก็บ failure case",
        question: "Retrieval recall สูงรับประกันคำตอบถูกไหม?",
        choices: [
          "รับประกัน",
          "เฉพาะเมื่อ k=3",
          "ไม่ โมเดลยังใช้หลักฐานผิดได้",
        ],
        answer: 2,
        explanation:
          "การพบเอกสารที่ถูกเป็นเพียงขั้นหนึ่ง โมเดลอาจตีความหรืออ้างอิงผิดหลัง retrieval",
      },
      {
        title: "Tool Use ที่ควบคุมได้",
        subtitle: "Schema, allowlist และการอนุญาต",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "โมเดลเสนอชื่อเครื่องมือและ argument ได้ แต่แอปต้องเป็นผู้ตรวจและตัดสินใจรัน ตัวอย่างนี้ใช้เครื่องคิดเลขแบบจำกัด ไม่ใช้ eval กับข้อความจากโมเดล",
        concepts: [
          "ตรวจชื่อเครื่องมือ ชนิดข้อมูล ขอบเขตค่า และสิทธิ์ทุกครั้ง",
          "เครื่องมือที่ส่งข้อความ เปลี่ยนข้อมูล หรือมีค่าใช้จ่ายควรมีการอนุญาตตามระดับความเสี่ยง",
          "กำหนดเพดานจำนวนรอบ เวลา และงบ เพื่อหยุด loop ที่ไม่จบ",
        ],
        code: "def add(a, b):\n    if type(a) not in (int, float) or type(b) not in (int, float):\n        raise ValueError('numbers required')\n    return a + b\ntools = {'add': add}\nrequest = {'name': 'add', 'args': {'a': 2, 'b': 3}}\nif request['name'] not in tools:\n    raise ValueError('unknown tool')\nprint(tools[request['name']](**request['args']))",
        output: "5",
        exercise:
          "เพิ่มการปฏิเสธ argument ส่วนเกิน ค่าเกินขอบเขต และชื่อเครื่องมือที่ไม่มี ทดสอบอย่างน้อย 8 กรณี และออกแบบจุดยืนยันสำหรับเครื่องมือที่ส่งอีเมลโดยยังไม่ส่งจริง",
        question: "ใครควรตรวจสิทธิ์ก่อนรันเครื่องมือ?",
        choices: [
          "แอปฝั่งเซิร์ฟเวอร์",
          "เชื่อคำสั่งโมเดลเสมอ",
          "ข้อความในเอกสาร",
        ],
        answer: 0,
        explanation:
          "แอปเป็นผู้บังคับใช้สิทธิ์และขอบเขต โมเดลเป็นเพียงผู้เสนอการเรียกเครื่องมือ",
      },
      {
        title: "เลือก Prompt, RAG หรือ Fine-tuning",
        subtitle: "เลือกวิธีให้ตรงกับสาเหตุของปัญหา",
        tag: "PROJECT",
        minutes: 75,
        intro:
          "ก่อน fine-tune ให้ระบุว่าปัญหาคือความรู้ไม่ครบ รูปแบบคำตอบ หรือพฤติกรรมเฉพาะงาน การปรับน้ำหนักมีต้นทุนและต้องมีชุดประเมินแยกต่างหาก",
        concepts: [
          "RAG เหมาะเมื่อจำเป็นต้องดึงข้อมูลอัปเดตหรืออ้างอิงเอกสาร",
          "Fine-tuning อาจช่วยรูปแบบหรือพฤติกรรม แต่ไม่รับประกันความรู้ถูกต้องและการลืมข้อมูล",
          "LoRA ลดพารามิเตอร์ที่ฝึกโดยใช้ low-rank update ไม่ใช่การลดขนาดฐานความรู้",
        ],
        code: "d_in, d_out, rank = 512, 512, 8\nfull = d_in * d_out\nlora = rank * (d_in + d_out)\nprint(full)\nprint(lora)",
        output: "262144\n8192",
        exercise:
          "ทำตารางปัญหา 6 แบบ เลือก prompt/RAG/fine-tuning พร้อมเหตุผลและ metric จากนั้นออกแบบชุด train/validation/test สำหรับหนึ่งงานโดยกันข้อมูลซ้ำ",
        question: "ถ้าข้อมูลราคาเปลี่ยนทุกวัน ควรเริ่มพิจารณาอะไร?",
        choices: [
          "ฝึกใหม่ทุกคำถาม",
          "ดึงข้อมูลปัจจุบันผ่าน retrieval หรือเครื่องมือ",
          "เพิ่ม temperature",
        ],
        answer: 1,
        explanation:
          "ข้อมูลที่เปลี่ยนบ่อยควรมาจากแหล่งปัจจุบันที่ตรวจสอบได้ มากกว่าฝังไว้ในน้ำหนักโมเดลเพียงอย่างเดียว",
      },
      {
        title: "โปรเจกต์: ผู้ช่วยเอกสารที่ตรวจสอบได้",
        subtitle: "Retrieval → answer → citations → evaluation",
        tag: "PROJECT",
        minutes: 180,
        intro:
          "สร้างผู้ช่วยตอบคำถามจากเอกสารที่คุณมีสิทธิ์ใช้ เริ่มจาก search-only baseline แล้วเชื่อมโมเดลที่เลือกผ่าน server adapter โดยเก็บคีย์นอก frontend",
        concepts: [
          "ส่งเอกสารและชุดคำถามที่ไม่เปิดเผยข้อมูลส่วนตัว",
          "รายงานการตอบไม่ได้ การอ้างอิงผิด latency และต้นทุนต่อคำถาม",
          "ทดสอบคำสั่งแฝงในเอกสารและการข้ามสิทธิ์ก่อนให้คนอื่นใช้",
        ],
        code: "report = {'queries': 30, 'correct': 24, 'unsupported': 3}\nprint('correct rate:', report['correct'] / report['queries'])\nprint('unsupported rate:', report['unsupported'] / report['queries'])\n# ตัวเลขสมมติเพื่อฝึกอ่านรายงาน ไม่ใช่ผลระบบจริง",
        output: "correct rate: 0.8\nunsupported rate: 0.1",
        exercise:
          "ส่งระบบค้น+ตอบที่อ้าง source ID ได้ ชุดประเมินอย่างน้อย 30 ข้อ baseline และรายงานคำตอบที่ไม่มีหลักฐาน เกณฑ์ผ่าน: ทำซ้ำได้ ไม่มีคีย์ใน client และมีวิธีหยุด tool use ที่เกินขอบเขต",
        question: "ควรส่งหลักฐานอะไรคู่กับ demo?",
        choices: [
          "วิดีโอคำตอบที่ถูกเพียงข้อเดียว",
          "ชื่อโมเดลอย่างเดียว",
          "ชุดประเมิน ผลผิดพลาด และต้นทุน",
        ],
        answer: 2,
        explanation:
          "Demo ที่คัดเฉพาะผลดีไม่แสดงคุณภาพจริง ต้องมีชุดประเมินและข้อจำกัดที่ตรวจสอบได้",
      },
    ],
  },
  {
    id: 5,
    title: "AI Engineering & Research Practice",
    subtitle: "นำโมเดลไปใช้งานและเรียนรู้จากหลักฐาน",
    prerequisite: "คอร์ส 2–4 และมีโปรเจกต์ ML หรือ RAG ที่รันได้",
    project: "ระบบ AI พร้อมแผนปล่อยใช้งานและรายงานวิจัยย่อย",
    groups: [
      "Contract และ serving",
      "Monitoring และ versioning",
      "Safety และงานวิจัย",
      "ทดลองและส่งมอบ",
    ],
    sources: [
      {
        title: "PyTorch: Learn the Basics",
        url: "https://docs.pytorch.org/tutorials/beginner/basics/index.html",
      },
      {
        title: "scikit-learn: Common pitfalls",
        url: "https://scikit-learn.org/stable/common_pitfalls.html",
      },
    ],
    lessons: [
      {
        title: "ออกแบบสัญญาข้อมูลของระบบ",
        subtitle: "Input validation และ versioned response",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "ก่อนนำโมเดลไปเป็นบริการ ต้องกำหนดว่าแอปรับอะไร คืนอะไร และผิดพลาดอย่างไร ตัวอย่างนี้ตรวจ payload ใน Python ไม่ได้เปิด HTTP server",
        concepts: [
          "ตรวจข้อมูลที่ฝั่งเซิร์ฟเวอร์แม้หน้าเว็บตรวจมาแล้ว",
          "ปฏิเสธค่าที่ไม่ใช่ตัวเลข finite และข้อมูลเกินขนาดที่กำหนด",
          "ส่ง model version ไปกับผลเพื่อไล่ตรวจข้อผิดพลาดย้อนหลัง",
        ],
        code: "import math\ndef predict(payload):\n    x = payload.get('hours')\n    if type(x) not in (int, float) or not math.isfinite(x) or not 0 <= x <= 24:\n        raise ValueError('hours must be between 0 and 24')\n    return {'prediction': x * 2, 'model_version': 'demo-v1'}\nprint(predict({'hours': 3}))",
        output: "{'prediction': 6, 'model_version': 'demo-v1'}",
        exercise:
          "เขียน schema สำหรับโปรเจกต์เดิม กำหนด error format แล้วทดสอบ missing field, null, bool, NaN, string และค่าติดขอบเขต",
        question: "ทำไม response ควรมี model version?",
        choices: [
          "เพื่อเพิ่มขนาด payload",
          "เพื่อไล่ตรวจว่าผลมาจากรุ่นใด",
          "ใช้แทน input validation",
        ],
        answer: 1,
        explanation:
          "เมื่อผลเปลี่ยนต้องรู้ว่าใช้ artifact และ config รุ่นใดเพื่อวิเคราะห์และทำซ้ำได้",
      },
      {
        title: "Latency, Throughput และ Batching",
        subtitle: "วัด p95 และออกแบบตาม SLO",
        tag: "FOUNDATIONS",
        minutes: 75,
        intro:
          "ค่าเฉลี่ย latency อาจซ่อนคำขอที่ช้ามาก กำหนดเป้าหมายก่อนว่า p95 ต้องต่ำเท่าไร ภายใต้จำนวนคำขอพร้อมกันและฮาร์ดแวร์ใด",
        concepts: [
          "Latency คือเวลาต่อคำขอ ส่วน throughput คือจำนวนงานต่อหน่วยเวลา",
          "Batching อาจเพิ่ม throughput แต่เพิ่มเวลารอเข้าชุด",
          "วัด warm-up, network และ preprocessing ให้ตรงกับประสบการณ์ผู้ใช้",
        ],
        code: "from math import ceil\nlatencies = [10, 12, 13, 14, 15, 16, 20, 22, 30, 100]\np95 = sorted(latencies)[ceil(0.95 * len(latencies)) - 1]\nprint('p95 nearest-rank:', p95)",
        output: "p95 nearest-rank: 100",
        exercise:
          "ทำ load test ในเครื่องของโปรเจกต์เดิมที่ concurrency 1, 4 และ 8 บันทึก p50/p95, error rate และ throughput พร้อมอธิบายข้อจำกัดของเครื่องทดสอบ",
        question: "ค่าเฉลี่ยต่ำแต่ p95 สูงบอกอะไร?",
        choices: [
          "ทุกคำขอเร็ว",
          "ระบบไม่มีปัญหา",
          "บางคำขอช้ากว่าคนส่วนใหญ่มาก",
        ],
        answer: 2,
        explanation:
          "ค่าปลายการกระจายช่วยเห็นความล่าช้าที่ค่าเฉลี่ยซ่อนอยู่ ต้องดูจำนวนตัวอย่างและ percentile method ด้วย",
      },
      {
        title: "Monitoring และ Data Drift",
        subtitle: "สิ่งที่วัดได้กับสิ่งที่ยังไม่รู้",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "ข้อมูล production อาจต่างจาก train แต่ drift ไม่ได้แปลว่าคุณภาพลดลงเสมอ ต้องติดตามผลลัพธ์จริงเมื่อ label มาถึงและแยกปัญหาระบบออกจากปัญหาโมเดล",
        concepts: [
          "ติดตาม missing rate, input range, latency และ error rate",
          "ตรวจ performance drift เมื่อมี ground truth โดยระวัง label delay",
          "กำหนดผู้รับผิดชอบและขั้นตอนตอบสนอง ไม่แจ้งเตือนโดยไม่มี action",
        ],
        code: "baseline_missing = 0.02\ncurrent = [1, None, 3, None, 5]\nmissing_rate = sum(x is None for x in current) / len(current)\nprint(round(missing_rate, 2))\nprint(missing_rate > baseline_missing + 0.1)",
        output: "0.4\nTrue",
        exercise:
          "เลือก metric ระบบ 3 ตัวและ metric ข้อมูล 3 ตัว กำหนด threshold, หน้าต่างเวลา และ action เมื่อเตือน จำลอง incident หนึ่งกรณีโดยไม่ใช้ข้อมูลจริงที่อ่อนไหว",
        question: "พบ data drift แล้วสรุปว่า accuracy ลดลงได้ทันทีไหม?",
        choices: [
          "ไม่ได้ ต้องประเมินผลและตรวจบริบท",
          "ได้เสมอ",
          "ได้ถ้าโมเดลใหญ่",
        ],
        answer: 0,
        explanation:
          "การกระจายข้อมูลเปลี่ยนเป็นสัญญาณตรวจสอบ ไม่ใช่หลักฐานโดยตรงว่าการทำนายผิดมากขึ้น",
      },
      {
        title: "Versioning และ Experiment Tracking",
        subtitle: "Config, artifact และ lineage",
        tag: "PRACTICE",
        minutes: 75,
        intro:
          "ผลทดลองมีความหมายเมื่อเชื่อมกลับไปยังโค้ด ข้อมูล และพารามิเตอร์ที่ใช้ได้ เก็บ artifact เป็นรุ่น ไม่เขียนทับไฟล์ล่าสุดอย่างเดียว",
        concepts: [
          "บันทึก data version, code revision, seed และ dependencies",
          "Hash ช่วยตรวจว่าไฟล์เปลี่ยน แต่ไม่ได้พิสูจน์ว่าข้อมูลถูกต้องหรือมีสิทธิ์ใช้",
          "ห้ามเก็บ API key หรือข้อมูลส่วนตัวใน log การทดลอง",
        ],
        code: "import hashlib, json\nconfig = {'seed': 42, 'learning_rate': 0.01}\nencoded = json.dumps(config, sort_keys=True).encode()\nrun_id = hashlib.sha256(encoded).hexdigest()\nprint(len(run_id))\nprint(run_id == hashlib.sha256(encoded).hexdigest())",
        output: "64\nTrue",
        exercise:
          "เพิ่ม experiment manifest ให้โปรเจกต์เดิม ระบุ dataset checksum, dependency versions, artifact path และ metric โดยทดสอบว่ารันจาก manifest ได้",
        question: "มี seed อย่างเดียวเพียงพอทำซ้ำไหม?",
        choices: [
          "พอทุกกรณี",
          "ไม่ ต้องเก็บข้อมูล โค้ด และ environment ด้วย",
          "พอถ้าใช้ GPU",
        ],
        answer: 1,
        explanation:
          "Seed คุมบางส่วนของ randomness แต่ผลยังขึ้นกับข้อมูล โค้ด library และฮาร์ดแวร์",
      },
      {
        title: "Threat Model สำหรับ AI",
        subtitle: "ความลับ สิทธิ์ และข้อมูลไม่เชื่อถือ",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "ระบุทรัพย์สิน ผู้โจมตี และทางที่ข้อมูลไม่เชื่อถือเข้าสู่ระบบ AI ต้องใช้การควบคุมสิทธิ์จากแอป ไม่ฝากไว้กับ prompt เพียงอย่างเดียว",
        concepts: [
          "ตรวจสิทธิ์เอกสารก่อน retrieval และก่อนส่ง context ให้โมเดล",
          "ลดข้อมูลส่วนตัวใน log และกำหนดอายุการเก็บข้อมูลตามบริบทจริง",
          "ทดสอบ prompt injection, resource exhaustion และการโหลด artifact ที่ไม่น่าเชื่อถือ",
        ],
        code: "docs = [\n    {'id': 'public', 'roles': ['reader', 'admin']},\n    {'id': 'private', 'roles': ['admin']},\n]\nrole = 'reader'\nallowed = [d['id'] for d in docs if role in d['roles']]\nprint(allowed)",
        output: "['public']",
        exercise:
          "วาด data flow ของ RAG ระบุ trust boundary และเขียน test ว่าบัญชี reader ไม่ได้ context ของ admin แม้ query ตรงคำทั้งหมด แยกทดสอบ input ที่ยาวเกินขอบเขต",
        question: "กรองเอกสารลับหลังโมเดลตอบแล้วเพียงพอไหม?",
        choices: [
          "พอถ้าไม่แสดง source",
          "พอถ้า prompt สั่งไว้",
          "ไม่ ควรกรองก่อนส่งเข้าโมเดล",
        ],
        answer: 2,
        explanation:
          "เมื่อเอกสารลับเข้า context แล้ว โมเดลอาจนำเนื้อหามาตอบได้ การซ่อน source ภายหลังไม่แก้การรั่ว",
      },
      {
        title: "อ่าน Paper อย่างนักทดลอง",
        subtitle: "Claim, evidence และ reproduction",
        tag: "EXPERIMENT",
        minutes: 75,
        intro:
          "เริ่มจากคำถามว่าผู้เขียนอ้างอะไร ใช้ข้อมูลใด และเทียบกับ baseline ที่ยุติธรรมหรือไม่ อ่านวิธีทดลองและข้อจำกัดก่อนเชื่อคะแนนสรุป",
        concepts: [
          "แยก claim เชิงประจักษ์ออกจากการอธิบายเชิงสมมติฐาน",
          "ตรวจ split, budget, hyperparameter search และการเลือก checkpoint",
          "ผลลบหรือทำซ้ำไม่ได้มีคุณค่าเมื่อบันทึกเงื่อนไขและข้อแตกต่างชัดเจน",
        ],
        code: "review = {\n    'claim': 'method A improves metric M',\n    'baseline_matched': False,\n    'seeds_reported': 1,\n    'data_available': True,\n}\nprint(review['baseline_matched'] and review['seeds_reported'] >= 3)",
        output: "False",
        exercise:
          "เลือก paper ที่มีโค้ดสาธารณะและงบเหมาะกับเครื่อง เขียนสรุป claim/evidence/limitations อย่างละ 3 ข้อ แล้วทำซ้ำหนึ่งตารางโดยระบุส่วนที่ทำไม่ได้",
        question: "ผลดีกว่า baseline แต่ใช้งบฝึกมากกว่าสิบเท่าควรสรุปอย่างไร?",
        choices: [
          "ต้องพิจารณางบและเงื่อนไขก่อนอ้างวิธีดีกว่า",
          "วิธีใหม่ดีกว่าเสมอ",
          "คะแนนไม่มีประโยชน์ใด ๆ",
        ],
        answer: 0,
        explanation:
          "ผลอาจมาจากทรัพยากรหรือการค้นหาพารามิเตอร์ที่มากกว่า ต้องเปรียบเทียบให้ตรงกับ claim",
      },
      {
        title: "ออกแบบการทดลองและ Rollout",
        subtitle: "Hypothesis, guardrails และ rollback",
        tag: "PROJECT",
        minutes: 75,
        intro:
          "การปล่อยโมเดลใหม่เป็นการเปลี่ยนพฤติกรรมผลิตภัณฑ์ ต้องมีสมมติฐาน metric หลัก และ metric กันผลเสีย การทดสอบในคอร์สให้ใช้ staging หรือ traffic จำลอง",
        concepts: [
          "Offline evaluation เป็นด่านหนึ่งก่อนทดลอง online ไม่ได้แทนผลธุรกิจทั้งหมด",
          "กำหนดขนาดตัวอย่างและระยะเวลาล่วงหน้า ระวังการแอบดูผลแล้วหยุดเมื่อชนะ",
          "Canary หรือ shadow ช่วยจำกัดผลกระทบ แต่ต้องมี rollback ที่ทดสอบได้",
        ],
        code: "metrics = {'error_rate': 0.01, 'p95_ms': 800}\nlimits = {'error_rate': 0.02, 'p95_ms': 1000}\nready = all(metrics[key] <= limits[key] for key in limits)\nprint('canary eligible:', ready)\n# เป็น gate จำลอง ไม่ใช่หลักฐานว่าพร้อม production ทุกด้าน",
        output: "canary eligible: True",
        exercise:
          "เขียน rollout plan ของโปรเจกต์: metric หลัก, guardrails, stopping rule, owner และ rollback ทดลองสลับกลับ artifact รุ่นเก่าในเครื่องแล้วเก็บหลักฐาน",
        question: "ควรกำหนดเกณฑ์หยุดการทดลองเมื่อไร?",
        choices: [
          "เมื่อเห็นผลที่ชอบ",
          "ก่อนเริ่มทดลอง",
          "เมื่อผู้ใช้ร้องเรียนเท่านั้น",
        ],
        answer: 1,
        explanation:
          "เกณฑ์ล่วงหน้าลดการเลือกสรุปตามผลที่บังเอิญดูดี และช่วยจัดการผลเสียได้ทันเวลา",
      },
      {
        title: "Capstone: ระบบ AI และหลักฐานความเชี่ยวชาญ",
        subtitle: "Build, evaluate, operate และ defend",
        tag: "PROJECT",
        minutes: 180,
        intro:
          "นำโปรเจกต์ที่ดีที่สุดจากคอร์สก่อนมาทำให้ผู้อื่นทดลองและตรวจสอบได้ แล้วเขียนรายงานเปรียบเทียบหนึ่งวิธีจาก paper กับ baseline ของคุณ การผ่าน quiz ไม่ใช่การรับรองความเชี่ยวชาญ",
        concepts: [
          "ส่ง artifact, reproducible training/evaluation และสัญญาข้อมูล",
          "ส่ง monitoring plan, threat model และ rollback rehearsal",
          "อธิบายเหตุผลการออกแบบ ข้อจำกัด และผลที่ขัดกับสมมติฐานอย่างตรงไปตรงมา",
        ],
        code: "deliverables = {\n    'reproducible': True, 'evaluation': True,\n    'monitoring': True, 'rollback_tested': False,\n}\npending = [name for name, done in deliverables.items() if not done]\nprint(pending)",
        output: "['rollback_tested']",
        exercise:
          "ส่ง demo ในเครื่อง README การรัน manifest ผลประเมินหลาย seed ต้นทุนและ latency threat model และผล rollback พร้อมรายงานทดลองจาก paper เกณฑ์ผ่าน: คนอื่นรันได้ ตรวจคะแนนได้ และคุณอธิบายข้อแลกเปลี่ยนทุกส่วนได้",
        question: "อะไรแสดงความเชี่ยวชาญได้ดีกว่าจำนวนคอร์สที่เรียน?",
        choices: [
          "จำนวนคำศัพท์ที่จำได้",
          "จำนวนพารามิเตอร์ที่ใช้",
          "ผลงานที่ตรวจสอบได้และการอธิบายข้อจำกัด",
        ],
        answer: 2,
        explanation:
          "ความเชี่ยวชาญสะท้อนการตัดสินใจและหลักฐานจากงานจริง รวมถึงรู้ว่าเมื่อไรระบบยังไม่เหมาะใช้งาน",
      },
    ],
  },
];
