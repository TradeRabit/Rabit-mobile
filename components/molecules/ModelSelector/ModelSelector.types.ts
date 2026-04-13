import React from "react";

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  icon: string;
}

export interface ModelSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (model: ModelOption) => void;
  selectedModelId?: string;
}
