import React, { FC } from "react";
import { Controller } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "ckeditor5-mathtype/build/ckeditor";

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
      render={({ onChange, value }) => (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={{
            toolbar: toolbarOptions,
            ckfinder: {
              uploadUrl: `${process.env.REACT_APP_BACKEND_URL}/uploads`,
            },
          }}
          onChange={(_: any, editor: any) => onChange(editor.getData())}
        />
      )}
    />
  );
};
