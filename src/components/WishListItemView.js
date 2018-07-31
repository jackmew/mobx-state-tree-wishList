import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'

import WishListItemEdit from './WishListItemEdit';

class WishListItemView extends Component {
    constructor(props) {
        super(props);
        this.state = { isEdit: false };
    }
    render() {
        const { item } = this.props;
        return this.state.isEdit ? (
            this.renderEditable()
        ) : (
            <li className='item'>
                {item.image && <img src={item.image} />}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.onToggleEdit} >✏️</button>
                    <button onClick={item.remove}>🗑️</button>
                </span>
            </li>
        );
    }
    renderEditable() {
        return (
            <li className='item'>
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveClick}>💾</button>
                <button onClick={this.onCancelEdit}>↩️</button>
            </li>
        );
    }
    onToggleEdit = () => {
        this.setState({
            isEdit: true,
            clone: clone(this.props.item)
        });
    }
    onCancelEdit = () => {
        this.setState({
            isEdit: false
        });
    }
    onSaveClick = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone));
        this.setState({
            isEdit: false,
            clone: null
        });
    }
}
export default observer(WishListItemView);
