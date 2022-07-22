import React, { FC } from "react";
import { Controller } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-mathtype/build/ckeditor";

import { useFormProvider } from '../FormContext'

const toolbarOptions = [
  "bold",
  "italic",
  "blockQuote",
  "numberedList",
  "bulletedList",
  "imageUpload",
  "insertTable",
  "tableColumn",
  "tableRow",
  "mergeTableCells",
  "|",
  "MathType",
  "ChemType",
  "|",
  "undo",
  "redo",
];

type Props = {
  name: string
  defaultValue: string
}

export const TextEditor: FC<Props> = ({ name, defaultValue }) => {
  const { hooks: { control } } = useFormProvider()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value }
       }) => (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={{
            toolbar: toolbarOptions,
            ckfinder: {
              uploadUrl: `/uploads`,
            },
          }}
          onChange={(_: any, editor: any) => onChange(editor.getData())}
        />
      )}
    />
  );
};
