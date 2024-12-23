import { Navigation } from './components/navigation';
import Home from './pages/home';
import { Route } from 'wouter';
import HelloNear from './pages/hello_near';

function App() {

  return (
    <>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/hello-near" component={HelloNear}/>
    </>
  )
}

export default App
