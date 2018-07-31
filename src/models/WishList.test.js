import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
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

// it('can add a wish', () => {
//     const list = WishList.create();
//     /**
//      * every time the list changes somehow and a new snapshot gets produced,
//      * because it changed, it just pushes onto the state list.
//      */
//     const states = [];
//     onSnapshot(list, snapshot => {
//         states.push(snapshot);
//     });

//     list.add(
//         // WishListItem.create({
//         //     name: 'Chesterton',
//         //     price: 10
//         // })
//     // 因為在wishList中已經定義了type, 所以就算你只是放入object，wishList也知道你放了什麼
//         {
//             name: 'Chesterton',
//             price: 10
//         }
//     );

//     expect(list.items.length).toBe(1);
//     expect(list.items[0].name).toBe('Chesterton');
//     expect(list.items[0].price).toBe(10);
    
//     list.items[0].changeName('G.K');
//     expect(list.items[0].name).toBe('G.K');
    
//     list.items[0].changePrice(20);
//     expect(list.items[0].price).toBe(20);
//     /**
//      * getSnapshot(): which is basically the inverse process of what create does.
//      * getStructure will produce an immutable data structure, which uses structural sharing, so, it's very cheap.
//      *
//      * deep equality check
//      */
//     expect(getSnapshot(list)).toEqual({
//         items: [
//             {
//                 name: 'G.K',
//                 price: 20,
//                 image: ''
//             }
//         ]
//     });
//     /**
//      * 跟以上是同等意思
//      * A snapshot is an immutable representation of the entire model tree, and they generated automatically
//      * in the background
//      */
//     expect(getSnapshot(list)).toMatchSnapshot();

//     expect(states).toMatchSnapshot();
// });

it('can add a wish - 2', () => {
    const list = WishList.create();
    
    const patches = [];
    onPatch(list, patch => {
        patches.push(patch);
    });

    list.add({
        name: 'Chesterton',
        price: 10
    });

    list.items[0].changePrice(20);
    expect(list.items[0].price).toBe(20);

    expect(patches).toMatchSnapshot();
});