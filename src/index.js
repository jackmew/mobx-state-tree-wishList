import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import { WishList } from './models/WishList';
import makeInspectable from 'mobx-devtools-mst';


const wishList = WishList.create({
    items: [
        {
            "name": "The Notebook",
            "price": 10,
            "image": "https://images-na.ssl-images-amazon.com/images/I/51ZXkAJNYWL._AC_US218_.jpg"
        },
        {
            "name": "LEGO Mindstorms EV3",
            "price": 349.95,
            "image": "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
        }
    ]
});
makeInspectable(wishList);

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));