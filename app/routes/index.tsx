import { useOutletContext } from "remix";

type OutletContext = {
  mode: "light" | "dark";
}

const commonStyle = {
  width: "100%",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

export default function Index() {
  const { mode } = useOutletContext<OutletContext>();
  const changeModeTo = mode === "light" ? "dark" : "light";

  return (
    <div
      style={{
        ...commonStyle,
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Hello, World!</h1>

      <div style={{ ...commonStyle }}>
        <form method="post" action="/">
          <input
            type="hidden"
            name="mode"
            value={changeModeTo}
          />
          <button className={`btn-${mode}`}>
            Set {changeModeTo} mode
          </button>
        </form>
      </div>
    </div>
  );
}
