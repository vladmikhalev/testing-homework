const { assert } = require('chai');
const BUG_ID = process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : "";


describe('Проверка навбара', async function () {
    it('check nav', async function () {
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
});
describe('Страницы главная, условия доставки, контакты должны иметь статическое содержимое', async function () {
    it('страница главная должна иметь статическое содержимое', async function () {
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');

    });
    it('страница условия доставки должна иметь статическое содержимое', async function () {

        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');

    });
    it('страница контакты должна иметь статическое содержимое', async function () {
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body');
    });
});


describe('Вёрстка должна адаптироваться под ширину экрана', async function () {
    it('Верстка должна адаптироваться под ширину экрана 1400px на главной странице', async function () {
        this.browser.setWindowSize(1400, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1200px на главной странице', async function () {
        this.browser.setWindowSize(1200, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });


    it('Верстка должна адаптироваться под ширину экрана 1000px на главной странице', async function () {
        this.browser.setWindowSize(1000, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 765px на главной странице', async function () {
        this.browser.setWindowSize(765, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 570px на главной странице', async function () {
        this.browser.setWindowSize(570, 1080)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });



    it('Верстка должна адаптироваться под ширину экрана 1400px на странице delivery', async function () {
        this.browser.setWindowSize(1400, 1080)
        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1200px на странице delivery', async function () {
        this.browser.setWindowSize(1200, 1080)
        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1000px на странице delivery', async function () {
        this.browser.setWindowSize(1000, 1080)
        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 765px на странице delivery', async function () {
        this.browser.setWindowSize(765, 1080)
        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 570px на странице delivery', async function () {
        this.browser.setWindowSize(570, 1080)
        const url = `http://localhost:3000/hw/store/delivery${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });


    it('Верстка должна адаптироваться под ширину экрана 1400px на странице contacts', async function () {
        this.browser.setWindowSize(1400, 1080)
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1200px на странице contacts', async function () {
        this.browser.setWindowSize(1200, 1080)
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 1000px на странице contacts', async function () {
        this.browser.setWindowSize(1000, 1080)
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 765px на странице contacts', async function () {
        this.browser.setWindowSize(765, 1080)
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });
    });
    it('Верстка должна адаптироваться под ширину экрана 570px на странице contacts', async function () {
        this.browser.setWindowSize(570, 1080)
        const url = `http://localhost:3000/hw/store/contacts${BUG_ID}`;
        await this.browser.url(url);
        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 10,
        });

    });

});



describe('Проверка бургер меню', async function () {
    it(' на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar", { timeout: 5000 });
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
    it('После нажатия на кнопку меню, должен открыться "гамбургер" ', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar-toggler", { timeout: 5000 });

        const elementToggler = await page.waitForSelector('.navbar-toggler');
        await elementToggler.click();
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 1000,
        });

    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(570, 1000)
        const url = `http://localhost:3000/hw/store${BUG_ID}`;
        await this.browser.url(url);
        await page.waitForSelector(".navbar-toggler", { timeout: 5000 });

        const elementToggler = await page.waitForSelector('.navbar-toggler');
        await elementToggler.click();

        const elementLink = await page.waitForSelector('.nav-link');
        await elementLink.click();
        await this.browser.assertView('plain', '.navbar', {
            screenshotDelay: 10,
        });
    });
});





describe('Проверка страницы детальной информации', async function () {
    it('Статические элементы страницы должны быть неизменными', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(1920, 1080)
        const url = `http://localhost:3000/hw/store/catalog/0${BUG_ID}`;
        await this.browser.url(url);

        await this.browser.assertView('plain', '.ProductDetails-AddToCart', {
            screenshotDelay: 1000,
        });
    });
});

describe('Проверка детальной информации', async function () {
    it('Статические элементы страницы должны быть неизменными', async function () {
        const puppeteer = await this.browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        this.browser.setWindowSize(1920, 1080)
        const url = `http://localhost:3000/hw/store/catalog${BUG_ID}`;
        await this.browser.url(url);

        const linkToDetails = await this.browser.$('.ProductItem-DetailsLink');
        
        await linkToDetails.click(); 

        await this.browser.assertView('plain', 'body', {
            screenshotDelay: 1000,
            ignoreElements: ['.test'],
        });
    });
});


describe("На странице с подробной информацией отображаются все необходимые данные", async function () {
  it("Отображается название товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productName = await this.browser.$(".ProductDetails-Name").getText();
    assert.isString(productName);
    assert.notEqual(productName, "");
  });

  it("Отображается описание товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productDescription = await this.browser
      .$(".ProductDetails-Description")
      .getText();
    assert.isString(productDescription);
    assert.notEqual(productDescription, "");
  });

  it("Отображается цена товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productPrice = await this.browser
      .$(".ProductDetails-Price")
      .getText();
    assert.isString(productPrice);
    assert.notEqual(productPrice, "$");
  });

  it("Отображается цвет товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productColor = await this.browser
      .$(".ProductDetails-Color")
      .getText();
    assert.isString(productColor);
    assert.notEqual(productColor, "");
  });

  it("Отображается материал товара", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const productMaterial = await this.browser
      .$(".ProductDetails-Material")
      .getText();
    assert.isString(productMaterial);
    assert.notEqual(productMaterial, "");
  });

  it("Отображается кнопка добавления товара в корзину", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");
    assert.ok(addToCartButton);
  });
});


describe("В пустой корзине корректно отображаются сообщения и ссылки", async function () {
  it("Корректное сообщение, если в корзине нет товаров", async function () {
    await this.browser.url("http://localhost:3000/hw/store/cart");
    await this.browser.assertView("emptyCart", "body");

    const linkToCatalog = await this.browser.$(".Cart a");
    await expect(linkToCatalog).toHaveAttribute("href", "/hw/store/catalog");
  });

  it("Корректное сообщение, если был оформлен закан", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const addToCartButton = await this.browser.$(".ProductDetails-AddToCart");

    await addToCartButton.click();
    await this.browser.url("http://localhost:3000/hw/store/cart");

    const nameInput = await this.browser.$(".Form-Field_type_name");
    const phoneInput = await this.browser.$(".Form-Field_type_phone");
    const addressInput = await this.browser.$(".Form-Field_type_address");

    await nameInput.setValue("test");
    await phoneInput.setValue("81234567890");
    await addressInput.setValue("test");

    await this.browser.$(".Form-Submit").click();

    await this.browser.assertView("successfullOrder", "body", {
      ignoreElements: [".Cart-SuccessMessage p"],
    });

    const linkToCatalog = await this.browser.$(".Cart a");
    await expect(linkToCatalog).toHaveAttribute("href", "/hw/store/catalog");
  });
});

describe("Таблица с добавленными товарами в корзине корректно отображается", function () {
    it("Корректное отображение корзины после добавления 2 товаров с разным количеством и перезагрузки страницы", async function () {
      await this.browser.url("http://localhost:3000/hw/store/catalog/0");
      const item0Name = await this.browser.$(".ProductDetails-Name").getText();
      const item0Price = await this.browser.$(".ProductDetails-Price").getText();
      const addToCartButton0 = await this.browser.$(".ProductDetails-AddToCart");
      await addToCartButton0.click();
      await addToCartButton0.click();
  
      const item0Summary = Number(item0Price.slice(1)) * 2;
  
      await this.browser.url("http://localhost:3000/hw/store/catalog/2");
      const item2Name = await this.browser.$(".ProductDetails-Name").getText();
      const item2Price = await this.browser.$(".ProductDetails-Price").getText();
      const addToCartButton2 = await this.browser.$(".ProductDetails-AddToCart");
      await addToCartButton2.click();
  
      const item2Summary = Number(item2Price.slice(1));
  
      let summary = 0;
      summary += item0Summary + item2Summary;
  
      await this.browser.url("http://localhost:3000/hw/store/cart");
  
      this.browser.refresh();
  
      const cart = await this.browser.$(".Cart-Table");
  
      const cartItem0 = await cart.$(`tr[data-testid='0']`);
  
      await expect(cartItem0.$(".Cart-Name")).toHaveText(item0Name);
      await expect(cartItem0.$(".Cart-Price")).toHaveText(item0Price);
      await expect(cartItem0.$(".Cart-Count")).toHaveText("2");
      await expect(cartItem0.$(".Cart-Total")).toHaveText(`$${item0Summary}`);
  
      const cartItem2 = await cart.$(`tr[data-testid='2']`);
  
      await expect(cartItem2.$(".Cart-Name")).toHaveText(item2Name);
      await expect(cartItem2.$(".Cart-Price")).toHaveText(item2Price);
      await expect(cartItem2.$(".Cart-Count")).toHaveText(`1`);
      await expect(cartItem2.$(".Cart-Total")).toHaveText(`$${item2Summary}`);
  
      await expect(cart.$(".Cart-OrderPrice")).toHaveText(`$${summary}`);
    });
  
    it("Корзина очищается после нажатия на кнопку очистки корзины", async function () {
      await this.browser.url("http://localhost:3000/hw/store/catalog/0");
      const addToCartButton0 = await this.browser.$(".ProductDetails-AddToCart");
      await addToCartButton0.click();
      await addToCartButton0.click();
  
      await this.browser.url("http://localhost:3000/hw/store/catalog/2");
  
      const addToCartButton2 = await this.browser.$(".ProductDetails-AddToCart");
      await addToCartButton2.click();
  
      await this.browser.url("http://localhost:3000/hw/store/cart");
  
      const clearButton = await this.browser.$(".Cart-Clear");
      await clearButton.click();
  
      await this.browser.assertView("emptyCart", "body");
    });
  });
  