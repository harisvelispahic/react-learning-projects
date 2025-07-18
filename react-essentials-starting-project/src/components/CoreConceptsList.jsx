import CoreConcept from "./CoreConcept";
import { CORE_CONCEPTS } from "../data";

export default function CoreConceptsList() {
  return (
    <section id="core-concepts">
      <h2>Time to get started!</h2>
      <ul>
        {CORE_CONCEPTS.map((concept) => (
          <CoreConcept
            key={concept.title}
            title={concept.title}
            description={concept.description}
            image={concept.image}
          />
        ))}
      </ul>
    </section>
  );
}
