import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const checks = [
    { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
    { label: "Contains special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const passedChecks = checks.filter(check => check.test(password)).length;
  const strength = (passedChecks / checks.length) * 100;

  const getStrengthLabel = () => {
    if (passedChecks <= 1) return "Very Weak";
    if (passedChecks <= 2) return "Weak";
    if (passedChecks <= 3) return "Fair";
    if (passedChecks <= 4) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passedChecks <= 1) return "bg-destructive";
    if (passedChecks <= 2) return "bg-orange-500";
    if (passedChecks <= 3) return "bg-yellow-500";
    if (passedChecks <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Password Strength</span>
        <span className="text-sm text-muted-foreground">{getStrengthLabel()}</span>
      </div>
      
      <Progress value={strength} className="h-2" />
      
      <div className="space-y-1">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            {check.test(password) ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={check.test(password) ? "text-green-600" : "text-muted-foreground"}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};