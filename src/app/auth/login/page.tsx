import LoginForm from "@/components/forms/loginform";
import { login } from "@/actions/auth";

export default function Login() {
  return <LoginForm login={login} />;
}
