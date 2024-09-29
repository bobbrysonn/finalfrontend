import PasswordResetConfirmationForm from "@/components/forms/passwordresetconfirmationform";
import { resetConfirm } from "@/actions/auth";

type Props = {
  params: { id: string; token: string };
};

export default function ResetPasswordPage({ params }: Props) {
  return (
    <section className="w-full">
      <PasswordResetConfirmationForm
        resetConfirm={resetConfirm}
        id={params.id}
        token={params.token}
      />
    </section>
  );
}
