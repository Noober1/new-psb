import LoginBox from "../../components/organisms/LoginBox";

const LoginPage = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      data-testid="login-page"
    >
      <LoginBox />
    </div>
  );
};

export default LoginPage;
