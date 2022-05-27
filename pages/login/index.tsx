import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import LoginBox from "../../components/organisms/LoginBox";

const LoginPage = () => {
  const { data: session } = useSession();
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      data-testid="login-page"
    >
      <div className="w-full max-w-md">
        {!session && <LoginBox elevation={1} />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkSession = await getSession(context);

  if (checkSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: checkSession,
    },
  };
};

export default LoginPage;
