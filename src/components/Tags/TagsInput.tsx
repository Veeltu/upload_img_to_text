import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TagsInput as ReactTagsInput } from "react-tag-input-component";
import { addTag } from "../../features/tags/tagsSlice";

export default function CustomTagsInput() {
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleAddTags = (input: string[]) => {

    // if (typeof input === "string") {
    //   // If input is a string, convert it to an array
    //   input = [input];
    // }
    input.forEach(tag => {
       dispatch(addTag(tag)); // Dispatch addTag action for each tag
     });

    // setSelected([...selected, ...input]); // Update selected tags state
    setSelected(input)
  };

  return (
    <div>
      <h1>Add tags</h1>
      <ReactTagsInput
        value={selected}
        onChange={(input) => handleAddTags(input)}
        name="fruits"
        placeHolder="enter fruits"
      />
      <em>press enter to add new tag</em>
    </div>
  );
}
