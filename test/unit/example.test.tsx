import { it, expect } from "@jest/globals";
import events from "@testing-library/user-event";
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import { ApplicationState, initStore } from '../../src/client/store';
import { Application } from '../../src/client/Application';
import { CartApi, ExampleApi } from '../../src/client/api';
import React from "react";
import axios from "axios";
import { CartItem, Product, ProductShortInfo } from "../../src/common/types";
import MockAdapter from "axios-mock-adapter";
import { Catalog } from "../../src/client/pages/Catalog";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { AnyAction } from "redux";
import { Cart } from "../../src/client/pages/Cart";
import { Form } from "../../src/client/components/Form";


const dataDetails: Product[] = [
    {
        "id": 0,
        "name": "Gorgeous Shoes",
        "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity,12 months battery life and modern design",
        "price": 836,
        "color": "black",
        "material": "Steel",
    },
    {
        "id": 1,
        "name": "Refined Mouse",
        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "price": 815,
        "color": "plum",
        "material": "Rubber"
    },
    {
        "id": 2,
        "name": "Rustic Cheese",
        "description": "The Football Is Good For Training And Recreational Purposes",
        "price": 448,
        "color": "magenta",
        "material": "Metal"
    },
    {
        "id": 3,
        "name": "Handmade Car",
        "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        "price": 412,
        "color": "sky blue",
        "material": "Wooden"
    },

]

const data: ProductShortInfo[] = [
    { "id": 0, "name": "Gorgeous Shoes", "price": 836 },
    { "id": 1, "name": "Refined Mouse", "price": 815 },
    { "id": 2, "name": "Rustic Cheese", "price": 448 },
    { "id": 3, "name": "Handmade Car", "price": 412 },
]

describe('Общие требования:', () => {
    it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', async () => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const application = (
            <MemoryRouter initialEntries={["/hw/store"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        const { getByTestId, getAllByTestId } = render(application);

        const navLinks = getAllByTestId('nav-link');
        const expectedHrefs = [
            '/catalog',
            '/delivery',
            '/contacts',
            '/cart'
        ];
        navLinks.forEach((link, index) => {
            expect(link.getAttribute('href')).toBe(expectedHrefs[index]);
        });
    });



    it('Название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        const application = (
            <MemoryRouter initialEntries={["/hw/store"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        const { getByTestId, getAllByTestId } = render(application);

        const nameStore = getByTestId('name-store');

        expect(nameStore.textContent).toEqual("Example store");

        expect(nameStore.getAttribute('href')).toBe('/');


    });

})



describe('Cтраницы:', () => {
    it('В магазине должны быть страницы: главная', async () => {

        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        let application = (
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        render(application);
        const main = screen.getByTestId("main");
        expect(main.className).toBe("Home"); 
    });
    it('В магазине должны быть страницы: условия доставки', async () => {
        const basename = '/hw/store/delivery';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        let application = (
            <MemoryRouter initialEntries={["/delivery"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        render(application);

        const titleDelivery = screen.getByTestId("title-delivery");
        expect(titleDelivery.textContent).toBe("Delivery"); 
    });
    it('В магазине должны быть страницы: контакты', async () => {

        const basename = '/hw/store/contacts';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        let application = (
            <MemoryRouter initialEntries={["/contacts"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        render(application);
        const titleContacts = screen.getByTestId("title-contacts");
        expect(titleContacts.textContent).toBe("Contacts"); 
    });
})




describe("Catalog", () => {
    let store: any;
    let mockApi: ExampleApi;
    let mockCart: CartApi;

    beforeEach(() => {
        mockCart = {
            getState: jest.fn(() => []),
            setState: jest.fn(),
        };
        mockApi = {
            getProducts: jest.fn(() => Promise.resolve({
                data
            })),
            getProductById: jest.fn((id: number) => Promise.resolve(dataDetails.filter((el) => el.id === id)[0])) as any
        } as any;
        store = initStore(mockApi, mockCart);
    })

    it('должно отображаться сообщение о загрузке, а потом продукты ', async () => {
        const { getAllByTestId, getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );
        expect(mockApi.getProducts).toHaveBeenCalled();
        expect(getByText('LOADING')).toBeDefined();
        await waitFor(() => expect(getAllByTestId(/[0-9]/i)).toBeDefined());
        data.forEach((item) => {
            expect(getAllByTestId(/[0-9]/i).map(el => {
                const cardTitle = el.querySelector('.card-title');
                return cardTitle.textContent
            })).toContain(item.name.toString());
        }
        );
    })

    it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const { getAllByTestId, getByText } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );


        expect(mockApi.getProducts).toHaveBeenCalled();
        await waitFor(() => expect(getAllByTestId(/[0-9]/i)).toBeDefined());
        data.forEach((item) => {
            expect(getAllByTestId(/[0-9]/i).map((el) => {
                return {
                    id: Number(el.getAttribute("data-testid")),
                    name: el.querySelector(".card-title").textContent,
                    price: Number(el.querySelector(".card-text").textContent.substring(1, el.querySelector(".card-text").textContent.length)),
                }
            })).toContainEqual(item);
            expect(getAllByTestId(/[0-9]/i).map((el) => el.querySelector('.card-link').getAttribute("href"))).toContain(`/catalog/${item.id}`);
        }
        );
    })

    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
        let productsIds = (await mockApi.getProducts()).data.map((x) => x.id)
        let productData: any = (await mockApi.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product={productData as any} />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);
        expect(dataDetails).toContainEqual({
            id: Number(productData.id),
            name: container.querySelector('.ProductDetails-Name').textContent,
            description: container.querySelector('.ProductDetails-Description').textContent,
            price: Number(container.querySelector('.ProductDetails-Price').textContent.substring(1, container.querySelector('.ProductDetails-Price').textContent.length)),
            color: container.querySelector('.ProductDetails-Color').textContent,
            material: container.querySelector('.ProductDetails-Material').textContent,
        })
        expect(container.querySelector('.ProductDetails-AddToCart')).not.toBeNull()
        expect(container.querySelector('.ProductDetails')).not.toBeNull()
    })
    

    it('Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом', async () => {
        let productsIds = (await mockApi.getProducts()).data.map((el) => el.id)
        let productData: any = (await mockApi.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product={productData as any} />
                </Provider>
            </BrowserRouter>
        )
        let catalogComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);
        await events.click(container.querySelector('.ProductDetails-AddToCart'))
        expect(container.querySelector('.CartBadge')).not.toBeNull()

        let catalogRender = render(catalogComp);
        expect(catalogRender.getByText('LOADING')).toBeDefined()
        await waitFor(() => expect(catalogRender.getAllByTestId(/([0-9])/)).toBeDefined())
        let productCard = catalogRender.container.querySelector(`[data-testid="${productData.id}"]`)
        expect(productCard.querySelector('.CartBadge').textContent).toContain('Item in cart')
    })

    it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
        let store: any;
        let mockApi: ExampleApi;
        const cartApi = new CartApi();

        mockApi = {
            getProducts: jest.fn(() => Promise.resolve({
                data
            })),
            getProductById: jest.fn((id: number) => Promise.resolve(dataDetails.filter((el) => el.id === id)[0])) as any
        } as any;
        store = initStore(mockApi, cartApi);


        let productsIds = (await mockApi.getProducts()).data.map((el) => el.id)
        let productData: any = (await mockApi.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>
                <Provider store={store}>
                    <ProductDetails product={productData as any} />
                </Provider>
            </BrowserRouter>
        )

        let { container } = render(productItem);

        const btnAdd = container.querySelector(".ProductDetails-AddToCart");
        await events.click(btnAdd);
        const LS = JSON.parse(localStorage.getItem('example-store-cart'))["0"];

        expect(LS.count).toBe(1);

    });
})

describe("Cart", () => {
    let store: any;
    let mockApi: ExampleApi;
    let mockCart: CartApi;

    beforeEach(() => {
        mockCart = {
            getState: jest.fn(() => []),
            setState: jest.fn(),
        };
        mockApi = {
            getProducts: jest.fn(() => Promise.resolve({
                data
            })),
            getProductById: jest.fn((id: number) => Promise.resolve(dataDetails.filter((el) => el.id === id)[0])) as any
        } as any;
        store = initStore(mockApi, mockCart);
    })


    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });
        let application = (
            <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        let { container } = render(application);

        const linkToCart = screen.getAllByTestId("nav-link");
        const countInCart = parseInt(linkToCart.at(-1).textContent.split('(')[1], 10);
        expect(countInCart).toBe(store.getState().cart.length);
    })

    it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });
        let application = (
            <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        let { container } = render(application);

        expect(container.querySelector("tbody")).toBeDefined()
        const tbody = container.querySelector("tbody");
        expect(container.querySelector("tr")).toBeDefined()
        const rowsProduct = tbody.querySelectorAll("tr");
        rowsProduct.forEach(el => {
            const namesProduct = store.getState().cart.map((el: CartItem) => el.name);
            const nameProductRowInTable = el.querySelector(".Cart-Name").textContent;
            expect(namesProduct).toContain(nameProductRowInTable);

        })
    })

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
        const mockStore = configureStore<any>([]);
        const store = mockStore({
            cart: [
                {
                    name: "Gorgeous Shoes",
                    price: 836,
                    count: 1,
                },
                {
                    name: "Refined Mouse",
                    price: 815,
                    count: 2,
                },
                {
                    name: "Gorgeous Shoes",
                    price: 448,
                    count: 3,
                }
            ]
        });

        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(cartComp);
        let cartItem = cartRender.container;

        expect(Array.from(cartItem.querySelectorAll('.Cart-Name')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Price')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Count')).map((x) => x.textContent)).not.toContain('')
        expect(Array.from(cartItem.querySelectorAll('.Cart-Total')).map((x) => x.textContent)).not.toContain('')
    });


    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        let productsIds = (await mockApi.getProducts()).data.map((el) => el.id)
        let productData: any = (await mockApi.getProductById(Number(productsIds[0])))
        let productItem = (
            <BrowserRouter>

                <Provider store={store}>
                    <ProductDetails product={productData as any} />
                </Provider>
            </BrowserRouter>
        )
        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )
        let { container } = render(productItem);
        await events.click(container.querySelector('.ProductDetails-AddToCart'))
        let cartRender = render(cartComp);
        let cartClear = cartRender.container.querySelector('.Cart-Clear');
        await events.click(cartClear);

        expect(Object.keys(store.getState().cart).length === 0).toBeTruthy();
        expect(cartRender.container.querySelector('.Cart-Table')).toBeNull();
    });

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
        let cartComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(cartComp);
        expect(Object.keys(store.getState().cart).length === 0).toBeTruthy();
        expect(cartRender.container.querySelector('a[href*="/catalog"]')).not.toBeNull();
    });

    it('Если заполненные в форме поля не проходят валидацию, то выдает оишбку, иначе пропускает дальше и возвращает сообщение с успехом', async () => {
        let formComp = (
            <BrowserRouter>
                <Provider store={store}>
                    <Form onSubmit={ () => null }/>
                </Provider>
            </BrowserRouter>
        )

        let cartRender = render(formComp);
        let nameInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_name')
        let phoneInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_phone')
        let addressInput: HTMLInputElement = cartRender.container.querySelector('.Form-Field_type_address')
        let submitBtn = cartRender.container.querySelector('.Form-Submit');

        await events.type(nameInput, ' ')
        await events.type(phoneInput, 'hi')
        await events.type(addressInput, ' ')
        await events.click(submitBtn)

        expect(nameInput.className.includes('is-invalid')).toBeTruthy()
        expect(phoneInput.className.includes('is-invalid')).toBeTruthy()
        expect(addressInput.className.includes('is-invalid')).toBeTruthy()

        nameInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';

        await events.type(nameInput, 'Петр Петрович')
        await events.type(phoneInput, '1234567890')
        await events.type(addressInput, 'Москва')
        await events.click(submitBtn)

        expect(nameInput.className.includes('is-invalid')).not.toBeTruthy()
        expect(phoneInput.className.includes('is-invalid')).not.toBeTruthy()
        expect(addressInput.className.includes('is-invalid')).not.toBeTruthy()
    });


})