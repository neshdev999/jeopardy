
import './App.css';
import ViewControl from "./ViewControl.js";
import Header from './Header.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <ViewControl />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
