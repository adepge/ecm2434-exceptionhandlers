import { useState } from "react";

import Header from "./features/header";
import Footer from "./features/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
