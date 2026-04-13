import React from "react";

export interface ChatInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: () => void;
  onAttachPress?: () => void;
  onModelSelect?: () => void;
  onAudioPress?: () => void;
  isLoading?: boolean;
  isRecording?: boolean;
  selectedModelName?: string;
}
