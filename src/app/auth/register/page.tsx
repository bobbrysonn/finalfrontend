import RegisterForm from "@/components/registerform";
import { register } from "@/actions/auth";

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-[80vh]">
      <RegisterForm register={register} />
    </main>
  );
}
