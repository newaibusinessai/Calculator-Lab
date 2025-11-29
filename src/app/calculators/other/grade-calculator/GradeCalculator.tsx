"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("grade-calculator")!;

interface Assignment {
  id: number;
  name: string;
  grade: string;
  weight: string;
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: "Homework", grade: "90", weight: "30" },
    { id: 2, name: "Midterm", grade: "85", weight: "30" },
    { id: 3, name: "Final", grade: "", weight: "40" }
  ]);
  const [result, setResult] = useState<{
    finalGrade: number;
    letterGrade: string;
  } | null>(null);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: Date.now(), name: "", grade: "", weight: "" }
    ]);
  };

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const getLetterGrade = (grade: number): string => {
    if (grade >= 97) return "A+";
    if (grade >= 93) return "A";
    if (grade >= 90) return "A-";
    if (grade >= 87) return "B+";
    if (grade >= 83) return "B";
    if (grade >= 80) return "B-";
    if (grade >= 77) return "C+";
    if (grade >= 73) return "C";
    if (grade >= 70) return "C-";
    if (grade >= 67) return "D+";
    if (grade >= 63) return "D";
    if (grade >= 60) return "D-";
    return "F";
  };

  const calculate = () => {
    const validAssignments = assignments.filter(a =>
      a.grade.trim() && a.weight.trim()
    );

    if (validAssignments.length === 0) {
      alert("Please enter at least one assignment with grade and weight");
      return;
    }

    const totalWeight = validAssignments.reduce((sum, a) => sum + parseFloat(a.weight), 0);

    if (Math.abs(totalWeight - 100) > 0.01) {
      alert(`Weights must add up to 100%. Current total: ${totalWeight.toFixed(1)}%`);
      return;
    }

    const weightedSum = validAssignments.reduce((sum, a) => {
      return sum + (parseFloat(a.grade) * parseFloat(a.weight) / 100);
    }, 0);

    const finalGrade = weightedSum;
    const letterGrade = getLetterGrade(finalGrade);

    setResult({ finalGrade, letterGrade });
  };

  const formula = "Final Grade = Σ(Assignment Grade × Weight) ÷ 100, where weights sum to 100%";

  const faqs = [
    {
      question: "How does weighted grade calculation work?",
      answer: "Each assignment is multiplied by its weight (as a percentage of your total grade), then all weighted values are summed. For example, if homework is 30% and you scored 90%, it contributes 27 points (90 × 0.30) to your final grade."
    },
    {
      question: "What happens if my weights don't add up to 100%?",
      answer: "The calculator will alert you if weights don't total exactly 100%. This ensures accurate calculations. Adjust your weights so they sum to 100% before calculating."
    },
    {
      question: "Can I calculate my grade with a missing assignment?",
      answer: "You can leave assignments blank if you don't have all grades yet. The calculator only uses assignments that have both a grade and weight entered. However, make sure your entered weights still total 100%."
    },
    {
      question: "What do the letter grades mean?",
      answer: "The calculator uses a standard grading scale: A+ (97-100), A (93-96), A- (90-92), B+ (87-89), B (83-86), B- (80-82), C+ (77-79), C (73-76), C- (70-72), D+ (67-69), D (63-66), D- (60-62), F (below 60)."
    }
  ];

  const howTo = [
    "For each assignment category, enter a name (optional), the grade percentage earned, and the weight percentage",
    "Ensure all weights add up to exactly 100%",
    "Click '+ Add Assignment' to add more categories as needed",
    "Click 'Remove' to delete assignment categories you don't need",
    "Click 'Calculate Final Grade' to see your final percentage and letter grade",
    "The result shows both your numerical grade and corresponding letter grade"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Assignment {index + 1}</span>
                {assignments.length > 1 && (
                  <button
                    onClick={() => removeAssignment(assignment.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Assignment name"
                value={assignment.name}
                onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                className="calc-input"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Grade (%)</label>
                  <input
                    type="number"
                    placeholder="Grade"
                    value={assignment.grade}
                    onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                    className="calc-input"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Weight (%)</label>
                  <input
                    type="number"
                    placeholder="Weight"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                    className="calc-input"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addAssignment}
          className="calc-btn w-full border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Assignment
        </button>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Final Grade
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Final Grade</div>
            <div className="text-4xl font-bold text-green-700 mb-2">
              {result.finalGrade.toFixed(2)}%
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              {result.letterGrade}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
