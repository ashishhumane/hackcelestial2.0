import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Target, Pencil } from "lucide-react";

export function DemoWidget() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const demos = [
    {
      id: 0,
      title: "Letter Tracing",
      instruction: "Trace the letter 'A'",
      icon: Pencil,
      color: "dysgraphia",
      action: "Trace",
    },
    {
      id: 1,
      title: "Number Match",
      instruction: "Find 3 + 2 = ?",
      icon: Star,
      color: "dyscalculia",
      action: "Solve",
    },
    {
      id: 2,
      title: "Word Sound",
      instruction: "Match 'CAT' with its sound",
      icon: Target,
      color: "dyslexia",
      action: "Match",
    },
    {
      id: 3,
      title: "Focus Challenge",
      instruction: "Tap the moving target",
      icon: Target,
      color: "adhd",
      action: "Tap",
    },
  ];

  const handleComplete = () => {
    if (!completed.includes(currentDemo)) {
      setCompleted([...completed, currentDemo]);
    }
    if (currentDemo < demos.length - 1) {
      setCurrentDemo(currentDemo + 1);
    }
  };

  const demo = demos[currentDemo];

  return (
    <div className="p-6 border rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <demo.icon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">{demo.title}</h2>
      </div>

      <p className="mb-4 text-gray-700">{demo.instruction}</p>

      <Button onClick={handleComplete}>{demo.action}</Button>

      <div className="mt-4">
        {completed.includes(demo.id) && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Completed!</span>
          </div>
        )}
      </div>
    </div>
  );
}
