"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("gpa-calculator")!;

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "A", credits: "3" },
    { id: 2, name: "", grade: "A", credits: "3" },
    { id: 3, name: "", grade: "A", credits: "3" },
  ]);

  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalGradePoints: number;
  } | null>(null);

  const [currentGPA, setCurrentGPA] = useState("");
  const [currentCredits, setCurrentCredits] = useState("");
  const [includeCurrent, setIncludeCurrent] = useState(false);

  const addCourse = () => {
    const newId = Math.max(...courses.map((c) => c.id)) + 1;
    setCourses([...courses, { id: newId, name: "", grade: "A", credits: "3" }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculate = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    // Include current GPA if specified
    if (includeCurrent && currentGPA && currentCredits) {
      const existingGPA = parseFloat(currentGPA);
      const existingCredits = parseFloat(currentCredits);
      if (!isNaN(existingGPA) && !isNaN(existingCredits)) {
        totalGradePoints = existingGPA * existingCredits;
        totalCredits = existingCredits;
      }
    }

    // Calculate for new courses
    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      if (!isNaN(credits) && credits > 0 && course.grade in gradePoints) {
        totalGradePoints += gradePoints[course.grade] * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) {
      setResult(null);
      return;
    }

    const gpa = totalGradePoints / totalCredits;

    setResult({
      gpa,
      totalCredits,
      totalGradePoints,
    });
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return "text-green-600";
    if (gpa >= 3.0) return "text-blue-600";
    if (gpa >= 2.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 3.9) return "Excellent (Summa Cum Laude)";
    if (gpa >= 3.7) return "Great (Magna Cum Laude)";
    if (gpa >= 3.5) return "Very Good (Cum Laude)";
    if (gpa >= 3.0) return "Good";
    if (gpa >= 2.0) return "Satisfactory";
    if (gpa >= 1.0) return "Needs Improvement";
    return "Failing";
  };

  const formula = "GPA = Total Grade Points ÷ Total Credits, where Grade Points = Grade Value × Credits";

  const faqs = [
    {
      question: "How is GPA calculated?",
      answer: "GPA (Grade Point Average) is calculated by multiplying each course's grade value by its credit hours to get grade points, summing all grade points, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course gives 12 grade points."
    },
    {
      question: "What is the GPA scale?",
      answer: "This calculator uses the standard 4.0 scale where A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, and so on down to F = 0.0. Different schools may use slightly different scales."
    },
    {
      question: "Can I calculate my cumulative GPA?",
      answer: "Yes! Check the 'Include current cumulative GPA' box, enter your existing GPA and total credits earned, then add your new courses. The calculator will compute your updated cumulative GPA."
    },
    {
      question: "What do the honors designations mean?",
      answer: "Latin honors are academic distinctions: Summa Cum Laude (highest honor, typically 3.9+), Magna Cum Laude (great honor, typically 3.7-3.89), and Cum Laude (honor, typically 3.5-3.69). Requirements vary by institution."
    }
  ];

  const howTo = [
    "Optionally check 'Include current cumulative GPA' and enter your existing GPA and credits to update your cumulative GPA",
    "For each course, enter a name (optional), select the letter grade received, and enter the credit hours",
    "Click '+ Add Course' to add more courses as needed",
    "Click the × button to remove courses you don't need",
    "Click 'Calculate GPA' to see your GPA, total credits, and honor designation",
    "The grade scale reference at the bottom shows point values for each letter grade"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-2xl mx-auto">
        {/* Current GPA (optional) */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="includeCurrent"
              checked={includeCurrent}
              onChange={(e) => setIncludeCurrent(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="includeCurrent" className="text-sm font-medium text-gray-700">
              Include current cumulative GPA
            </label>
          </div>
          {includeCurrent && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Current GPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  max="4.0"
                  value={currentGPA}
                  onChange={(e) => setCurrentGPA(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 3.5"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Total Credits Earned
                </label>
                <input
                  type="number"
                  value={currentCredits}
                  onChange={(e) => setCurrentCredits(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 60"
                />
              </div>
            </div>
          )}
        </div>

        {/* Course list */}
        <div className="mb-4">
          <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 mb-2">
            <div className="col-span-5">Course Name (optional)</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-1"></div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-2 mb-2">
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                className="calc-input col-span-5"
                placeholder="Course name"
              />
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                className="calc-input col-span-3"
              >
                {Object.keys(gradePoints).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade} ({gradePoints[grade].toFixed(1)})
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                className="calc-input col-span-3"
                placeholder="Credits"
                min="0"
                step="0.5"
              />
              <button
                onClick={() => removeCourse(course.id)}
                className="calc-btn col-span-1 text-red-500 hover:bg-red-50"
                disabled={courses.length === 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={addCourse} className="calc-btn flex-1">
            + Add Course
          </button>
          <button onClick={calculate} className="calc-btn calc-btn-primary flex-1">
            Calculate GPA
          </button>
        </div>

        {/* Result */}
        {result && (
          <>
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">
                {includeCurrent ? "Cumulative GPA" : "Semester GPA"}
              </div>
              <div className={`text-5xl font-bold ${getGPAColor(result.gpa)}`}>
                {result.gpa.toFixed(2)}
              </div>
              <div className={`text-lg ${getGPAColor(result.gpa)}`}>
                {getGPALabel(result.gpa)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Credits</div>
                <div className="text-2xl font-bold text-gray-800">
                  {result.totalCredits}
                </div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Grade Points</div>
                <div className="text-2xl font-bold text-gray-800">
                  {result.totalGradePoints.toFixed(1)}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Grade scale reference */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Grade Scale</h3>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="flex justify-between">
                <span className="text-gray-600">{grade}:</span>
                <span className="font-medium">{points.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
