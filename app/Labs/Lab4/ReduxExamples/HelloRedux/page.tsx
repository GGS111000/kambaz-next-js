"use client";
export default function HelloRedux() {
  // Keep this example minimal during build: avoid using useSelector at route-level
  // which may trigger prerender errors. The interactive Redux demo is used inside
  // the Lab4 page wrapped with a Provider.
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>Interactive demo available from the Lab4 page</h4>
      <hr />
    </div>
  );
}
