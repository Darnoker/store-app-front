import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'en' | 'pl';

const translations = {
  en: {
    products: 'Products', orders: 'Orders', addProduct: 'Add product', cart: 'Cart', account: 'Account', signOut: 'Sign out', signIn: 'Sign in', createAccount: 'Create account', footer: 'React frontend → gateway-service', language: 'Language', english: 'English', polish: 'Polish',
    browseProducts: 'Browse products', viewAll: 'View all →', details: 'Details', addToCart: 'Add to cart', quantity: 'Quantity', backToCatalog: '← Back to catalog', type: 'Type', all: 'All', books: 'Books', swords: 'Swords', book: 'Book', sword: 'Sword', minPrice: 'Min. price', maxPrice: 'Max. price', noLimit: 'no limit', filter: 'Filter',
    loading: 'Loading…', loadingCatalog: 'Loading catalog…', loadingProduct: 'Loading product…', loadingOrders: 'Loading orders…', loadingOrder: 'Loading order…', checkingSession: 'Checking session…', checkingPermissions: 'Checking permissions…',
    catalog: 'Catalog', latestProducts: 'Latest products', catalogEmpty: 'The catalog is waiting for products.', catalogEmptyText: 'Once the product service returns data, it will appear here automatically.', noProducts: 'No products found.', noProductsText: 'Change the filters or add a product as an administrator.', homeTitle: 'Stories to read.\nBlades to collect.', homeText: 'One store, two product types, and a microservices-based backend. The frontend communicates exclusively through the gateway.',
    cartEmpty: 'Your cart is empty.', cartEmptyText: 'Add a book or sword from the catalog.', clearCart: 'Clear cart', items: 'Items', total: 'Total', summary: 'Summary', placeOrder: 'Place order', signInToOrder: 'Sign in to order', creatingOrder: 'Creating order…', item: 'item', remove: 'Remove',
    yourOrders: 'Your orders', noOrders: 'You do not have any orders yet.', noOrdersText: 'Your first order will appear here after checkout.', browseCatalog: 'Browse catalog', status: 'Status', order: 'Order', allOrders: '← All orders', orderCreated: 'Order created.', profile: 'Profile', userId: 'User ID', role: 'Role', accountCreated: 'Account created',
    loginTitle: 'Sign in', loginText: 'Sign in to access your profile and orders.', email: 'Email', password: 'Password', signingIn: 'Signing in…', noAccount: "Don't have an account?", register: 'Register', loginFailed: 'Sign-in failed.', newAccount: 'New account', joinTitle: 'Join Store App', registerText: 'The backend requires an email address and a password between 12 and 72 characters.', firstName: 'First name', lastName: 'Last name', creatingAccount: 'Creating account…', alreadyAccount: 'Already have an account?', passwordRule: 'Password must be at least 12 characters long.', accountCreatedMessage: 'Account created. You can now sign in.', registrationFailed: 'Registration failed.',
    admin: 'Admin', basicInfo: 'Basic information', name: 'Name', description: 'Description', price: 'Price (PLN)', productDetails: 'Details', isbn: 'ISBN', pages: 'Pages', author: 'Author', publisher: 'Publisher', productLanguage: 'Language', damage: 'Damage', weight: 'Weight', length: 'Length', material: 'Material', saving: 'Saving…', createProduct: 'Create product', pageMissing: 'This page does not exist.', returnStore: 'Return to store', unableProducts: 'Unable to load products.', unableProduct: 'Unable to load the product.', unableOrders: 'Unable to load orders.', unableOrder: 'Unable to load the order.', unableCreateOrder: 'Unable to create the order.', unableCreateProduct: 'Unable to create the product.',
  },
  pl: {
    products: 'Produkty', orders: 'Zamówienia', addProduct: 'Dodaj produkt', cart: 'Koszyk', account: 'Konto', signOut: 'Wyloguj', signIn: 'Zaloguj się', createAccount: 'Załóż konto', footer: 'Frontend React → gateway-service', language: 'Język', english: 'Angielski', polish: 'Polski',
    browseProducts: 'Przeglądaj produkty', viewAll: 'Zobacz wszystkie →', details: 'Szczegóły', addToCart: 'Dodaj do koszyka', quantity: 'Ilość', backToCatalog: '← Wróć do katalogu', type: 'Typ', all: 'Wszystkie', books: 'Książki', swords: 'Miecze', book: 'Książka', sword: 'Miecz', minPrice: 'Cena min.', maxPrice: 'Cena maks.', noLimit: 'bez limitu', filter: 'Filtruj',
    loading: 'Ładowanie…', loadingCatalog: 'Ładowanie katalogu…', loadingProduct: 'Ładowanie produktu…', loadingOrders: 'Ładowanie zamówień…', loadingOrder: 'Ładowanie zamówienia…', checkingSession: 'Sprawdzanie sesji…', checkingPermissions: 'Sprawdzanie uprawnień…',
    catalog: 'Katalog', latestProducts: 'Najnowsze produkty', catalogEmpty: 'Katalog czeka na produkty.', catalogEmptyText: 'Produkty pojawią się tutaj automatycznie, gdy usługa produktów zwróci dane.', noProducts: 'Nie znaleziono produktów.', noProductsText: 'Zmień filtry lub dodaj produkt jako administrator.', homeTitle: 'Historie do czytania.\nMiecze do kolekcjonowania.', homeText: 'Jeden sklep, dwa typy produktów i backend oparty na mikroserwisach. Frontend komunikuje się wyłącznie przez gateway.',
    cartEmpty: 'Twój koszyk jest pusty.', cartEmptyText: 'Dodaj książkę lub miecz z katalogu.', clearCart: 'Wyczyść koszyk', items: 'Produkty', total: 'Razem', summary: 'Podsumowanie', placeOrder: 'Złóż zamówienie', signInToOrder: 'Zaloguj się, aby zamówić', creatingOrder: 'Tworzenie zamówienia…', item: 'szt.', remove: 'Usuń',
    yourOrders: 'Twoje zamówienia', noOrders: 'Nie masz jeszcze żadnych zamówień.', noOrdersText: 'Twoje pierwsze zamówienie pojawi się tutaj po zakupie.', browseCatalog: 'Przeglądaj katalog', status: 'Status', order: 'Zamówienie', allOrders: '← Wszystkie zamówienia', orderCreated: 'Zamówienie utworzone.', profile: 'Profil', userId: 'ID użytkownika', role: 'Rola', accountCreated: 'Konto utworzone',
    loginTitle: 'Zaloguj się', loginText: 'Zaloguj się, aby przejść do profilu i zamówień.', email: 'E-mail', password: 'Hasło', signingIn: 'Logowanie…', noAccount: 'Nie masz konta?', register: 'Zarejestruj się', loginFailed: 'Logowanie nie powiodło się.', newAccount: 'Nowe konto', joinTitle: 'Dołącz do Store App', registerText: 'Backend wymaga adresu e-mail i hasła o długości od 12 do 72 znaków.', firstName: 'Imię', lastName: 'Nazwisko', creatingAccount: 'Tworzenie konta…', alreadyAccount: 'Masz już konto?', passwordRule: 'Hasło musi mieć co najmniej 12 znaków.', accountCreatedMessage: 'Konto utworzone. Możesz się teraz zalogować.', registrationFailed: 'Rejestracja nie powiodła się.',
    admin: 'Administrator', basicInfo: 'Informacje podstawowe', name: 'Nazwa', description: 'Opis', price: 'Cena (PLN)', productDetails: 'Szczegóły', isbn: 'ISBN', pages: 'Liczba stron', author: 'Autor', publisher: 'Wydawca', productLanguage: 'Język', damage: 'Obrażenia', weight: 'Waga', length: 'Długość', material: 'Materiał', saving: 'Zapisywanie…', createProduct: 'Utwórz produkt', pageMissing: 'Ta strona nie istnieje.', returnStore: 'Wróć do sklepu', unableProducts: 'Nie udało się wczytać produktów.', unableProduct: 'Nie udało się wczytać produktu.', unableOrders: 'Nie udało się wczytać zamówień.', unableOrder: 'Nie udało się wczytać zamówienia.', unableCreateOrder: 'Nie udało się utworzyć zamówienia.', unableCreateProduct: 'Nie udało się utworzyć produktu.',
  },
} as const;

type TranslationKey = keyof typeof translations.en;
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('store-app-language') === 'pl' ? 'pl' : 'en');
  useEffect(() => { localStorage.setItem('store-app-language', language); document.documentElement.lang = language; }, [language]);
  const value = useMemo(() => ({ language, setLanguage, t: (key: TranslationKey) => translations[language][key] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
