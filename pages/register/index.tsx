import SignUpForm from "../../components/user/SignUpForm";

export type User = {
  id?: string;
  username: string;
  email: string;
  password: string;
};

function RegisterPage() {
  return (
    <section>
      <SignUpForm />
    </section>
  );
}

export default RegisterPage;
