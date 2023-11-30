export interface IMenuItem {
    label: string;
    href: string;
    subItems?: IMenuItem [];
    icono?: string;
    targetBlank?: boolean; 
}