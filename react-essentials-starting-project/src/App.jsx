import Header from "./components/Header";
import CoreConceptsList from "./components/CoreConceptsList";
import TabContent from "./components/TabContent";

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConceptsList />
        <TabContent />
      </main>
    </div>
  );
}

export default App;
