import React from 'react';
import styles from './CartModal.module.css';
import Cart from '../Cart/Cart';

function CartModal({ cart, onClose }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <Cart />
            </div>
        </div>
    );
}

export default CartModal;
