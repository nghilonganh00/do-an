import { useRef } from "react";
import JoditEditor from "jodit-react";

export default function Editor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef(null);

  return <JoditEditor ref={ref} value={value} onChange={onChange} />;
}
