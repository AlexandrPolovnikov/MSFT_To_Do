export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description?: string;
}

export interface ListItem {
    id: number;
    itemId: number;
    amount: number;
}

export interface ResponseData {
    goods: Product[];
    list: ListItem[];
}

export const dateNow = new Date().toLocaleDateString();
export const date = new Date();

export const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];
export const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
];
