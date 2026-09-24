import { lessons } from "./course";
import { advancedCourses, type Course } from "./advanced-courses";
import { newCourses } from "./new-tracks";
export const courses: Course[] = [
  {
    id: 1,
    track: "python",
    title: "Python for AI",
    subtitle: "เริ่มจากบรรทัดแรก สู่โปรเจกต์ AI แรก",
    prerequisite: "เริ่มจากศูนย์ได้ เตรียม Python 3 หรือ notebook สำหรับฝึก",
    project: "ผู้ช่วยจัดหมวดหมู่ข้อความ",
    groups: [
      "Python พื้นฐาน",
      "ข้อมูลและการวิเคราะห์",
      "Machine Learning",
      "ลงมือสร้าง AI",
    ],
    sources: [
      { title: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" },
    ],
    lessons,
  },
  ...advancedCourses,
  ...newCourses,
];
