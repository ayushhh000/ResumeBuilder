import React, { useState, useContext } from "react";
import { authStyles as styles } from "../assets/dummystyle";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axios from "axios";
import { Divide } from "lucide-react";
import { UserContext } from "../context/userContext";
import { Input } from "./Input";
import { API_PATHS, BASE_URL } from "../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.REGISTER}`,
        {
          name: fullName,
          email,
          password,
        }
      );

      setError("Account created successfully! Please login.");
      setCurrentPage("login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>
          Join thousand of professionals today
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="email@example.com"
          type="email"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min. 8 characters"
          type="password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>

        {/* Footer */}
        <p className={styles.switchText}>
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            type="button"
            className={styles.signupSwitchButton}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
