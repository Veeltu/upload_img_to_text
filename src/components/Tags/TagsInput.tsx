import { useState } from "react";
import { TagsInput as ReactTagsInput } from "react-tag-input-component";

export default function CustomTagsInput() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleAddTags = (input:string[]) => {
    setSelected(input)
  }

  return (
    <div>
      <h1>Add tags</h1>

      <pre>{JSON.stringify(selected)}</pre>

      <ReactTagsInput
        value={selected}
        // onChange={setSelected}
        onChange={(input) => handleAddTags(input) }
        name="fruits"
        placeHolder="enter fruits"
      />
      <em>press enter to add new tag</em>
    </div>
  );
}
