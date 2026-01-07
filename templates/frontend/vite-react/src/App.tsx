import { BrowserRouter, Routes, Route } from "react-router";

import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import HelloNear from "@/pages/hello_near";
import { NearProvider } from 'near-connect-hooks';

function App () {
  return (
    <NearProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello-near" element={<HelloNear />} />
        </Routes>
      </BrowserRouter>
    </NearProvider>
  );
};

export default App;
