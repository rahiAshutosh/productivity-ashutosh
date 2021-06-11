import React, { useRef, useState } from "react";
import { useAuth } from "./hocs/AuthProvider";
import { useRouter } from "next/router";
import Link from "next/link";
import cogoToast from 'cogo-toast';

const Signup = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = (e) => {
    setSubmitLoading(true);
    signUp(emailRef.current.value, passwordRef.current.value)
    .then((res) => {
      setSubmitLoading(false);
      if (res?.user?.email === emailRef.current.value) {
        router.push('/');
      }
    })
    .catch((err) => {
      setSubmitLoading(false);
      cogoToast.error(err.message || 'Failed');
    });
  };

  return (
    <div className="container">
      <div className="logo-search">
        <h1>Productivity</h1>
        <div className="login-card">
          <div className="inner-card">
            <div className="header">Create your Productivity account</div>
            <div className="label">Email</div>
            <input
              ref={emailRef}
              type="text"
              aria-label="email input"
              aria-required="true"
              autoComplete="username email"
              placeholder="Enter email"
            />
            <div className="label">Password</div>
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button
              disabled={submitLoading}
              type="submit"
              onClick={handleSubmit}              
            >
              CONTINUE {submitLoading && <div className="loader" />}
            </button>
          </div>
        </div>
        <div className="remember-me">
          Already have an account? <Link href="/login"><a>Login</a></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;