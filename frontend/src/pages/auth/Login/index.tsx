import { useAuthService } from "@/modules/auth/hooks/useAuthService";
import { useEffect } from "react";

export default function LoginPage() {
  const authService = useAuthService();

  useEffect(() => {
    const callBackend = async () => {
      const res = await authService.login({ test: "should reach the backend" });
      console.log("res", res);
    };

    callBackend();
  }, []);

  return <h1>Login Page</h1>;
}
