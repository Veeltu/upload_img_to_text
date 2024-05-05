import React, { useState } from "react";
import { AnyIfEmpty, useDispatch } from "react-redux";
import { TagsInput as ReactTagsInput } from "react-tag-input-component";
import { addTag } from "../../features/tags/tagsSlice";
import { SymbolicLinkList } from "aws-sdk/clients/codecommit";

export default function CustomTagsInput() {
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("ENTER")
    }
  }

  const handleSendTags = () => {
    dispatch(addTag(selected))
  }

  const handleAddTags = (input: string[]) => {
    setSelected(input)
  }
  console.log(selected)



  // const handleAddTags = (input: string[]) => {
  //   console.log(input)
  //   if (input.length === 0) return; // Do nothing if no tags are entered
  //   const lastTag = input[input.length - 1]; // Get the last tag entered
  //   if (lastTag.trim() !== '') { // Check if the tag is not empty
  //     dispatch(addTag(lastTag)); // Dispatch action to add the last tag
  //   }
  // };
  


  return (
    <div>
      <h1>Add tags</h1>
      <ReactTagsInput
        value={selected}
        onChange={(input) => handleAddTags(input)}
        onKeyUp={handleKeyUp}
        name="fruits"
        placeHolder="enter fruits"
      />
      <em>press enter to add new tag</em>
      <br />
      <button onClick={handleSendTags}>  add TAGS to file</button>
    </div>
  );
}

