import LoginForm from "@/components/loginform";
import { login } from "@/actions/auth";

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <LoginForm login={login} />
    </main>
  )
}