export const loginErrors = (error) => {
  switch (true) {
    case error?.message?.includes("invalid-email"):
      return "Please enter a valid Email address.";

    case error?.message?.includes("internal-error"):
      return "Internal Error!! Please try after sometime.";

    case error?.message?.includes("user-not-found"):
      return "User is not registered with the system. Please sign up with the user's email.";

    case error?.message?.includes("wrong-password"):
      return "Please check the password and try again.";

    case error?.message?.includes("account-exists-with-different-credential"):
      return "User account already exists with a different service provider. Please try with the same provider or try resetting your password.";

    default:
      return error?.message?.replace("Firebase: ", "");
  }
};
