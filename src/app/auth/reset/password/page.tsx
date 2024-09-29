import PasswordResetForm from "@/components/forms/passwordresetform";
import { resetPassword } from "@/actions/auth";

export default function ResetPasswordPage() {
  return (
    <section>
      <PasswordResetForm reset={resetPassword} />
    </section>
  );
}
