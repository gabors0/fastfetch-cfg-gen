export type ConfigValue =
    string | number | boolean | null | string[] | number[] | Record<string, unknown>;
export type ModuleConfig = Record<string, unknown> & { type: string };
export type AppConfig = Record<string, unknown> & { modules: ModuleConfig[] };
export type ControlType = 'text' | 'number' | 'checkbox' | 'select';

export type SelectOptionGroup = {
    label: string;
    options: string[];
};

export type Control = {
    label: string;
    path: string;
    type: ControlType;
    value?: string | number | boolean | null;
    options?: (string | SelectOptionGroup)[];
    placeholder?: string;
};

export type Group = {
    title: string;
    controls: Control[];
};

export type ModuleItem = {
    type: string;
    keyIcon?: string;
    key?: string;
    controls: Control[];
};
