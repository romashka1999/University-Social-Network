export interface Translation {
    id: number;
    variable: string;
    KA: string;
    EN: string;
    RU: string;
}


export interface TranslationCreateDto {
    variable: string;
    KA: string;
    EN: string;
    RU: string;
}


export interface TranslationUpdateDto {
    variable?: string;
    KA?: string;
    EN?: string;
    RU?: string;
}