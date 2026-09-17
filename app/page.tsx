"use client";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Copy,
  Flag,
  GraduationCap,
  Layers3,
  Menu,
  Play,
  Search,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { courses } from "./courses";
import { AdaptiveCoach, useAssessment } from "./adaptive-coach";
import type { Course } from "./advanced-courses";
export default function Home() {
  const [courseId, setCourseId] = useState(1);
  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#course-(\d+)(?:$|\/)/);
      const id = match ? Number(match[1]) : 1;
      setCourseId(courses.some((c) => c.id === id) ? id : 1);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const course = courses.find((c) => c.id === courseId)!;
  return <CourseView key={course.id} course={course} />;
}
function CourseView({ course }: { course: Course }) {
  const lessons = course.lessons;
  const assessment = useAssessment(course);
  const STORAGE =
    course.id === 1 ? "pypath-progress-v1" : `pypath-course-${course.id}-v1`;
  const [completed, setCompleted] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [choice, setChoice] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE) || "[]");
      if (Array.isArray(value))
        setCompleted([
          ...new Set(
            value.filter(
              (n: unknown): n is number =>
                typeof n === "number" &&
                Number.isInteger(n) &&
                n >= 0 &&
                n < lessons.length,
            ),
          ),
        ]);
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(STORAGE, JSON.stringify(completed));
      } catch {
        setStorageError(true);
      }
    }
  }, [completed, ready]);
  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, []);
  useEffect(() => {
    const onHash = () => {
      const match = window.location.hash.match(/(?:^#|\/)lesson-(\d+)$/);
      const id = match ? Number(match[1]) - 1 : -1;
      setActive(id >= 0 && id < lessons.length ? id : null);
      setChoice(null);
      setSubmitted(false);
      setCopied(false);
      setCopyError(false);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const open = (id: number) => {
    window.location.hash =
      course.id === 1
        ? `lesson-${id + 1}`
        : `course-${course.id}/lesson-${id + 1}`;
    setMobile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const home = () => {
    window.location.hash =
      course.id === 1 ? "curriculum" : `course-${course.id}`;
    setMobile(false);
  };
  const next = lessons.findIndex((_, i) => !completed.includes(i));
  const percent = Math.round((completed.length / lessons.length) * 100);
  const lesson = active === null ? null : lessons[active];
  const visible = lessons
    .map((item, id) => ({ ...item, id }))
    .filter(
      (item) =>
        (filter === "all" ||
          (filter === "completed"
            ? completed.includes(item.id)
            : !completed.includes(item.id))) &&
        `${item.title} ${item.subtitle} ${item.tag}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        ข้ามไปเนื้อหา
      </a>
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <a
          href={course.id === 1 ? "#curriculum" : `#course-${course.id}`}
          className="brand"
          onClick={home}
        >
          <span className="brand-icon">
            <Code2 size={23} />
          </span>
          PyPath<span className="brand-dot">.</span>
        </a>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav aria-label="เมนูหลัก">
          <button
            className={active === null ? "nav-item selected" : "nav-item"}
            onClick={home}
          >
            <BookOpen size={19} />
            หลักสูตรของฉัน <span className="tiny-count">8</span>
          </button>
          <button
            className={active !== null ? "nav-item selected" : "nav-item"}
            onClick={() => open(next === -1 ? 0 : next)}
          >
            <Play size={18} />
            เรียนต่อ
          </button>
          <button
            className="nav-item"
            onClick={() => {
              home();
              setFilter("completed");
            }}
          >
            <Flag size={18} />
            บทเรียนที่สำเร็จ
          </button>
        </nav>
        <div className="sidebar-divider" />
        <div className="workspace-label">เส้นทางของคุณ</div>
        <div className="path-list">
          {course.groups.map((name, i) => (
            <button onClick={() => open(i * 2)} key={name}>
              <span
                className={
                  completed.includes(i * 2) && completed.includes(i * 2 + 1)
                    ? "path-dot done"
                    : "path-dot"
                }
              >
                {completed.includes(i * 2) && completed.includes(i * 2 + 1) ? (
                  <Check size={11} />
                ) : (
                  i + 1
                )}
              </span>
              {name}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="daily-card">
            <span className="small-spark">
              <Sparkles size={18} />
            </span>
            <strong>ก้าวเล็ก ๆ ทุกวัน</strong>
            <p>
              วันละ 45 นาที ก็เข้าใกล้
              <br />
              โปรเจกต์ AI แรกได้อีกนิด
            </p>
            <div className="days">
              {["จ", "อ", "พ", "พฤ", "ศ"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <small>แผนแนะนำ · 5 วันต่อสัปดาห์</small>
          </div>
          <div className="profile">
            <span className="avatar">P</span>
            <div>
              <strong>Python Explorer</strong>
              <small>พร้อมเรียนรู้สิ่งใหม่</small>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>
      {mobile && (
        <button
          className="mobile-overlay"
          aria-label="ปิดเมนู"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="main-wrap">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="menu-button"
              aria-expanded={mobile}
              aria-label="เปิดเมนู"
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span>พื้นที่การเรียนรู้</span>
            <ChevronRight size={13} />
            <strong>
              {lesson ? `บทที่ ${active! + 1}` : "หลักสูตรของฉัน"}
            </strong>
          </div>
          <span className="top-badge">
            <span /> LEARN. BUILD. GROW.
          </span>
        </header>
        <main id="main-content" tabIndex={-1}>
          {storageError && (
            <div className="storage-notice" role="status">
              เบราว์เซอร์ไม่อนุญาตให้บันทึกความคืบหน้า
              ข้อมูลอาจหายเมื่อปิดหน้านี้
            </div>
          )}
          <section className="course-catalog" aria-label="เลือกคอร์ส">
            <div className="catalog-heading">
              <div>
                <span className="eyebrow">YOUR AI LEARNING JOURNEY</span>
                <h2>5 คอร์ส · 40 บท · เรียนรู้ผ่านผลงาน</h2>
              </div>
              <span>พื้นฐาน → ประยุกต์ → สร้างระบบ</span>
            </div>
            <div className="course-switcher">
              {courses.map((c) => (
                <a
                  key={c.id}
                  className={
                    c.id === course.id
                      ? "course-option active"
                      : "course-option"
                  }
                  href={c.id === 1 ? "#curriculum" : `#course-${c.id}`}
                  aria-current={c.id === course.id ? "page" : undefined}
                >
                  <span>COURSE 0{c.id}</span>
                  <strong>{c.title}</strong>
                  <small>
                    {c.lessons.length} บทเรียน <ArrowUpRight size={13} />
                  </small>
                </a>
              ))}
            </div>
            <p className="prerequisite">
              <strong>ก่อนเรียนคอร์สนี้:</strong> {course.prerequisite}
            </p>
          </section>
          {active === null && (
            <AdaptiveCoach
              course={course}
              assessment={assessment}
              open={open}
            />
          )}
          {lesson && active !== null ? (
            <>
              <button className="back-link" onClick={home}>
                <ChevronLeft size={17} /> กลับไปหลักสูตร
              </button>
              <div className="lesson-heading">
                <span className="eyebrow">
                  WEEK {String(active + 1).padStart(2, "0")} / {lesson.tag}
                </span>
                <h1>{lesson.title}</h1>
                <p>
                  {lesson.subtitle} <span>· {lesson.minutes} นาที</span>
                </p>
              </div>
              <div className="lesson-layout">
                <article className="lesson-content">
                  <section>
                    <h2>มาเริ่มกันเลย</h2>
                    <p>{lesson.intro}</p>
                  </section>
                  <section>
                    <h2>สิ่งที่ต้องเข้าใจ</h2>
                    <ul className="concepts">
                      {lesson.concepts.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <div className="section-line">
                      <h2>ลองอ่าน แล้วลงมือเขียน</h2>
                      <button
                        className="copy-button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(lesson.code);
                            setCopied(true);
                            setCopyError(false);
                          } catch {
                            setCopied(false);
                            setCopyError(true);
                          }
                        }}
                      >
                        <Copy size={14} />
                        {copied ? "คัดลอกแล้ว" : "คัดลอกโค้ด"}
                      </button>
                    </div>
                    {copyError && (
                      <p role="status" className="code-note">
                        คัดลอกอัตโนมัติไม่ได้
                        กรุณาเลือกข้อความโค้ดแล้วคัดลอกด้วยตัวเอง
                      </p>
                    )}
                    <div className="code-window">
                      <div className="code-header">
                        <span>
                          <i />
                          <i />
                          <i />
                        </span>
                        <small>lesson_{active + 1}.py</small>
                        <span>Python 3</span>
                      </div>
                      <pre>
                        <code>{lesson.code}</code>
                      </pre>
                    </div>
                    <div className="output">
                      <span>ผลลัพธ์ตัวอย่าง</span>
                      <pre>{lesson.output}</pre>
                    </div>
                    <p className="code-note">
                      นำโค้ดไปรันใน Python 3 หรือ notebook ของคุณ
                      เว็บนี้แสดงตัวอย่างและผลลัพธ์ประกอบ
                    </p>
                  </section>
                  <section className="exercise">
                    <span className="eyebrow">YOUR TURN</span>
                    <h2>ถึงตาคุณแล้ว</h2>
                    <p>{lesson.exercise}</p>
                  </section>
                  <section className="quiz">
                    <span className="eyebrow">QUICK CHECK</span>
                    <h2>เช็กความเข้าใจกันหน่อย</h2>
                    <p>{lesson.question}</p>
                    <div role="radiogroup" aria-label={lesson.question}>
                      {lesson.choices.map((c, i) => (
                        <label
                          key={c}
                          className={`choice ${choice === i ? "chosen" : ""} ${submitted && i === lesson.answer ? "correct" : ""}`}
                        >
                          <input
                            type="radio"
                            name="quiz-answer"
                            checked={choice === i}
                            disabled={submitted}
                            onChange={() => setChoice(i)}
                          />
                          <span>{String.fromCharCode(65 + i)}</span>
                          {c}
                          {submitted && i === lesson.answer && (
                            <Check size={18} />
                          )}
                        </label>
                      ))}
                    </div>
                    {submitted ? (
                      <div
                        className={
                          choice === lesson.answer
                            ? "feedback good"
                            : "feedback"
                        }
                        role="status"
                      >
                        <strong>
                          {choice === lesson.answer
                            ? "ถูกต้อง เก่งมาก!"
                            : "ลองทำความเข้าใจอีกนิด"}
                        </strong>
                        <p>{lesson.explanation}</p>
                        {choice !== lesson.answer && (
                          <button
                            className="text-button"
                            onClick={() => {
                              setSubmitted(false);
                              setChoice(null);
                            }}
                          >
                            ลองตอบอีกครั้ง
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        className="primary-button"
                        disabled={choice === null}
                        onClick={() => {
                          if (choice !== null)
                            assessment.record(`quick-${active}`, choice);
                          setSubmitted(true);
                        }}
                      >
                        ตรวจคำตอบ <ArrowRight size={16} />
                      </button>
                    )}
                  </section>
                  <div className="lesson-actions">
                    <button
                      className="secondary-button"
                      disabled={active === 0}
                      onClick={() => open(active - 1)}
                    >
                      <ChevronLeft size={16} />
                      บทก่อนหน้า
                    </button>
                    <button
                      disabled={
                        !ready ||
                        (!completed.includes(active) &&
                          !(submitted && choice === lesson.answer))
                      }
                      className="primary-button"
                      onClick={() => {
                        setCompleted((prev) =>
                          prev.includes(active) ? prev : [...prev, active],
                        );
                        if (active < lessons.length - 1) open(active + 1);
                        else home();
                      }}
                    >
                      <Check size={17} />
                      {active === 7 ? "จบหลักสูตร" : "เรียนจบและไปบทถัดไป"}
                    </button>
                  </div>
                  <p className="code-note">
                    ตอบแบบทดสอบให้ถูกเพื่อบันทึกว่าเรียนจบ
                    แล้วลองทำแบบฝึกหัดด้วยตัวเองด้วยนะ
                  </p>
                </article>
                <aside className="lesson-aside">
                  <div className="mini-course">
                    <span className="eyebrow">COURSE CONTENT</span>
                    <h3>{course.title}</h3>
                    {lessons.map((l, i) => (
                      <button
                        key={l.title}
                        className={active === i ? "current" : ""}
                        onClick={() => open(i)}
                      >
                        <span>
                          {completed.includes(i) ? (
                            <Check size={14} />
                          ) : (
                            String(i + 1).padStart(2, "0")
                          )}
                        </span>
                        {l.title}
                      </button>
                    ))}
                  </div>
                </aside>
              </div>
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <span className="eyebrow">A LITTLE PROGRESS, EVERY DAY</span>
                  <h1>
                    {course.id === 1 ? "เส้นทางสู่โลก AI ของคุณ" : course.title}{" "}
                    <span className="wave">✳</span>
                  </h1>
                  <p>{course.subtitle}</p>
                </div>
                <span className="beginner-pill">
                  <span />
                  {course.id === 1
                    ? "สำหรับผู้เริ่มต้น"
                    : `คอร์ส ${course.id} · ต่อยอดทักษะ`}
                </span>
              </div>
              <section className="hero">
                <div className="hero-content">
                  <div className="hero-label">
                    <span /> LEARNING PATH{" "}
                    <span className="hero-label-divider">/</span> 8 WEEKS
                  </div>
                  <h2>
                    {course.id === 1
                      ? "Python today."
                      : [
                          "",
                          "",
                          "Learn the patterns.",
                          "Go deeper.",
                          "Ground your AI.",
                          "Build with evidence.",
                        ][course.id]}
                    <br />
                    <span>
                      {course.id === 1 ? "AI tomorrow." : "Build what’s next."}
                    </span>
                  </h2>
                  <p>
                    {course.subtitle}
                    <br />
                    ผ่านตัวอย่าง แบบฝึกหัด และโปรเจกต์ที่ลงมือทำจริง
                  </p>
                  <div className="hero-meta">
                    <span>
                      <BookOpen size={15} />8 บทเรียน
                    </span>
                    <span>
                      <Clock3 size={15} />
                      เรียนตามจังหวะของคุณ
                    </span>
                  </div>
                  <button
                    className="hero-button"
                    onClick={() => open(next === -1 ? 0 : next)}
                  >
                    {completed.length === 8
                      ? "ทบทวนบทเรียน"
                      : completed.length
                        ? "เรียนต่อจากครั้งก่อน"
                        : "เริ่มเรียนบทแรก"}
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <span className="art-star star-one">✦</span>
                  <span className="art-star star-two">✳</span>
                  <div className="floating-label">
                    <span /> YOUR NEXT CHAPTER
                  </div>
                  <div className="art-code">
                    <div className="art-code-top">
                      <span />
                      <span />
                      <span />
                      <small>hello_future.py</small>
                    </div>
                    <div className="art-code-body">
                      <div>
                        <em>01</em>
                        <b>from</b> curiosity <b>import</b> growth
                      </div>
                      <div>
                        <em>02</em>
                      </div>
                      <div>
                        <em>03</em>skills = [<mark>"Python"</mark>,{" "}
                        <mark>"AI"</mark>]
                      </div>
                      <div>
                        <em>04</em>
                        <b>for</b> day <b>in</b> learning:
                      </div>
                      <div>
                        <em>05</em> you.<strong>grow</strong>()
                      </div>
                      <div className="art-output">
                        <span>❯</span> Building your next possibility
                        <span className="cursor-block" />
                      </div>
                    </div>
                  </div>
                  <div className="python-tile">
                    <Code2 size={32} />
                  </div>
                  <div className="ai-tile">
                    <Sparkles size={20} />
                    made by you
                  </div>
                </div>
              </section>
              <section className="stats" aria-label="ภาพรวมหลักสูตร">
                <div>
                  <span className="stat-icon mint">
                    <BookOpen size={20} />
                  </span>
                  <div>
                    <strong>
                      8 <small>บทเรียน</small>
                    </strong>
                    <p>จากพื้นฐานสู่การใช้งานจริง</p>
                  </div>
                </div>
                <div>
                  <span className="stat-icon peach">
                    <Terminal size={20} />
                  </span>
                  <div>
                    <strong>
                      8 <small>แบบฝึกหัด</small>
                    </strong>
                    <p>เรียนรู้ผ่านการลงมือเขียน</p>
                  </div>
                </div>
                <div>
                  <span className="stat-icon lavender">
                    <GraduationCap size={21} />
                  </span>
                  <div>
                    <strong>
                      1 <small>โปรเจกต์จบคอร์ส</small>
                    </strong>
                    <p>สร้างผลงาน AI ของตัวเอง</p>
                  </div>
                </div>
              </section>
              <div className="curriculum-grid">
                <section className="curriculum">
                  <div className="section-title">
                    <div>
                      <h2>ค่อย ๆ เรียน ค่อย ๆ สร้าง</h2>
                      <p>ทุกบทคืออีกก้าวสู่เป้าหมายของคุณ</p>
                    </div>
                    <span className="muted-small">8 บทเรียน</span>
                  </div>
                  <div className="course-tools">
                    <div className="tabs">
                      {[
                        ["all", "ทั้งหมด"],
                        ["pending", "ยังไม่เรียนจบ"],
                        ["completed", "เรียนจบแล้ว"],
                      ].map(([value, label]) => (
                        <button
                          className={filter === value ? "active" : ""}
                          key={value}
                          onClick={() => setFilter(value)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <label className="search">
                      <Search size={16} />
                      <input
                        aria-label="ค้นหาบทเรียน"
                        placeholder="ค้นหาบทเรียน"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="lesson-cards">
                    {visible.map((l) => (
                      <button
                        className={`lesson-card ${completed.includes(l.id) ? "is-complete" : ""}`}
                        onClick={() => open(l.id)}
                        key={l.id}
                      >
                        <span
                          className={`lesson-number tone-${Math.floor(l.id / 2)}`}
                        >
                          {completed.includes(l.id) ? (
                            <Check size={24} />
                          ) : (
                            String(l.id + 1).padStart(2, "0")
                          )}
                        </span>
                        <span className="card-body">
                          <span className="card-label">
                            WEEK {String(l.id + 1).padStart(2, "0")}{" "}
                            <span>·</span> {l.tag}
                          </span>
                          <strong>{l.title}</strong>
                          <span className="card-description">{l.subtitle}</span>
                          <span className="card-meta">
                            <span>
                              <Clock3 size={12} />
                              {l.minutes} นาที
                            </span>
                            <span>
                              <Code2 size={13} />
                              แบบฝึกหัด
                            </span>
                            {completed.includes(l.id) && (
                              <span className="complete-label">
                                เรียนจบแล้ว
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="card-arrow">
                          <ArrowUpRight size={19} />
                        </span>
                      </button>
                    ))}
                  </div>
                  {!visible.length && (
                    <div className="empty-state">
                      <Search size={26} />
                      <h3>
                        {query
                          ? "ไม่พบบทเรียนที่ค้นหา"
                          : "ยังไม่มีบทเรียนในหมวดนี้"}
                      </h3>
                      <p>ลองเลือกหมวดอื่น หรือเริ่มเรียนบทแรกได้เลย</p>
                      <button
                        className="text-button"
                        onClick={() => {
                          setQuery("");
                          setFilter("all");
                        }}
                      >
                        ดูบทเรียนทั้งหมด
                      </button>
                    </div>
                  )}
                </section>
                <aside className="right-rail">
                  <section className="progress-card">
                    <div className="rail-heading">
                      <span>ความคืบหน้าของคุณ</span>
                      <span className="mint-symbol">
                        <Layers3 size={17} />
                      </span>
                    </div>
                    <div
                      className="progress-circle"
                      style={{
                        background: `conic-gradient(#28715a ${percent}%, #edf0e9 0)`,
                      }}
                    >
                      <div>
                        <strong>
                          {percent}
                          <span>%</span>
                        </strong>
                        <small>สำเร็จแล้ว</small>
                      </div>
                    </div>
                    <h3>
                      {percent === 100
                        ? "คุณทำสำเร็จแล้ว!"
                        : "ทุกก้าวมีความหมาย"}
                    </h3>
                    <p>{completed.length} จาก 8 บทเรียนเสร็จสมบูรณ์</p>
                    <div className="progress-track">
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <small className="saved-note">
                      บันทึกอัตโนมัติบนเบราว์เซอร์นี้
                    </small>
                  </section>
                  <section className="project-card">
                    <div className="project-icon">
                      <Flag size={23} />
                    </div>
                    <span className="eyebrow">THE FINISH LINE</span>
                    <h3>
                      {course.id === 1 ? "AI ตัวแรก" : "ผลงานขั้นต่อไป"}
                      <br />
                      ที่คุณสร้างเอง
                    </h3>
                    <p>
                      นำทุกสิ่งที่เรียนมาต่อยอดเป็น
                      <br />
                      {course.project}
                    </p>
                    <div className="project-tags">
                      <span>Python</span>
                      <span>คอร์ส {course.id}</span>
                      <span>Capstone</span>
                    </div>
                    <button onClick={() => open(7)}>
                      ดูโปรเจกต์จบคอร์ส <ArrowUpRight size={17} />
                    </button>
                  </section>
                  <div className="learning-note">
                    <Sparkles size={16} />
                    <p>
                      ไม่ต้องเก่งก่อนเริ่ม
                      <br />
                      <strong>แค่เริ่ม แล้วค่อย ๆ เก่งขึ้น</strong>
                    </p>
                  </div>
                </aside>
              </div>
            </>
          )}
          <section className="further-learning">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h2>อ่านต่อจากต้นทาง</h2>
              <p>
                ใช้เอกสารควบคู่กับการทดลอง และตรวจข้อจำกัดของเครื่องมือแต่ละรุ่น
              </p>
              <div className="source-links">
                {course.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
            {course.id === 5 && (
              <div className="specializations">
                <h3>เลือกเส้นทางเฉพาะทางต่อจากนี้</h3>
                <p>
                  แนวทางต่อยอดสำหรับวางแผนการเรียน ยังไม่ใช่คอร์สเพิ่มเติมในเว็บ
                </p>
                <ul>
                  <li>
                    <strong>Computer Vision:</strong> ต่อจาก CNN ไป detection,
                    segmentation และประเมินข้อมูลนอกชุดฝึก
                  </li>
                  <li>
                    <strong>NLP & Multilingual AI:</strong> ทดลอง tokenizer
                    ภาษาไทย, fine-tuning และประเมินหลายภาษา
                  </li>
                  <li>
                    <strong>AI Research:</strong> ทำซ้ำ paper แล้วออกแบบ
                    ablation และสมมติฐานของตัวเอง
                  </li>
                  <li>
                    <strong>Reinforcement Learning:</strong> ศึกษา MDP,
                    policy/value และทดลองใน simulator ก่อนระบบจริง
                  </li>
                </ul>
                <p>
                  เลือกหนึ่งสาย ทำผลงานที่ผู้อื่นรันซ้ำได้ แล้วขอ review
                  เพื่อพัฒนารอบถัดไป การเรียนจบไม่ได้เป็นใบรับรองความเชี่ยวชาญ
                </p>
              </div>
            )}
          </section>
          <footer>
            <span>
              <Code2 size={15} />
              PyPath · สร้างอนาคต ทีละบรรทัด
            </span>
            <span>Made for curious minds.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
