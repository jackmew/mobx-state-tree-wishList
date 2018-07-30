import { WishListItem, WishList } from "./WishList";

it('can create a instance of model', () => {
    const item = WishListItem.create({
        name: 'Chronicles of Narnia Box Set - C.S. Lewis',
        price: 28.73,
    });

    expect(item.price).toBe(28.73);
    expect(item.image).toBe('');

    item.changeName('Narnia');
    expect(item.name).toBe('Narnia');
    item.changePrice(30);
    expect(item.price).toBe(30);
});

it('can create a wishList', () => {
    const list = WishList.create({
        items: [
            {
                name: 'Chronicles of Narnia Box Set - C.S. Lewis',
                price: 28.73,
            }
        ]
    });

    expect(list.items.length).toBe(1);
    expect(list.items[0].price).toBe(28.73);
});

it('can add a wish', () => {
    const list = WishList.create();
    list.add(
        WishListItem.create({
            name: 'Chesterton',
            price: 10
        })
    );

    expect(list.items.length).toBe(1);
    expect(list.items[0].name).toBe('Chesterton');
    list.items[0].changeName('G.K');
    expect(list.items[0].name).toBe('G.K');
});