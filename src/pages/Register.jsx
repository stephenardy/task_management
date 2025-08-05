import AuthLayout from "../components/layouts/Auth";
import RegisterView from "../components/views/Register/RegisterView";

export default function Register() {
  return (
    <AuthLayout>
      <RegisterView />
    </AuthLayout>
  );
}
