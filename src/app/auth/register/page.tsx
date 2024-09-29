import RegisterForm from "@/components/forms/registerform";
import { register } from "@/actions/auth";

export default function Register() {
  return <RegisterForm register={register} />;
}
