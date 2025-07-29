import React from "react";
import { Grid3x3, Menu } from "lucide-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => (
  <ToggleGroup.Root
    type="single"
    value={view}
    onValueChange={(value) => onChange(value === "list" ? "list" : "grid")}
    className="hidden sm:flex items-center border rounded"
  >
    <ToggleGroup.Item
      value="grid"
      className="p-2 hover:bg-gray-100 data-[state=on]:bg-violet-200 rounded"
    >
      <Grid3x3 />
    </ToggleGroup.Item>
    <ToggleGroup.Item
      value="list"
      className="p-2 hover:bg-gray-100 data-[state=on]:bg-violet-200 rounded"
    >
      <Menu />
    </ToggleGroup.Item>
  </ToggleGroup.Root>
);

export default ViewToggle;
