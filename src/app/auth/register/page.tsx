import RegisterForm from "@/components/registerform";
import { register } from "@/actions/auth";

export default function Register() {
  return <RegisterForm register={register} />
}
