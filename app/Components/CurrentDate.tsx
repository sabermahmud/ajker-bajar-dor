"use client";

const Header = (): React.JSX.Element => {
  return (
    <p suppressHydrationWarning>
      Today is{" "}
      {new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
  );
};

export default Header;