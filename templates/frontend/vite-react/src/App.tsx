import { BrowserRouter, Routes, Route } from "react-router";

import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import HelloNear from "@/pages/hello_near";


function App () {
  return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello-near" element={<HelloNear />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
