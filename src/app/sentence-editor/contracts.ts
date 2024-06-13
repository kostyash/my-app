
export interface TextBlock {
    text: string;
    placeholder: string | null;
    hasFocus?: boolean;
}

export interface TextInput {
    value: string;
    cursorPosition: number;
    index: number;
}