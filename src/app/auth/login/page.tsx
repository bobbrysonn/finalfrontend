import LoginForm from "@/components/loginform";
import { login } from "@/actions/auth";

export default function Login() {
  return <LoginForm login={login} />;
}