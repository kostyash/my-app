
export interface TextBlock {
    text: string;
    placeholder: string | null;
    hasFocus?: boolean;
    caretPosition?: number;
}

export interface TextInput {
    value: string;
    caretPosition: number;
    index: number;
    keyPressed?: string;
}