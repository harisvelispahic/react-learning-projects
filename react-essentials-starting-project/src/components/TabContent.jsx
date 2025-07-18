import { useState } from "react";
import TabButton from "./TabButton";
import { EXAMPLES } from "../data-with-examples";
import "../index.css";

export default function TabContent() {
  const [selectedTab, setSelectedTab] = useState("");
  function handleSelect(example) {
    setSelectedTab(example);
  }

  return (
    <section id="examples">
      <h2>Examples</h2>
      <menu>
        <TabButton
          onSelect={() => handleSelect("components")}
          isActive={selectedTab === "components"}
        >
          Components
        </TabButton>
        <TabButton
          onSelect={() => handleSelect("jsx")}
          isActive={selectedTab === "jsx"}
        >
          JSX
        </TabButton>
        <TabButton
          onSelect={() => handleSelect("props")}
          isActive={selectedTab === "props"}
        >
          Props
        </TabButton>
        <TabButton
          onSelect={() => handleSelect("state")}
          isActive={selectedTab === "state"}
        >
          State
        </TabButton>
      </menu>
      {!selectedTab ? (
        <p>Please select a tab</p>
      ) : (
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTab].title}</h3>
          <p>{EXAMPLES[selectedTab].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTab].code}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
