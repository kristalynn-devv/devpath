"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { diagnosticBank } from "./assessment-bank";
import {
  analyze,
  readEvidence,
  recordAnswer,
  type Evidence,
  type QuestionKey,
} from "./assessment";
import type { Course } from "./advanced-courses";
export function useAssessment(course: Course) {
  const bank = diagnosticBank[course.id];
  const quick: QuestionKey[] = course.lessons.map((l, i) => ({
    id: `quick-${i}`,
    choices: l.choices,
    answer: l.answer,
  }));
  const [evidence, setEvidence] = useState<Evidence>({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const key =
    course.id <= 5
      ? `pypath-evidence-v1-course-${course.id}`
      : `devpath-evidence-v1-${course.track}-course-${course.id}`;
  useEffect(() => {
    try {
      setEvidence(readEvidence(localStorage.getItem(key), [...bank, ...quick]));
    } catch {
      setError(true);
    }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(key, JSON.stringify(evidence));
      } catch {
        setError(true);
      }
    }
  }, [key, loaded, evidence]);
  const record = (id: string, choice: number) => {
    const question = [...bank, ...quick].find((q) => q.id === id);
    if (
      !loaded ||
      !question ||
      !Number.isInteger(choice) ||
      choice < 0 ||
      choice >= question.choices.length
    )
      return;
    setEvidence((previous) => recordAnswer(previous, id, choice));
  };
  return { evidence, loaded, error, record };
}
type Assessment = ReturnType<typeof useAssessment>;
export function AdaptiveCoach({
  course,
  assessment,
  open,
}: {
  course: Course;
  assessment: Assessment;
  open: (id: number) => void;
}) {
  const { evidence, loaded, error, record } = assessment;
  const bank = diagnosticBank[course.id];
  const result = analyze(bank, evidence);
  const [expanded, setExpanded] = useState(false);
  const [override, setOverride] = useState<number | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState(false);
  const [practice, setPractice] = useState(false);
  const level = override ?? result.targetLevel;
  const questions = bank.filter((q) => q.level === level);
  const question = bank.find((q) => q.id === current);
  const quick = course.lessons
    .map((l, i) => ({ lesson: l, fact: evidence[`quick-${i}`] }))
    .filter((row) => row.fact);
  const start = (target: number) => {
    setExpanded(true);
    setOverride(target);
    setFeedback(false);
    setChoice(null);
    setPractice(false);
    setCurrent(
      bank.find((q) => q.level === target && !evidence[q.id])?.id ?? null,
    );
  };
  const next = () => {
    setChoice(null);
    setFeedback(false);
    setCurrent(questions.find((q) => !evidence[q.id])?.id ?? null);
  };
  const review = (id: string) => {
    setOverride(bank.find((q) => q.id === id)?.level ?? 1);
    setPractice(true);
    setExpanded(true);
    setCurrent(id);
    setFeedback(false);
    setChoice(null);
  };
  const total = result.levels.reduce((sum, l) => sum + l.answered, 0);
  return (
    <section className="adaptive-coach" aria-label="ประเมินและปรับระดับ">
      <div className="adaptive-header">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> ADAPTIVE LEARNING
          </span>
          <h2>รู้แล้ว ข้ามไปท้าทายตัวเอง</h2>
          <p>ใช้คำตอบครั้งแรกเป็นหลักฐาน เลือกบทให้ตรงกับสิ่งที่ทำได้</p>
        </div>
        <span className="evidence-count">หลักฐาน {total}/12 ข้อ</span>
      </div>
      <div className="level-track">
        {result.levels.map((l) => (
          <div key={l.level} className={l.passed ? "passed" : ""}>
            <span>
              ระดับ {l.level} ·{" "}
              {["พื้นฐาน", "ประยุกต์", "วิเคราะห์"][l.level - 1]}
            </span>
            <strong>
              {l.correct}/{l.answered} ถูกครั้งแรก
            </strong>
            <small>
              {l.passed
                ? "ถึงเกณฑ์ระดับนี้"
                : l.answered < 4
                  ? `ยังต้องประเมิน ${4 - l.answered} ข้อ`
                  : "ควรทบทวนก่อน"}{" "}
              {l.passed && <Check size={13} />}
            </small>
          </div>
        ))}
      </div>
      <p className="assessment-rule">
        เกณฑ์: ตอบครบ 4 ข้อและถูกครั้งแรกอย่างน้อย 3 ข้อต่อระดับ
        ต้องผ่านตามลำดับเพื่อแนะนำข้ามขั้น ไม่ใช้ความเร็วตัดสิน
        และการข้ามไม่ทำเครื่องหมายว่าเรียนจบ
      </p>
      {error && (
        <p role="status" className="assessment-warning">
          อ่านหรือบันทึกผลประเมินไม่ได้ ผลในหน้านี้อาจไม่คงอยู่หลังรีเฟรช
        </p>
      )}
      <div className="adaptive-actions">
        <button
          className="primary-button"
          disabled={!loaded}
          onClick={() => start(result.targetLevel)}
        >
          {total ? "ดูผลและประเมินต่อ" : "เริ่มประเมินระดับ"}
          <ArrowRight size={15} />
        </button>
        {total > 0 && (
          <button
            className="secondary-button"
            onClick={() => open(result.recommendation)}
          >
            ไปบทที่แนะนำ: {result.recommendation + 1}
          </button>
        )}
      </div>
      {total > 0 && (
        <div className="recommendation">
          <strong>เหตุผลของเส้นทางที่แนะนำ</strong>
          <p>
            {result.weak.length
              ? `คำตอบครั้งแรกยังพลาดเรื่อง ${result.weak.map((q) => q.skill).join(", ")} จึงแนะนำทบทวนบท ${result.recommendation + 1}`
              : result.passed === 3
                ? "ผ่านเกณฑ์ครบ 3 ระดับ แนะนำลงมือทำโปรเจกต์ และลองประเมินคอร์สถัดไป"
                : result.passed > 0
                  ? `ผ่านเกณฑ์ ${result.passed} ระดับต่อเนื่อง แนะนำขยับไปบท ${result.recommendation + 1} หรือประเมินระดับถัดไปเพื่อข้ามเพิ่ม`
                  : "ยังมีหลักฐานไม่ครบสำหรับแนะนำข้ามระดับ เริ่มจากบทพื้นฐานหรือทำแบบประเมินต่อ"}
          </p>
          {result.passed === 3 && course.id < 5 && (
            <a className="text-button" href={`#course-${course.id + 1}`}>
              ไปประเมินคอร์ส {course.id + 1} →
            </a>
          )}
        </div>
      )}
      {expanded && (
        <div className="assessment-workspace">
          <div className="section-line">
            <h3>{practice ? "โหมดฝึกซ้ำ" : `แบบประเมินระดับ ${level}`}</h3>
            <button className="text-button" onClick={() => setExpanded(false)}>
              ย่อแบบประเมิน
            </button>
          </div>
          {question ? (
            <div className="diagnostic-question" key={question.id}>
              <span className="eyebrow">
                {question.skill} · {question.id}
              </span>
              <h3>{question.prompt}</h3>
              {practice && (
                <p className="assessment-rule">
                  คุณเคยเห็นคำตอบข้อนี้แล้ว
                  การฝึกซ้ำไม่เปลี่ยนหลักฐานคำตอบครั้งแรก
                </p>
              )}
              <div role="radiogroup" aria-label={question.prompt}>
                {question.choices.map((answer, index) => (
                  <label
                    className={`choice ${choice === index ? "chosen" : ""}`}
                    key={index}
                  >
                    <input
                      type="radio"
                      name="diagnostic-answer"
                      disabled={feedback}
                      checked={choice === index}
                      onChange={() => setChoice(index)}
                    />
                    {answer}
                  </label>
                ))}
              </div>
              {feedback ? (
                <div className="feedback" role="status">
                  <strong>
                    {choice === question.answer
                      ? "คำตอบถูกต้อง"
                      : "ยังไม่ถูกต้อง"}
                  </strong>
                  <p>{question.explanation}</p>
                  <button
                    className="primary-button"
                    onClick={() => {
                      if (practice) {
                        setCurrent(null);
                        setPractice(false);
                        setFeedback(false);
                      } else next();
                    }}
                  >
                    {" "}
                    {practice ? "กลับไปดูหลักฐาน" : "ข้อต่อไป / ดูผลระดับนี้"}
                    <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <button
                  className="primary-button"
                  disabled={choice === null || !loaded}
                  onClick={() => {
                    if (choice !== null) {
                      record(question.id, choice);
                      setFeedback(true);
                    }
                  }}
                >
                  บันทึกคำตอบ
                </button>
              )}
            </div>
          ) : (
            <div className="assessment-result">
              <h3>
                ผลระดับ {level}: {result.levels[level - 1].correct}/4
                ถูกครั้งแรก
              </h3>
              <p>
                {result.levels[level - 1].passed
                  ? "ถึงเกณฑ์ระดับนี้แล้ว เพิ่มความยากหรือเปิดบทที่แนะนำได้เลย"
                  : "ทบทวนทักษะที่พลาดแล้วฝึกซ้ำได้ คะแนนประเมินเดิมจะไม่ถูกแทนด้วยคำตอบหลังดูเฉลย"}
              </p>
              {level < 3 && (
                <button
                  className="primary-button"
                  onClick={() => start(level + 1)}
                >
                  {result.levels[level - 1].passed
                    ? "เพิ่มความยาก: ระดับถัดไป"
                    : "ลองระดับถัดไปเอง (ยังไม่ผ่านระดับนี้)"}
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <details className="evidence-details">
        <summary>ดูข้อเท็จจริงรายข้อและผลแบบทดสอบท้ายบท</summary>
        <p>
          คะแนนนี้อธิบายเฉพาะคำตอบที่บันทึกในเบราว์เซอร์นี้
          ไม่ใช่ผลตรวจการเขียนโค้ดหรือแบบทดสอบมาตรฐาน คลังมี 12 ข้อต่อคอร์ส
          การฝึกซ้ำช่วยทบทวนแต่ไม่ใช่หลักฐานใหม่สำหรับเลื่อนระดับ
        </p>
        <div className="evidence-table">
          <table>
            <thead>
              <tr>
                <th>ทักษะ / ระดับ</th>
                <th>คำตอบครั้งแรก</th>
                <th>ผล</th>
                <th>จำนวนครั้ง</th>
                <th>ฝึกต่อ</th>
              </tr>
            </thead>
            <tbody>
              {bank
                .filter((q) => evidence[q.id])
                .map((q) => (
                  <tr key={q.id}>
                    <td>
                      {q.skill} · {q.level}
                      <small>{q.prompt}</small>
                    </td>
                    <td>{q.choices[evidence[q.id].first]}</td>
                    <td>{evidence[q.id].first === q.answer ? "ถูก" : "ผิด"}</td>
                    <td>{evidence[q.id].attempts}</td>
                    <td>
                      <button
                        className="text-button"
                        onClick={() => review(q.id)}
                      >
                        ฝึกซ้ำ
                      </button>
                      <button
                        className="text-button"
                        onClick={() => open(q.lesson)}
                      >
                        ทบทวนบท {q.lesson + 1}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!total && <p>ยังไม่มีคำตอบจากแบบประเมินระดับ</p>}
        <h4>
          แบบทดสอบท้ายบท:{" "}
          {quick.filter((r) => r.fact.first === r.lesson.answer).length}/
          {quick.length} ถูกครั้งแรก
        </h4>
        <p>
          แยกจากแบบประเมินระดับ
          ไม่นำจำนวนบทที่เรียนจบหรือคะแนนหลังลองซ้ำมาใช้แทนคะแนนข้ามขั้น
        </p>
        <ul>
          {quick.map((row) => (
            <li key={row.lesson.title}>
              {row.lesson.title}:{" "}
              {row.fact.first === row.lesson.answer
                ? "ถูกครั้งแรก"
                : "ครั้งแรกยังผิด"}{" "}
              · ตอบ {row.fact.attempts} ครั้ง
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
