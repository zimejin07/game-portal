import userReducer, { setUser } from "../userSlice";

test("sets user state correctly", () => {
  const initialState = { username: "", market: "" };
  const newState = userReducer(
    initialState,
    setUser({ username: "JohnDoe", market: "en" })
  );

  expect(newState).toEqual({ username: "JohnDoe", market: "en" });
});
